import type { TUser } from "./user"

export type TComment = {
	id: number
	user: TUser
	likes: number
	content: string
}
