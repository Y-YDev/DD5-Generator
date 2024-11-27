/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	roots: ['<rootDir>/src'],
	testEnvironment: 'node',
	modulePathIgnorePatterns: [
		'<rootDir>/src/treasureGenerator/__tests__/generator/test-utils.ts',
		'<rootDir>/src/treasureGenerator/__tests__/generator/test_data/*',
	],
	transform: {
		'^.+.tsx?$': ['ts-jest', {}],
	},
	reporters: [
		'default',
		[
			'jest-html-reporters',
			{
				publicPath: './html-report',
				filename: 'report.html',
				openReport: true,
			},
		],
	],
};
