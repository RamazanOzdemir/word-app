import { Inject, Injectable } from '@nestjs/common';
import { type WordRepository } from '../domain/repository';

@Injectable()
export class WordDeleteService {
  constructor(@Inject('WordRepository') private wordRepo: WordRepository) {}
  async deleteWord(wordId: string): Promise<void> {
    const word = await this.wordRepo.findById(wordId);

    if (!word) throw new Error("Word doesn't exist");

    await this.wordRepo.delete(wordId);
  }
}
