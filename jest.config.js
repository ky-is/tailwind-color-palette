module.exports = {
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	testMatch: [
		'<rootDir>/tests/**/*.spec.ts',
	],
	moduleFileExtensions: [ 'ts', 'js' ],
}
