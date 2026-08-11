import { NextResponse } from "next/server";
import { processAIChatQuery } from "@/lib/aiEngine";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid prompt parameter is required" },
        { status: 400 }
      );
    }

    const aiResult = await processAIChatQuery(prompt);

    return NextResponse.json({
      success: true,
      data: aiResult,
    });
  } catch (error: unknown) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process AI chat request" },
      { status: 500 }
    );
  }
}
