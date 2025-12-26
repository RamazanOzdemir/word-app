import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { WordCreateService } from './services/word-create.service';
import { WordReadService } from './services/word-read.service';
import {
  WordCrateDto,
  type WordCreateInput,
  wordCreateSchema,
} from './word.dto';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';

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

  @UsePipes(new ZodValidationPipe(wordCreateSchema))
  @Post()
  async create(@Body() body: WordCrateDto) {
    return await this.createService.create(body as WordCreateInput);
  }
}
