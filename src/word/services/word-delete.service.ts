import { Inject, Injectable } from '@nestjs/common';
import { type WordRepository } from '../domain/repository';
import { NotFoundException } from 'src/common/exceptions/domain.exceptions';

@Injectable()
export class WordDeleteService {
  constructor(@Inject('WordRepository') private wordRepo: WordRepository) {}
  async deleteWord(wordId: string): Promise<void> {
    const word = await this.wordRepo.findById(wordId);

    if (!word) throw new NotFoundException('Word', 'ID', wordId);

    await this.wordRepo.delete(wordId);
  }
}
