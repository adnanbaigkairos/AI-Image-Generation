'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating high-quality images
 * that reflect a cyberpunk aesthetic based on a user's text prompt.
 *
 * - generateNeonDreamImage - A function that triggers the image generation flow.
 * - GenerateNeonDreamImageInput - The input type for the generateNeonDreamImage function.
 * - GenerateNeonDreamImageOutput - The return type for the generateNeonDreamImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNeonDreamImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to use for generating the image.'),
});
export type GenerateNeonDreamImageInput = z.infer<typeof GenerateNeonDreamImageInputSchema>;

const GenerateNeonDreamImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateNeonDreamImageOutput = z.infer<typeof GenerateNeonDreamImageOutputSchema>;

export async function generateNeonDreamImage(input: GenerateNeonDreamImageInput): Promise<GenerateNeonDreamImageOutput> {
  return generateNeonDreamImageFlow(input);
}

const generateNeonDreamImageFlow = ai.defineFlow(
  {
    name: 'generateNeonDreamImageFlow',
    inputSchema: GenerateNeonDreamImageInputSchema,
    outputSchema: GenerateNeonDreamImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-exp model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: `${input.prompt} in a cyberpunk style`, // Augment the prompt to ensure a cyberpunk aesthetic
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    return {imageUrl: media.url};
  }
);
