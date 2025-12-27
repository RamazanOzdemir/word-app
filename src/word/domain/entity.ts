export type WordType = 'noun' | 'verb' | 'adjective';
import { DomainException } from 'src/common/exceptions/domain.exceptions';
import { uuid } from 'uuidv4';

export class Word {
  private constructor(
    private readonly id: string,
    private context: string,
    private type: WordType,
    private description: string,
  ) {}

  getId() {
    return this.id;
  }
  getContext() {
    return this.context;
  }
  getType() {
    return this.type;
  }
  getDescription() {
    return this.description;
  }

  static create(context: string, type: WordType, description: string) {
    // Optional: business rule
    if (!context.trim() || context.length < 1)
      throw new DomainException('Context cannot be empty');

    if (!description.trim() || description.length < 1)
      throw new DomainException('Description cannot be empty');

    const id = uuid();

    return new Word(id, context, type, description);
  }

  updateContext(newContext: string) {
    if (!newContext.trim())
      throw new DomainException('Context cannot be empty');
    this.context = newContext;
  }

  updateDescription(newDescription: string) {
    if (!newDescription.trim())
      throw new DomainException('Description cannot be empty');
    this.description = newDescription;
  }

  updateType(newType: WordType) {
    if (!newType) throw new DomainException('Word Type cannot be empty');
    this.type = newType;
  }

  static fromPersistence(props: {
    id: string;
    context: string;
    type: WordType;
    description: string;
  }) {
    return new Word(props.id, props.context, props.type, props.description);
  }
}
