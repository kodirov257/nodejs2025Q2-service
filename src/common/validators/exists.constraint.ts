import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly moduleRef: ModuleRef) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [getService, searchableField, methodName] =
      validationArguments.constraints;
    const serviceType =
      typeof getService === 'function' ? (getService() as Type) : getService;
    const serviceInstance = this.moduleRef.get(serviceType, { strict: false });

    let method = methodName;
    if (!method) {
      const property =
        searchableField.charAt(0).toUpperCase() + searchableField.slice(1);
      method = `findBy${property}`;
    }

    if (!serviceInstance || typeof serviceInstance[method] !== 'function') {
      throw new Error(`Service or method ${method} not found.`);
    }

    return await serviceInstance[method](value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Invalid ${validationArguments.property}`;
  }
}
