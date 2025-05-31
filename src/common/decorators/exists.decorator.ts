import { registerDecorator, ValidationOptions } from 'class-validator';
import { ExistsConstraint } from '../validators/exists.constraint';

export function Exists(
  getService: () => any,
  searchableField: string,
  methodName?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Exists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [getService, searchableField, methodName],
      options: validationOptions,
      validator: ExistsConstraint,
    });
  };
}