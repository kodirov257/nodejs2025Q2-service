import { validate } from 'uuid';

export const isUUIDValid = (uuid: string) => {
  return validate(uuid);
};
