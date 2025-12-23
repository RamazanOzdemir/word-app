import { z } from 'zod';

export const wordFindByContextSchema = z.object({
  context: z.string(),
});

export const wordCreateSchema = z.object({
  context: z.string(),
  type: z.enum(['noun', 'verb', 'adjective']),
  description: z.string().min(3),
});

export type WordType = 'noun' | 'verb' | 'adjective';

export type WordCreateInput = z.infer<typeof wordCreateSchema>;

export type WordFindByContextInput = z.infer<typeof wordFindByContextSchema>;

export type WordResponse = {
  id: string;
  context: string;
  type: WordType;
  description: string;
};

export type ListWordQuery = {
  offset: number;
  limit: number;
};
