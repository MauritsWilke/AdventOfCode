interface String {
	matchOverlapping(regex: RegExp): string[]
}

interface Array<T> {
	sum(): number
	product(): number
	uniques(): T[]
	max(): number
	min(): number
	intersect(arr: any): T[]
	chunk(size: number): T[][]
	window(size: number): T[][]
}