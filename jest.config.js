module.exports = {
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.ts$",
	moduleFileExtensions: [ 'ts', 'js' ],
}
