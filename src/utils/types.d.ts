interface String {
    matchOverlapping(regex: RegExp): string[]
}

interface Array<T> {
    sum(): number
    product(): number
    uniques(): T[]
    max(): number
    min(): number
    // deno-lint-ignore no-explicit-any
    intersect(arr: any): T[]
    chunk(size: number): T[][]
    window(size: number): T[][]
    pairs(): T[][]
    // deno-lint-ignore no-explicit-any
    zip(arr: any): T[]
}