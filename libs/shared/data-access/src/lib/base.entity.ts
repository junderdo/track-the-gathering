export abstract class BaseEntity {
  abstract id: string | number;

  constructor(data?: Partial<BaseEntity>) {
    Object.assign(this, data);
  }

  static getPropertyNames(): string[] {
    return Object.keys(this.prototype);
  }
}
