import { Controller, Get } from '@nestjs/common';

@Controller('words')
export class WordsController {
  constructor() {}
  @Get()
  findAll() {}
}
