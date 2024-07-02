export const isNull = (input: unknown): input is null => input === null
export const isUndefined = (input: unknown): input is undefined =>
	typeof input === "undefined"
export const isDate = (input: unknown): input is Date => input instanceof Date
