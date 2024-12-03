/**
 * Keep in mind capture groups might behave differently.
 */
String.prototype.matchOverlapping = function (regex: RegExp) {
    const string = regex.toString();
    const flags = string.match(/(?<!\\)\/(g|m|i|y|u|v|s|d)*$/)!.slice(1);
    const cleanRegex = string
        .replace(/^\//, "")
        .replace(/(?<!\\)\/(g|m|i|y|u|v|s|d)*$/, "");

    const re = new RegExp(`(?=(${cleanRegex}))`, `g${flags}`);

    return [...this.matchAll(re)].map(v => v[1]);
}

/**
 * Matches all numbers WITHOUT sign
 * "5 -6 7.8" => [5, 6, 7, 8]
 */
String.prototype.posInts = function () {
    return this.match(/\d+/g)?.map(Number) ?? []
}

/**
 * Matches all numbers WITH sign
 * "5 -6 7.8" => [-6]
 */
String.prototype.negInts = function () {
    return this.match(/-\d+/g)?.map(Number) ?? []
}

/**
 * Matches all numbers regardless of sign
 * "5 -6 7.8" => [5, -6, 7, 8]
 */
String.prototype.ints = function () {
    return this.match(/-?\d+/g)?.map(Number) ?? []
}

/**
 * Match all numbers and take into account DECIMAL
 * "5 -6 7.8" => [5, -6, 7.8]
 */
String.prototype.nums = function () {
    return this.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []
}

String.prototype.lines = function () {
    return this.trim().split("\n")
}