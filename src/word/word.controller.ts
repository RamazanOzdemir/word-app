import { Controller, Get } from '@nestjs/common';
import { WordCreateService } from './services/word-create.service';
import { WordReadService } from './services/word-read.service';

@Controller('words')
export class WordsController {
  constructor(
    private createService: WordCreateService,
    private readService: WordReadService,
  ) {}
  @Get()
  async findAll() {
    return await this.readService.getWordList();
  }
}
