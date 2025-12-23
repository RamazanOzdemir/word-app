import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsModule } from './word/word.module';

@Module({
  imports: [WordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
