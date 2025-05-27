// src/app/actions.ts
"use server";

import { generateNeonDreamImage, GenerateNeonDreamImageInput } from "@/ai/flows/generate-neon-dream-image";
import { improvePromptQuality, ImprovePromptQualityInput } from "@/ai/flows/improve-prompt-quality";
import type { GenerateImageResult } from "@/lib/types";

export async function handleGenerateImageAction(
  prompt: string
): Promise<GenerateImageResult> {
  if (!prompt || prompt.trim() === "") {
    return { error: "Prompt cannot be empty." };
  }

  try {
    const imageInput: GenerateNeonDreamImageInput = { prompt };
    const imageOutput = await generateNeonDreamImage(imageInput);
    
    if (imageOutput.imageUrl) {
      return { imageUrl: imageOutput.imageUrl };
    } else {
      // This case should ideally not happen if the flow is successful,
      // but good to have a fallback.
      return { error: "Failed to generate image. AI did not return an image URL." };
    }
  } catch (e: any) {
    console.error("Error generating image:", e);
    let errorMessage = "An unexpected error occurred while generating the image.";
    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === 'string') {
      errorMessage = e;
    }

    try {
      const promptInput: ImprovePromptQualityInput = { prompt };
      const qualityOutput = await improvePromptQuality(promptInput);
      return {
        error: `Image generation failed: ${errorMessage}. Here are some suggestions to improve your prompt:`,
        suggestions: qualityOutput.suggestions,
      };
    } catch (qualityError: any) {
      console.error("Error getting prompt suggestions:", qualityError);
      return {
        error: `Image generation failed: ${errorMessage}. Additionally, failed to get prompt improvement suggestions.`,
      };
    }
  }
}
