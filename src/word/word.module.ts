import { Module } from '@nestjs/common';
import { PrismaWordRepository } from './infra/prisma-word.repository';
import { WordCreateService } from './services/word-create.service';
import { WordReadService } from './services/word-read.service';
import { WordsController } from './word.controller';
import { WordUpdateService } from './services/word-update.service';
@Module({
  providers: [
    {
      provide: 'WordRepository',
      useClass: PrismaWordRepository,
    },
    {
      provide: WordCreateService,
      useClass: WordCreateService,
    },
    {
      provide: WordReadService,
      useClass: WordReadService,
    },
    {
      provide: WordUpdateService,
      useClass: WordUpdateService,
    },
  ],
  controllers: [WordsController],
})
export class WordsModule {}
