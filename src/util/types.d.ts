interface String {
	matchOverlapping(regex: RegExp): string[]
}

interface Array<T> {
	sum(): number
	product(): number
	uniques(): any[]
	max(): number
	min(): number
}