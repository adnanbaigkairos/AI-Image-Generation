// src/ai/flows/prompt-enhancer.ts
'use server';

/**
 * @fileOverview Enhances a simple prompt into a detailed and vivid prompt for AI image generation.
 *
 * - enhanceSimplePrompt - A function that takes a simple prompt and enhances it.
 * - EnhancePromptInput - The input type for the enhanceSimplePrompt function.
 * - EnhancePromptOutput - The return type for the enhanceSimplePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePromptInputSchema = z.object({
  simplePrompt: z.string().describe('The simple prompt to be enhanced.'),
  preset: z.enum(['cinematic', 'abstract', 'futuristic']).optional().describe('Optional preset to guide the enhancement.'),
});
export type EnhancePromptInput = z.infer<typeof EnhancePromptInputSchema>;

const EnhancePromptOutputSchema = z.object({
  enhancedPrompt: z.string().describe('The enhanced, detailed prompt.'),
});
export type EnhancePromptOutput = z.infer<typeof EnhancePromptOutputSchema>;

export async function enhanceSimplePrompt(input: EnhancePromptInput): Promise<EnhancePromptOutput> {
  return enhanceSimplePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceSimplePromptPrompt',
  input: {schema: EnhancePromptInputSchema},
  output: {schema: EnhancePromptOutputSchema},
  prompt: `You are an AI prompt enhancer. Your goal is to take a simple prompt and turn it into a detailed and vivid prompt suitable for AI image generation.

Simple Prompt: {{{simplePrompt}}}

{{#if preset}}
Preset: Make it {{preset}}
{{/if}}

Enhanced Prompt:`, 
});

const enhanceSimplePromptFlow = ai.defineFlow(
  {
    name: 'enhanceSimplePromptFlow',
    inputSchema: EnhancePromptInputSchema,
    outputSchema: EnhancePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
