import { Test, TestingModule } from '@nestjs/testing';
import { WordDeleteService } from './word-delete.service';
import { Word } from '../domain/entity';
import { NotFoundException } from 'src/common/exceptions/domain.exceptions';

describe('WordDeleteService', () => {
  let service: WordDeleteService;
  const mockWordRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordDeleteService,
        { provide: 'WordRepository', useValue: mockWordRepository },
      ],
    }).compile();

    service = module.get<WordDeleteService>(WordDeleteService);
  });

  it('should delete a word when it exists', async () => {
    const existingWord = Word.create(
      'to be deleted',
      'verb' as const,
      'A word that will be deleted',
    );

    const existingWordId = existingWord.getId();

    // arrange
    mockWordRepository.findById.mockResolvedValue(existingWord);
    mockWordRepository.delete.mockResolvedValue(undefined);

    // act
    await service.deleteWord(existingWordId);

    // assert
    expect(mockWordRepository.findById).toHaveBeenCalledWith(existingWordId);
    expect(mockWordRepository.delete).toHaveBeenCalledWith(existingWordId);
  });

  it('should throw an error when word does not exist', async () => {
    const nonExistentWordId = 'non-existent-id';

    // arrange
    mockWordRepository.findById.mockResolvedValue(null);

    // act & assert
    await expect(service.deleteWord(nonExistentWordId)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(mockWordRepository.findById).toHaveBeenCalledWith(nonExistentWordId);
    expect(mockWordRepository.delete).not.toHaveBeenCalled();
  });
});
