export enum DomainErrorNames {
  DomainException = 'DomainException',
  NotFoundException = 'NotFoundException',
  DuplicateEntityException = 'DuplicateEntityException',
}
export class DomainException extends Error {
  name: DomainErrorNames;
  constructor(message: string) {
    super(message);
    this.name = DomainErrorNames.DomainException;
  }
}

export class NotFoundException extends DomainException {
  constructor(entity: string, field: string, value: string) {
    super(`${entity} with ${field} ${value} not found.`);
    this.name = DomainErrorNames.NotFoundException;
  }
}

export class DuplicateEntityException extends DomainException {
  constructor(entity: string, field: string, value: string) {
    super(`${entity} with ${field} "${value}" already exists.`);
    this.name = DomainErrorNames.DuplicateEntityException;
  }
}
