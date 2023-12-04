import "./index.js";

const start = [1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 5, 4, 3, 2];
const chunk = start.chunk(7);
const intersect = chunk[0].intersect(chunk[1]);
const uniques = intersect.uniques();
const product = uniques.product();
const sum = uniques.sum();
