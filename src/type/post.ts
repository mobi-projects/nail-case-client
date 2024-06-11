import type { TComment } from "./comment"
import type { TNTTime } from "./time"

export type TPost = {
	id: number
	category: TPostCategory
	srcArr: string[]
	title: string
	content: string
	likes: number
	views: number
	comments: number
	createdAt: TNTTime
	commentArr: TComment[]
}
export type TPostCategory = "NEWS" | "NOTICE"
