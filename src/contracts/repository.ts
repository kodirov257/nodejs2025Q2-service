export interface Repository<T> {
  all(): Promise<T[]>;
  create(...args: any): Promise<T>;
  find(id: string | number): Promise<T | null>;
  update(id: string | number, ...args: any): Promise<T>;
  remove(id: string | number): Promise<boolean>;
}
