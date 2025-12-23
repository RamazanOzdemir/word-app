import { Inject, Injectable } from '@nestjs/common';
import { type WordRepository } from '../domain/repository';
import {
  ListWordQuery,
  WordFindByContextInput,
  WordResponse,
} from '../word.dto';
import { PaginationList } from 'src/app.dto';

@Injectable()
export class WordReadService {
  constructor(@Inject('WordRepository') private wordRepo: WordRepository) {}

  async getWordByContext(input: WordFindByContextInput): Promise<WordResponse> {
    const word = await this.wordRepo.findByContext(input.context);

    if (!word) throw new Error("Word doesn't exist");

    return {
      id: word.getId(),
      context: word.getContext(),
      type: word.getType(),
      description: word.getDescription(),
    };
  }

  async getWordList(
    input?: ListWordQuery,
  ): Promise<PaginationList<WordResponse>> {
    const data = await this.wordRepo.findAll(input);
    const total = await this.wordRepo.count();

    return {
      limit: input?.limit || 0,
      offset: input?.offset || 0,
      total,
      data,
    };
  }
}
