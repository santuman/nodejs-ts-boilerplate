export default {
	// Run type-check on changes to TypeScript files
	'**/*.ts?(x)': () => 'npm run type-check',
	// Run ESLint on changes to JavaScript/TypeScript files
	'**/*.(ts|js)?(x)': () => 'npm run lint',
}
