declare module "factory-girl" {
  export const factory: {
    define(name: string, model: any, options: object): void
    create(name: string, options: object): object
  }
}
