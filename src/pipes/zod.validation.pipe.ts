import { BadRequestException, PipeTransform } from '@nestjs/common';
import z, { ZodObject, ZodError } from 'zod';
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject) {}

  transform(value: unknown) {
    console.log('value', value);
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod validation errors:', error);
        throw new BadRequestException(z.prettifyError(error));
      }
      throw new BadRequestException('Validation failed', {
        cause: error,
      });
    }
  }
}
