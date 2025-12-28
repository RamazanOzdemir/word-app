import { Test, TestingModule } from '@nestjs/testing';
import { WordUpdateService } from './word-update.service';
import { Word, WordType } from '../domain/entity';
import { NotFoundException } from 'src/common/exceptions/domain.exceptions';

describe('WordUpdateService', () => {
  let service: WordUpdateService;
  const mockWordRepository = {
    findById: jest.fn(),
    findByContext: jest.fn(),
    update: jest.fn(),
  };
  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordUpdateService,
        { provide: 'WordRepository', useValue: mockWordRepository },
      ],
    }).compile();

    service = module.get<WordUpdateService>(WordUpdateService);
  });

  it('should update a word when word exists', async () => {
    const input = {
      context: 'updated example',
      type: 'noun' as WordType,
      description: 'An updated example word',
    };

    const existingWord = Word.create(
      'old example',
      'verb' as WordType,
      'old description',
    );

    const existingWordId = existingWord.getId();

    // arrange
    mockWordRepository.findById.mockResolvedValue(existingWord);
    mockWordRepository.update.mockResolvedValue(undefined);

    // act
    const result = await service.updateWord(existingWordId, input);

    // assert
    expect(mockWordRepository.update).toHaveBeenCalledWith(existingWord);
    expect(mockWordRepository.findById).toHaveBeenCalledWith(existingWordId);
    expect(result.id).toBe(existingWordId);
    expect(result.context).toBe(input.context);
    expect(result.type).toBe(input.type);
    expect(result.description).toBe(input.description);
  });

  it('should throw an error when word does not exist', async () => {
    const input = {
      context: 'nonexistent example',
      type: 'verb' as WordType,
      description: 'A nonexistent word',
    };

    const nonexistentWordId = 'nonexistent-id';
    // arrange
    mockWordRepository.findById.mockResolvedValue(null);

    // act & assert
    await expect(
      service.updateWord(nonexistentWordId, input),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(mockWordRepository.findById).toHaveBeenCalledWith(nonexistentWordId);
    expect(mockWordRepository.update).not.toHaveBeenCalled();
  });
});
