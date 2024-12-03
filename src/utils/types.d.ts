interface String {
    matchOverlapping(regex: RegExp): string[]
    posInts(): number[]
    negInts(): number[]
    ints(): number[]
    nums(): number[]
    lines(): string[]
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
    frequencies(): { [key: string | number]: number }
    windowGen(size: number): Generator<T[]>
    mean(): number
    median(): number
    log(): T[]
    allUnique(): boolean
    allEqual(): boolean
}