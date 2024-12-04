interface String {
    matchOverlapping(regex: RegExp): string[]
    posInts(): number[]
    negInts(): number[]
    ints(): number[]
    nums(): number[]
    lines(): string[]
    chunk(size: number): string[]
}

interface Array<T> {
    sum(this: Array<number>): number
    product(this: Array<number>): number
    uniques(): T[]
    max(this: Array<number>): number
    min(this: Array<number>): number
    // deno-lint-ignore no-explicit-any
    intersect(arr: any): T[]
    chunk(size: number): T[][]
    window(size: number): T[][]
    pairs(): T[][]
    // deno-lint-ignore no-explicit-any
    zip(arr: any): T[]
    frequencies(): { [key: string | number]: number }
    windowGen(size: number): Generator<T[]>
    mean(this: Array<number>): number
    median(this: Array<number>): number
    log(): T[]
    allUnique(): boolean
    allEqual(): boolean
}