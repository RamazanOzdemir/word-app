import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { WordCreateService } from './services/word-create.service';
import { WordReadService } from './services/word-read.service';
import {
  WordCrateDto,
  type WordCreateInput,
  wordCreateSchema,
  WordUpdateDto,
  wordUpdateSchema,
} from './word.dto';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { WordUpdateService } from './services/word-update.service';

@Controller('words')
export class WordsController {
  constructor(
    private createService: WordCreateService,
    private readService: WordReadService,
    private updateService: WordUpdateService,
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

  // @UsePipes(new ZodValidationPipe(wordUpdateSchema))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(wordUpdateSchema)) body: WordUpdateDto,
  ) {
    return await this.updateService.updateWord(id, body);
  }
}
