import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export type WordType = 'noun' | 'verb' | 'adjective';

const wordTypes = ['noun', 'verb', 'adjective'] as const;

export const wordFindByContextSchema = z.object({
  context: z.string(),
});

export const wordCreateSchema = z.object({
  context: z.string(),
  type: z.enum(wordTypes),
  description: z.string().min(3),
});

export type WordCreateInput = z.infer<typeof wordCreateSchema>;

export class WordCrateDto implements WordCreateInput {
  @ApiProperty()
  context: string;
  @ApiProperty({ enum: wordTypes })
  type: WordType;
  @ApiProperty()
  description: string;
}

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
