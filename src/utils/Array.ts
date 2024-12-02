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

// deno-lint-ignore no-explicit-any
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

/**
 * 
 */
Array.prototype.windows = function* (size: number) {
    if (size < 1) return [[]];
    if (size >= this.length) return [this];

    for (let i = 0; i < this.length - size + 1; i++) {
        yield this.slice(i, i + size);
    }
}

/**
 * If possible use windows() instead
 */
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

// deno-lint-ignore no-explicit-any
Array.prototype.zip = function (arr: any[]) {
    return this.map((v, i) => v += arr[i])
}

Array.prototype.frequencies = function () {
    return this.reduce((a, b) => (a[b] ? a[b]++ : a[b] = 1) ? a : a, {})
}

declare global {
    // deno-lint-ignore no-var
    var ascending: (a: number, b: number) => number
    // deno-lint-ignore no-var
    var descending: (a: number, b: number) => number
}

// Sorting predicates
globalThis.ascending = (a: number, b: number) => a - b;
globalThis.descending = (a: number, b: number) => b - a;