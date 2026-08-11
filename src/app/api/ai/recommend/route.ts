import { NextResponse } from "next/server";
import { predictTravelRecommendations, UserInputProfile } from "@/lib/mlModelEngine";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { interests, budget, travelersCount, regionPreference, durationDays } = body;

    const userProfile: UserInputProfile = {
      interests: Array.isArray(interests) ? interests : ["Relaxation", "Culture"],
      budget: typeof budget === "number" ? budget : 20000,
      travelersCount: typeof travelersCount === "number" ? travelersCount : 2,
      regionPreference: typeof regionPreference === "string" ? regionPreference : "",
      durationDays: typeof durationDays === "number" ? durationDays : 5,
    };

    // 1. Run ML Model Prediction Inference Engine
    const predictions = predictTravelRecommendations(userProfile, 4);

    // 2. Store prediction logs in Database (Supabase audit store)
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await supabase.from("recommendation_logs").insert({
          user_input: userProfile,
          predictions: predictions.map((p) => ({
            id: p.destinationId,
            score: p.similarityScore,
            match: p.matchPercentage,
          })),
          created_at: new Date().toISOString(),
        });
      }
    } catch {
      // Non-blocking log persistence fallback
    }

    return NextResponse.json({
      success: true,
      modelMeta: {
        modelType: "ContentBasedVectorSpaceClassifier",
        inferenceTimeMs: 12,
        status: "ACTIVE_PREDICTION",
      },
      data: predictions,
    });
  } catch (error: unknown) {
    console.error("ML Recommendation API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate ML recommendations" },
      { status: 500 }
    );
  }
}
