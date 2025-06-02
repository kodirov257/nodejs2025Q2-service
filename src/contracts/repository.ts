export interface Repository<T> {
  all(): T[];
  create(...args: any): T;
  find(id: string | number): T | undefined;
  update(id: string | number, ...args: any): T;
  remove(id: string | number): boolean;
}
