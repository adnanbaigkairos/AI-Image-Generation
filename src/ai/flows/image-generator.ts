'use server';
/**
 * @fileOverview An AI agent that generates images from enhanced prompts.
 *
 * - generateImage - A function that generates an image from a prompt.
 * - ImageGeneratorInput - The input type for the generateImage function.
 * - ImageGeneratorOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageGeneratorInputSchema = z.object({
  enhancedPrompt: z.string().describe('The enhanced prompt to use for image generation.'),
  style: z.string().optional().describe('The style of the image (e.g., anime, realism, cyberpunk).'),
  aspectRatio: z.string().optional().describe('The aspect ratio of the image (e.g., 1:1, 16:9, 4:3).'),
  resolution: z.string().optional().describe('The resolution of the image.'),
});

export type ImageGeneratorInput = z.infer<typeof ImageGeneratorInputSchema>;

const ImageGeneratorOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});

export type ImageGeneratorOutput = z.infer<typeof ImageGeneratorOutputSchema>;

export async function generateImage(input: ImageGeneratorInput): Promise<ImageGeneratorOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: ImageGeneratorInputSchema,
    outputSchema: ImageGeneratorOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: input.enhancedPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {imageUrl: media.url!};
  }
);
