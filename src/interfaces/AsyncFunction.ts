export type AsyncFunction<A extends Array<unknown>, O> = (...args: A) => Promise<O>
