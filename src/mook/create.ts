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
import type {
	TEssentialForm,
	TNailCondition,
	TReservation,
	TReservationStatus,
} from "@/type/reservation"

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
export const createReservationArr = (): TReservation[] =>
	getFakeObjArr(getRandomNumber(10), createReservation)

const createNTTime = (): TNTTime => {
	const current = new Date()
	const ntTime: TNTTime = {
		year: current.getFullYear(),
		month: current.getMonth() + 1,
		day: current.getDate(),
		hour: current.getHours(),
		minute: current.getMinutes(),
		division: current.getHours() > 12 ? "PM" : "AM",
	}
	return ntTime
}
const createOperating = (): TOperating => {
	const operating = {
		dayOfWeek: (Math.random() * 10) % 7,
		startTime: createNTTime(),
		endTime: createNTTime(),
	}
	return operating
}
const createSchedule = (): TSchedule => {
	const schedule: TSchedule = {
		id: faker.number.int(),
		reservationId: faker.number.int(),
		startTime: createNTTime(),
		endTime: createNTTime(),
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
const createReservation = (): TReservation => {
	const companion = getRandomNumber(2) // 동반자 수
	const totConsumer = companion + 1 // 방문 고객수 = 동반자 수 + 예약자 본인
	const reservation: TReservation = {
		id: faker.number.int(),
		status: createStatus(),
		artistArr: getFakeObjArr(totConsumer, createArtist),
		customer: createUser(),
		schedule: createSchedule(),
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
