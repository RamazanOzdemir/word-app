import { ListWordQuery, WordResponse } from '../word.dto';
import { Word } from './entity';

export interface WordRepository {
  create(word: Word): Promise<void>;
  findByContext(context: string): Promise<Word | null>;
  findAll(query?: ListWordQuery): Promise<WordResponse[]>;
  count(query?: ListWordQuery): Promise<number>;
}
