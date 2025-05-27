// src/app/actions.ts
'use server';

import { enhanceSimplePrompt, type EnhancePromptInput, type EnhancePromptOutput } from '@/ai/flows/prompt-enhancer';
import { generateImage, type ImageGeneratorInput, type ImageGeneratorOutput } from '@/ai/flows/image-generator';
import { generateBatchImages, type BatchImageInput, type BatchImageOutput } from '@/ai/flows/batch-image-generator';

export async function handleEnhancePromptAction(input: EnhancePromptInput): Promise<EnhancePromptOutput> {
  try {
    const result = await enhanceSimplePrompt(input);
    return result;
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    throw new Error('Failed to enhance prompt. Please try again.');
  }
}

export async function handleGenerateImageAction(input: ImageGeneratorInput): Promise<ImageGeneratorOutput> {
  try {
    const result = await generateImage(input);
    return result;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image. Please try again.');
  }
}

export async function handleGenerateBatchImagesAction(input: BatchImageInput): Promise<BatchImageOutput> {
  try {
    const result = await generateBatchImages(input);
    return result;
  } catch (error) {
    console.error('Error generating batch images:', error);
    throw new Error('Failed to generate batch images. Please try again.');
  }
}
