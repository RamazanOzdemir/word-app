import { ApiProperty, PartialType } from '@nestjs/swagger';
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

export const wordUpdateSchema = z.object({
  context: z.string().optional(),
  type: z.enum(wordTypes).optional(),
  description: z.string().min(3).optional(),
});

export type WordCreateInput = z.infer<typeof wordCreateSchema>;

export type WordUpdateInput = z.infer<typeof wordUpdateSchema>;

export class WordCreateDto implements WordCreateInput {
  @ApiProperty()
  context: string;
  @ApiProperty({ enum: wordTypes })
  type: WordType;
  @ApiProperty()
  description: string;
}

export class WordUpdateDto extends PartialType(WordCreateDto) {}

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
