import { Inject, Injectable } from '@nestjs/common';
import { type WordRepository } from '../domain/repository';
import { WordResponse, WordUpdateDto } from '../word.dto';

@Injectable()
export class WordUpdateService {
  constructor(@Inject('WordRepository') private wordRepo: WordRepository) {}

  async updateWord(
    wordId: string,
    input: WordUpdateDto,
  ): Promise<WordResponse> {
    const word = await this.wordRepo.findById(wordId);

    if (!word) throw new Error("Word doesn't exist");

    if (input.context) word.updateContext(input.context);
    if (input.type) word.updateType(input.type);
    if (input.description) word.updateDescription(input.description);

    await this.wordRepo.update(word);

    return {
      id: word.getId(),
      context: word.getContext(),
      type: word.getType(),
      description: word.getDescription(),
    };
  }
}
