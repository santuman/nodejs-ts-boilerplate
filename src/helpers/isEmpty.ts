type SimpleObject = { [key: string]: string | number | undefined }
export type ComplexObject = SimpleObject | { [key: string]: SimpleObject | string | number }

export const isEmpty = (item: ComplexObject) => {
	for (const key in item) {
		const valueToCheck = item[key]
		if (typeof valueToCheck === 'object') {
			isEmpty(valueToCheck)
		} else {
			if (!valueToCheck) throw new Error('⚠️ All environment variables are not fullfilled ⚠️')
		}
	}
}
