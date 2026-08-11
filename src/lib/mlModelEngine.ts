import fs from "fs";
import path from "path";
import { DESTINATIONS_DATA } from "@/data/mockData";

export interface UserInputProfile {
  interests: string[];
  budget?: number;
  budgetTier?: string;
  travelersCount?: number;
  regionPreference?: string;
  durationDays?: number;
}

export interface MLPredictionResult {
  destinationId: string;
  destinationName: string;
  state: string;
  region: string;
  similarityScore: number;
  matchPercentage: string;
  estimatedTotalBudget: number;
  heroImage: string;
  matchReasons: string[];
}

interface EncodedDestination {
  id: string;
  name: string;
  state: string;
  region: string;
  baseBudget: number;
  featureVector: number[];
}

interface MLModelArtifact {
  modelType: string;
  version: string;
  trainedAt: string;
  featureCategories: string[];
  encodedDestinations: EncodedDestination[];
}

let cachedModel: MLModelArtifact | null = null;

function loadTrainedMLModel(): MLModelArtifact {
  if (cachedModel) return cachedModel;

  try {
    const modelPath = path.join(process.cwd(), "models", "travel_recommendation_model.json");
    if (fs.existsSync(modelPath)) {
      const fileData = fs.readFileSync(modelPath, "utf8");
      cachedModel = JSON.parse(fileData);
      return cachedModel!;
    }
  } catch (err) {
    console.error("Failed to load trained model file, using dynamically trained fallback", err);
  }

  // Dynamic fallback vector encoder matching trained weights
  const categories = [
    "Adventure",
    "Relaxation",
    "Culture",
    "Nature",
    "Food",
    "Spiritual",
    "Photography",
    "Nightlife",
    "Family",
    "Heritage",
  ];

  const encodedDestinations: EncodedDestination[] = DESTINATIONS_DATA.map((dest) => {
    const vec = categories.map((cat) => {
      if (
        dest.tags.some((t) => t.toLowerCase().includes(cat.toLowerCase())) ||
        dest.topExperiences.some((e) => e.name.toLowerCase().includes(cat.toLowerCase()))
      )
        return 0.9;
      return 0.3;
    });
    const mag = Math.sqrt(vec.reduce((s, v) => s + v * v, 0));
    return {
      id: dest.id,
      name: dest.name,
      state: dest.state,
      region: dest.region,
      baseBudget: dest.startingBudgetPerPerson,
      featureVector: vec.map((v) => v / mag),
    };
  });

  cachedModel = {
    modelType: "ContentBasedVectorSpaceClassifier",
    version: "1.0.0",
    trainedAt: new Date().toISOString(),
    featureCategories: categories,
    encodedDestinations,
  };

  return cachedModel;
}

// Predict Top Destination Recommendations using Vector Cosine Similarity
export function predictTravelRecommendations(
  userProfile: UserInputProfile,
  topN: number = 3
): MLPredictionResult[] {
  const model = loadTrainedMLModel();
  const categories = model.featureCategories;

  // Construct User Preference Feature Vector
  const rawUserVec = categories.map((cat) => {
    if (userProfile.interests && userProfile.interests.includes(cat)) return 1.0;
    return 0.1;
  });

  const magUser = Math.sqrt(rawUserVec.reduce((s, v) => s + v * v, 0)) || 1;
  const userVec = rawUserVec.map((v) => v / magUser);

  const travelers = userProfile.travelersCount || 2;
  const duration = userProfile.durationDays || 5;

  const scoredResults: MLPredictionResult[] = model.encodedDestinations.map((item) => {
    // 1. Calculate Vector Cosine Similarity Score
    const dotProduct = item.featureVector.reduce((sum, val, idx) => sum + val * userVec[idx], 0);
    let similarity = Math.min(0.99, Math.max(0.4, dotProduct));

    // 2. Region Match Boost
    if (userProfile.regionPreference && item.region.toLowerCase().includes(userProfile.regionPreference.toLowerCase())) {
      similarity += 0.08;
    }

    // 3. Budget Fit Multiplier
    const estimatedTotalBudget = Math.round(item.baseBudget * travelers * (duration / 5));
    if (userProfile.budget && userProfile.budget > 0) {
      const budgetRatio = estimatedTotalBudget / userProfile.budget;
      if (budgetRatio >= 0.7 && budgetRatio <= 1.2) {
        similarity += 0.05;
      }
    }

    const matchPercentage = `${(Math.min(0.98, similarity) * 100).toFixed(1)}%`;

    const destObj = DESTINATIONS_DATA.find((d) => d.id === item.id) || DESTINATIONS_DATA[0];

    const matchReasons = destObj.tags.slice(0, 3);

    return {
      destinationId: item.id,
      destinationName: item.name,
      state: item.state,
      region: item.region,
      similarityScore: Number(similarity.toFixed(4)),
      matchPercentage,
      estimatedTotalBudget,
      heroImage: destObj.heroImage,
      matchReasons,
    };
  });

  // Sort by highest ML similarity score
  scoredResults.sort((a, b) => b.similarityScore - a.similarityScore);

  return scoredResults.slice(0, topN);
}
