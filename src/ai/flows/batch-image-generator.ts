// src/ai/flows/batch-image-generator.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a batch of images from a single prompt.
 *
 * - generateBatchImages - A function that generates a batch of images based on the given prompt.
 * - BatchImageInput - The input type for the generateBatchImages function.
 * - BatchImageOutput - The output type for the generateBatchImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BatchImageInputSchema = z.object({
  prompt: z.string().describe('The prompt to use for generating the images.'),
  count: z.number().min(2).max(4).default(2).describe('The number of images to generate in the batch. Must be between 2 and 4.'),
});
export type BatchImageInput = z.infer<typeof BatchImageInputSchema>;

const BatchImageOutputSchema = z.object({
  images: z.array(z.string()).describe('An array of base64 encoded image data URIs.'),
});
export type BatchImageOutput = z.infer<typeof BatchImageOutputSchema>;

export async function generateBatchImages(input: BatchImageInput): Promise<BatchImageOutput> {
  return batchImageGeneratorFlow(input);
}

const batchImageGeneratorFlow = ai.defineFlow(
  {
    name: 'batchImageGeneratorFlow',
    inputSchema: BatchImageInputSchema,
    outputSchema: BatchImageOutputSchema,
  },
  async input => {
    const imagePromises = Array(input.count).fill(null).map(async () => {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp',
        prompt: input.prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });
      return media.url;
    });

    const images = await Promise.all(imagePromises);

    return {
      images,
    };
  }
);
