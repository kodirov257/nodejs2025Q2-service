import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from '../validators';

export function IsUnique(
  getService: () => any,
  methodName?: string,
  getCurrentIdField?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [getService, methodName, getCurrentIdField],
      options: validationOptions,
      validator: IsUniqueConstraint,
    });
  };
}
