Array.prototype.sum = function () {
	return this.reduce((a, b) => a + b, 0);
}

Array.prototype.product = function () {
	if (this.length === 0) return 0;
	return this.reduce((a, b) => a * b, 1);
}

Array.prototype.uniques = function () {
	return Array.from(new Set(this));
}

Array.prototype.max = function () {
	return Math.max(...this);
}

Array.prototype.min = function () {
	return Math.min(...this);
}

Array.prototype.intersect = function (arr: any[]) {
	const setA = new Set(arr);
	return this.filter(v => setA.has(v));
}

Array.prototype.chunk = function (size: number) {
	if (size < 1) return [[]];
	const arr = [];
	for (let i = 0; i < this.length; i += size) {
		arr.push(this.slice(i, i + size))
	}
	return arr;
}

Array.prototype.window = function (size: number) {
	if (size < 1) return [[]];
	if (size >= this.length) return [this];
	const arr = [];
	for (let i = 0; i < this.length - size + 1; i++) {
		arr.push(this.slice(i, i + size));
	}
	return arr;
}

Array.prototype.pairs = function () {
	return this.map((v, i) => this.slice(i + 1).map(w => [v, w])).flat();
}