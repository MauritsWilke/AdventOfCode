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