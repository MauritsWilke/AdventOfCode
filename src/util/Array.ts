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