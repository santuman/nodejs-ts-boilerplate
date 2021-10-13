import assert from 'assert'
import path from 'path'

const envFileChecker = () => {
	assert(process.env.ENV_FILE_NAME === '.env-cmdrc.js')
	assert(process.env.ENV_FILE_PATH === path.join(path.resolve(), '.env-cmdrc.js'))

	console.log('Asserts Pass!')
}
export default envFileChecker
