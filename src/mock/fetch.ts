export const tmpFetch = async <T>(mocking: T): Promise<T> => {
	const result = await new Promise((resolve) =>
		setTimeout(() => {
			resolve(mocking)
		}, 1000),
	).then((res) => res as T)
	return result
}
