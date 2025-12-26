import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { WordCreateService } from './services/word-create.service';
import { WordDeleteService } from './services/word-delete.service';
import { WordReadService } from './services/word-read.service';
import { WordUpdateService } from './services/word-update.service';
import {
  WordCrateDto,
  wordCreateSchema,
  WordUpdateDto,
  wordUpdateSchema,
} from './word.dto';

@Controller('words')
export class WordsController {
  constructor(
    private createService: WordCreateService,
    private readService: WordReadService,
    private updateService: WordUpdateService,
    private deleteService: WordDeleteService,
  ) {}
  @Get()
  async findAll() {
    return await this.readService.getWordList();
  }

  @UsePipes(new ZodValidationPipe(wordCreateSchema))
  @Post()
  async create(@Body() body: WordCrateDto) {
    return await this.createService.create(body);
  }

  // @UsePipes(new ZodValidationPipe(wordUpdateSchema))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(wordUpdateSchema)) body: WordUpdateDto,
  ) {
    return await this.updateService.updateWord(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteService.deleteWord(id);
  }
}
