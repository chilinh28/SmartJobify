import 'reflect-metadata'

export function Controller(baseRoute: string = '') {
  return function (target: any) {
    Reflect.defineMetadata('baseRoute', baseRoute, target)
  }
}
