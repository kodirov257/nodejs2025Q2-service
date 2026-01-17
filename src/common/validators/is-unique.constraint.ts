import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly moduleRef: ModuleRef) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [getService, methodName, getCurrentIdField] =
      validationArguments.constraints;
    const serviceType =
      typeof getService === 'function' ? (getService() as Type) : getService;
    const serviceInstance = this.moduleRef.get(serviceType, { strict: false });

    let method = methodName;
    if (!method) {
      let property = validationArguments.property;
      property = property.charAt(0).toUpperCase() + property.slice(1);
      method = `findBy${property}`;
    }

    if (!serviceInstance || typeof serviceInstance[method] !== 'function') {
      throw new Error(`Service or method ${method} not found.`);
    }

    const currentId = getCurrentIdField
      ? (validationArguments.object as any)[getCurrentIdField]
      : undefined;

    const existing = await serviceInstance[method](value, currentId);

    if (!existing) {
      return true;
    }

    return currentId && existing.id === currentId;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be unique`;
  }
}
