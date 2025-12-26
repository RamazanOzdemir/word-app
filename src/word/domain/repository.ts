import { ListWordQuery, WordResponse } from '../word.dto';
import { Word } from './entity';

export interface WordRepository {
  create(word: Word): Promise<void>;
  findByContext(context: string): Promise<Word | null>;
  findById(id: string): Promise<Word | null>;
  findAll(query?: ListWordQuery): Promise<WordResponse[]>;
  update(word: Word): Promise<void>;
  delete(wordId: string): Promise<void>;
  count(query?: ListWordQuery): Promise<number>;
}
