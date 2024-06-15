import { faker } from "@faker-js/faker/locale/ko"

import type {
	TArtist,
	TNTTime,
	TOperating,
	TSchedule,
	TShopGuide,
	TShopInfo,
	TUser,
} from "@/type"
import type { TComment } from "@/type/comment"
import type { TPost, TPostCategory } from "@/type/post"
import type {
	TEssentialForm,
	TNailCondition,
	TReservation,
	TReservationStatus,
} from "@/type/reservation"
import { transToNTTime } from "@/util/common/transform"

export const createShopInfo = (): TShopInfo => {
	const shopInfo: TShopInfo = {
		id: faker.string.uuid(),
		address: faker.location.streetAddress(),
		shopName: faker.company.name(),
		overview: faker.lorem.sentence(),
		todayAccess: faker.number.int(),
		totalAccess: faker.number.int(),
		phone: faker.phone.number(),
		hashtagArr: Array.from({ length: 3 }, () => "#" + faker.lorem.word()),
		snsArr: Array.from({ length: 4 }, () => faker.internet.url()),
		srcArr: Array.from({ length: 5 }, () => faker.image.url()),
		owner: createUser(),
		specialty: pickRandomOneOfArr(["NAIL", "PADI", "EYEBROW"]),
		guide: createGuide(),
		operatingTimeArr: getFakeObjArr(7, createOperating),
	}
	return shopInfo
}
export const createReservationArr = (
	from: number,
	to: number,
): TReservation[] =>
	getFakeObjArr(getRandomNumber(10), () => createReservation(from, to))

export const createPostArr = (): TPost[] =>
	getFakeObjArr(getRandomNumber(15), createPost)

const createPost = (): TPost => {
	const commentArr: TComment[] = getFakeObjArr(
		getRandomNumber(50),
		createComment,
	)
	const post: TPost = {
		id: faker.number.int(),
		category: pickRandomOneOfArr<TPostCategory>(["NEWS", "NOTICE"]),
		srcArr: getFakeObjArr(getRandomNumber(5), faker.image.url),
		title: faker.lorem.sentence({ min: 2, max: 6 }),
		content: faker.lorem.paragraphs({ min: 1, max: 10 }),
		likes: faker.number.int(),
		views: faker.number.int(),
		comments: commentArr.length,
		commentArr,
		createdAt: createNTTime(),
	}
	return post
}

const createComment = (): TComment => {
	const comment: TComment = {
		id: faker.number.int(),
		user: createUser(),
		likes: faker.number.int(),
		content: faker.lorem.paragraphs({ min: 1, max: 3 }),
	}
	return comment
}
const createTimeStamp = (from: number, to: number): number =>
	new Date(faker.date.between({ from, to })).getTime()

const createNTTime = (
	from: number = Date.now(),
	to: number = Date.now() + 6 * 60 * 60 * 1000,
): TNTTime => {
	const timestamp = createTimeStamp(from, to)
	return transToNTTime(timestamp)
}
const createOperating = (): TOperating => {
	const operating = {
		dayOfWeek: (Math.random() * 10) % 7,
		startTime: createNTTime(),
		endTime: createNTTime(),
	}
	return operating
}
const createSchedule = (
	from: number = Date.now(),
	to: number = Date.now() + 6 * 60 * 60 * 1000,
): TSchedule => {
	const schedule: TSchedule = {
		id: faker.number.int(),
		reservationId: faker.number.int(),
		startTime: createNTTime(from, to),
		endTime: createNTTime(from, to),
	}
	return schedule
}
const createUser = (): TUser => {
	const user: TUser = {
		id: faker.number.int(),
		name: faker.internet.userName(),
		email: faker.internet.email(),
		phone: faker.phone.number(),
	}
	return user
}
const createGuide = (): TShopGuide => {
	const guide: TShopGuide = {
		parking: Number(getRandomNumber(3)),
		companion: Number(getRandomNumber(3)),
		reservationDeadline: Number(getRandomNumber(3)),
	}
	return guide
}
const createArtist = (): TArtist => {
	const user = createUser()
	const artist: TArtist = {
		...user,
		specialty: "NAIL",
		workingTimeArr: getFakeObjArr(7, createOperating),
		scheduleArr: getFakeObjArr(getRandomNumber(2), createSchedule),
	}
	return artist
}
const createNailCondition = () => {
	const allNailConditions: TNailCondition[] = [
		"REPAIR",
		"AS",
		"WOUND_CARE",
		"CORRECTION",
	]
	const randomIdx = getRandomNumber(allNailConditions.length - 1)
	return allNailConditions[randomIdx]
}
const createNailConditionArr = (): TNailCondition[] => {
	const conditionArr = getFakeObjArr(getRandomNumber(4), createNailCondition)
	return [...new Set(conditionArr)]
}
const createEssentialForm = () => {
	const essentialForm: TEssentialForm = {
		reservationDate: createNTTime(),
		treatment: pickRandomOneOfArr(["AOM", "CARE", "ONE", "PICTURE"]),
		removalReq: pickRandomOneOfArr(["IN-SHOP", "ELSE-WHERE", "NO-NEED"]),
		extensionReq: getRandomBoolean(),
		conditionArr: createNailConditionArr(),
	}
	return essentialForm
}
const createStatus = (): TReservationStatus => {
	const statusArr: TReservationStatus[] = [
		"WAITING",
		"APPROVAL",
		"CANCELED",
		"REJECTED",
	]
	const randomIdx = getRandomNumber(statusArr.length - 1)
	return statusArr[randomIdx]
}
const createReservation = (
	from: number = Date.now(),
	to: number = Date.now() + 6 * 60 * 60 * 1000,
): TReservation => {
	const companion = getRandomNumber(2) // 동반자 수
	const totConsumer = companion + 1 // 방문 고객수 = 동반자 수 + 예약자 본인
	const reservation: TReservation = {
		id: faker.number.int(),
		status: createStatus(),
		artistArr: getFakeObjArr(totConsumer, createArtist),
		customer: createUser(),
		schedule: createSchedule(from, to),
		companion: getRandomNumber(3),
		essentialDetailArr: getFakeObjArr(totConsumer, createEssentialForm),
		customDetailArr: [],
	}
	return reservation
}
const getFakeObjArr = <T>(arrayLength: number, createFunc: () => T) =>
	Array.from({ length: arrayLength }, () => createFunc())
const getRandomNumber = (upperLimit: number = 1) =>
	Math.floor((Math.random() * 10) % (upperLimit + 1))
const getRandomBoolean = (): boolean => [true, false][getRandomNumber(1)]
const pickRandomOneOfArr = <T>(arr: T[]): T => {
	const randomIdx = getRandomNumber(arr.length - 1)
	return arr[randomIdx]
}
