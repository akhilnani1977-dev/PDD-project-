const fs = require("fs");
const path = require("path");

// 1. Dataset definition of Indian destinations for ML Vector Encoding
const DESTINATIONS = [
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "North India",
    budget: 15000,
    features: {
      Adventure: 0.3,
      Relaxation: 0.5,
      Culture: 0.95,
      Nature: 0.2,
      Food: 0.85,
      Spiritual: 0.6,
      Photography: 0.9,
      Nightlife: 0.4,
      Family: 0.8,
      Heritage: 0.95,
    },
  },
  {
    id: "kerala",
    name: "Kerala",
    state: "Kerala",
    region: "South India",
    budget: 22000,
    features: {
      Adventure: 0.4,
      Relaxation: 0.95,
      Culture: 0.7,
      Nature: 0.95,
      Food: 0.8,
      Spiritual: 0.65,
      Photography: 0.9,
      Nightlife: 0.3,
      Family: 0.9,
      Heritage: 0.6,
    },
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    region: "West India",
    budget: 18000,
    features: {
      Adventure: 0.8,
      Relaxation: 0.9,
      Culture: 0.4,
      Nature: 0.7,
      Food: 0.85,
      Spiritual: 0.2,
      Photography: 0.8,
      Nightlife: 0.95,
      Family: 0.6,
      Heritage: 0.4,
    },
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    region: "East India",
    budget: 16000,
    features: {
      Adventure: 0.6,
      Relaxation: 0.9,
      Culture: 0.75,
      Nature: 0.95,
      Food: 0.7,
      Spiritual: 0.5,
      Photography: 0.95,
      Nightlife: 0.2,
      Family: 0.85,
      Heritage: 0.7,
    },
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    region: "South India",
    budget: 12000,
    features: {
      Adventure: 0.7,
      Relaxation: 0.6,
      Culture: 0.95,
      Nature: 0.65,
      Food: 0.6,
      Spiritual: 0.8,
      Photography: 0.95,
      Nightlife: 0.1,
      Family: 0.7,
      Heritage: 0.98,
    },
  },
  {
    id: "kashmir",
    name: "Kashmir",
    state: "Jammu & Kashmir",
    region: "North India",
    budget: 28000,
    features: {
      Adventure: 0.85,
      Relaxation: 0.85,
      Culture: 0.7,
      Nature: 0.98,
      Food: 0.75,
      Spiritual: 0.5,
      Photography: 0.98,
      Nightlife: 0.2,
      Family: 0.85,
      Heritage: 0.6,
    },
  },
  {
    id: "ladakh",
    name: "Ladakh",
    state: "Ladakh",
    region: "North India",
    budget: 32000,
    features: {
      Adventure: 0.98,
      Relaxation: 0.4,
      Culture: 0.8,
      Nature: 0.95,
      Food: 0.5,
      Spiritual: 0.85,
      Photography: 0.98,
      Nightlife: 0.1,
      Family: 0.4,
      Heritage: 0.7,
    },
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    region: "North India",
    budget: 10000,
    features: {
      Adventure: 0.9,
      Relaxation: 0.7,
      Culture: 0.8,
      Nature: 0.85,
      Food: 0.65,
      Spiritual: 0.98,
      Photography: 0.85,
      Nightlife: 0.3,
      Family: 0.7,
      Heritage: 0.6,
    },
  },
  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    region: "North India",
    budget: 17000,
    features: {
      Adventure: 0.9,
      Relaxation: 0.8,
      Culture: 0.5,
      Nature: 0.9,
      Food: 0.7,
      Spiritual: 0.4,
      Photography: 0.9,
      Nightlife: 0.5,
      Family: 0.8,
      Heritage: 0.4,
    },
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    region: "North India",
    budget: 24000,
    features: {
      Adventure: 0.3,
      Relaxation: 0.9,
      Culture: 0.9,
      Nature: 0.7,
      Food: 0.85,
      Spiritual: 0.5,
      Photography: 0.95,
      Nightlife: 0.4,
      Family: 0.9,
      Heritage: 0.95,
    },
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "North India",
    budget: 11000,
    features: {
      Adventure: 0.3,
      Relaxation: 0.5,
      Culture: 0.98,
      Nature: 0.4,
      Food: 0.8,
      Spiritual: 0.99,
      Photography: 0.95,
      Nightlife: 0.2,
      Family: 0.75,
      Heritage: 0.95,
    },
  },
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    region: "South India",
    budget: 15000,
    features: {
      Adventure: 0.5,
      Relaxation: 0.95,
      Culture: 0.5,
      Nature: 0.98,
      Food: 0.7,
      Spiritual: 0.3,
      Photography: 0.9,
      Nightlife: 0.1,
      Family: 0.85,
      Heritage: 0.4,
    },
  },
];

const CATEGORIES = [
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

// Helper: Vector magnitude
function norm(vec) {
  return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
}

// Train Content-Based ML Vector Recommendation Model
function trainMLModel() {
  console.log("🤖 Training Travel Recommendation Vector Space ML Model...");

  const encodedDestinations = DESTINATIONS.map((dest) => {
    const rawVector = CATEGORIES.map((cat) => dest.features[cat] || 0.0);
    const vectorNorm = norm(rawVector);
    const normalizedVector = rawVector.map((val) => Number((val / vectorNorm).toFixed(4)));

    return {
      id: dest.id,
      name: dest.name,
      state: dest.state,
      region: dest.region,
      baseBudget: dest.budget,
      featureVector: normalizedVector,
    };
  });

  // Calculate pairwise similarity matrix for model weights
  const similarityMatrix = {};
  for (let i = 0; i < encodedDestinations.length; i++) {
    const d1 = encodedDestinations[i];
    similarityMatrix[d1.id] = {};
    for (let j = 0; j < encodedDestinations.length; j++) {
      const d2 = encodedDestinations[j];
      const dotProduct = d1.featureVector.reduce((sum, val, idx) => sum + val * d2.featureVector[idx], 0);
      similarityMatrix[d1.id][d2.id] = Number(dotProduct.toFixed(4));
    }
  }

  const modelArtifact = {
    modelType: "ContentBasedVectorSpaceClassifier",
    version: "1.0.0",
    trainedAt: new Date().toISOString(),
    featureCategories: CATEGORIES,
    destinationsCount: encodedDestinations.length,
    encodedDestinations,
    similarityMatrix,
  };

  const modelsDir = path.join(__dirname, "..", "models");
  if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });

  const modelFilePath = path.join(modelsDir, "travel_recommendation_model.json");
  fs.writeFileSync(modelFilePath, JSON.stringify(modelArtifact, null, 2), "utf8");

  console.log(`✅ ML Model Training Complete! Saved weights artifact to: ${modelFilePath}`);
}

trainMLModel();
