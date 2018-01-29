declare module "factory-girl" {
  export function define(name: string, model: any, options: object): void
  export function create(name: string, options: object): object
}
