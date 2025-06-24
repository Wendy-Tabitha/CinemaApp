'use server';

/**
 * @fileOverview Recommends movies or shows based on the user's watchlist.
 *
 * - recommendMovies - A function that recommends movies based on the user's watchlist.
 * @typedef {Object} RecommendMoviesInput
 * @property {string[]} watchlist - The list of movie or show titles in the user's watchlist
 * 
 * @typedef {string[]} RecommendMoviesOutput - A list of recommended movie or show titles
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendMoviesInputSchema = z.object({
  watchlist: z.array(z.string()).describe('The list of movie or show titles in the user\'s watchlist.'),
});

const RecommendMoviesOutputSchema = z.array(z.string()).describe('A list of recommended movie or show titles.');

/**
 * Recommends movies based on the user's watchlist
 * @param {RecommendMoviesInput} input - The input containing the user's watchlist
 * @returns {Promise<RecommendMoviesOutput>} A promise that resolves to a list of recommended movies
 */
export async function recommendMovies(input) {
  return recommendMoviesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMoviesPrompt',
  input: {schema: RecommendMoviesInputSchema},
  output: {schema: RecommendMoviesOutputSchema},
  prompt: `You are a movie and TV show recommendation expert.

Based on the user's watchlist, recommend other movies or shows they might like.

Watchlist: {{#each watchlist}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Recommendations:`,
});

const recommendMoviesFlow = ai.defineFlow(
  {
    name: 'recommendMoviesFlow',
    inputSchema: RecommendMoviesInputSchema,
    outputSchema: RecommendMoviesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output || []; // Return empty array as fallback instead of using non-null assertion
  }
);
