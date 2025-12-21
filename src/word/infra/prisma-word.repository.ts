import { prisma } from 'lib/prisma';
import { Word } from '../domain/entity';
import { WordRepository } from '../domain/repository';
import { ListWordQuery, WordResponse } from '../word.dto';

export class PrismaWordRepository implements WordRepository {
  async create(word: Word): Promise<void> {
    await prisma.word.create({
      data: {
        id: word.getId(),
        context: word.getContext(),
        type: word.getType(),
        description: word.getDescription(),
      },
    });
  }
  async findByContext(context: string): Promise<Word | null> {
    const word = await prisma.word.findUnique({
      where: { context },
    });

    return word ? Word.fromPersistence(word) : null;
  }
  async findAll(query?: ListWordQuery): Promise<WordResponse[]> {
    const wordList = await prisma.word.findMany({
      skip: query?.offset,
      take: query?.limit,
      select: {
        id: true,
        context: true,
        type: true,
        description: true,
      },
    });
    return wordList;
  }

  async count(query?: ListWordQuery): Promise<number> {
    return await prisma.word.count({
      skip: query?.offset,
      take: query?.limit,
    });
  }
}
