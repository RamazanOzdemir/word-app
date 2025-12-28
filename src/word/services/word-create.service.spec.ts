import { Test, TestingModule } from '@nestjs/testing';
import { WordCreateService } from './word-create.service';
import { Word, WordType } from '../domain/entity';
import { DuplicateEntityException } from 'src/common/exceptions/domain.exceptions';

describe('WordCreateService', () => {
  let service: WordCreateService;
  const mockWordRepository = {
    findByContext: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordCreateService,
        { provide: 'WordRepository', useValue: mockWordRepository },
      ],
    }).compile();

    service = module.get<WordCreateService>(WordCreateService);
  });

  it('should create a word when context is unique', async () => {
    const input = {
      context: 'example',
      type: 'noun' as WordType,
      description: 'An example word',
    };

    // arrange
    mockWordRepository.findByContext.mockResolvedValue(null);
    mockWordRepository.create.mockResolvedValue(undefined);

    // act
    const result = await service.create(input);

    // assert
    expect(mockWordRepository.create).toHaveBeenCalled();
    expect(mockWordRepository.findByContext).toHaveBeenCalledWith(
      input.context,
    );
    expect(result).toHaveProperty('id');
    expect(result.context).toBe(input.context);
    expect(result.type).toBe(input.type);
    expect(result.description).toBe(input.description);
  });

  it('should throw an error when context already exists', async () => {
    const input = {
      context: 'duplicate',
      type: 'verb' as WordType,
      description: 'A duplicate word',
    };

    const existingWord = Word.create(
      input.context,
      input.type,
      input.description,
    );

    // arrange
    mockWordRepository.findByContext.mockResolvedValue(existingWord);

    // act & assert
    await expect(service.create(input)).rejects.toBeInstanceOf(
      DuplicateEntityException,
    );
    expect(mockWordRepository.findByContext).toHaveBeenCalledWith(
      input.context,
    );
    expect(mockWordRepository.create).not.toHaveBeenCalled();
  });
});
