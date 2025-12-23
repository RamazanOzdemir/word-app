import { Inject, Injectable } from '@nestjs/common';
import { Word } from '../domain/entity';
import { type WordRepository } from '../domain/repository';
import { WordCreateInput, WordResponse } from '../word.dto';

@Injectable()
export class WordCreateService {
  constructor(@Inject('WordRepository') private wordRepo: WordRepository) {}

  async create(input: WordCreateInput): Promise<WordResponse> {
    //Business Rule
    const wordExist = await this.wordRepo.findByContext(input.context);

    if (wordExist) throw new Error('The Word allready exists');

    const word = Word.create(input.context, input.type, input.description);

    await this.wordRepo.create(word);

    return {
      id: word.getId(),
      ...input,
    };
  }
}
