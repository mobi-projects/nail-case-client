import { faker } from "@faker-js/faker/locale/ko"

import type {
	TNTTime,
	TOperating,
	TSchedule,
	TShopGuide,
	TShopInfo,
	TSpecialty,
	TUser,
} from "@/type"

export const createNTTime = (): TNTTime => {
	const current = new Date()
	const ntTime: TNTTime = {
		year: current.getFullYear(),
		month: current.getMonth() + 1,
		day: current.getDate(),
		hour: current.getHours(),
		minute: current.getMinutes(),
		division: current.getHours() > 12 ? "pm" : "am",
	}
	return ntTime
}
export const createOperating = (): TOperating => {
	const operating = {
		dayOfWeek: (Math.random() * 10) % 7,
		startTime: createNTTime(),
		endTime: createNTTime(),
	}
	return operating
}
export const createSchedule = (): TSchedule => {
	const schedule: TSchedule = {
		id: faker.string.uuid(),
		startTime: createNTTime(),
		endTime: createNTTime(),
	}
	return schedule
}
export const createOwner = (): TUser => {
	const owner: TUser = {
		id: faker.string.uuid(),
		name: faker.internet.userName(),
		email: faker.internet.email(),
		phone: faker.phone.number(),
		scheduleArr: Array.from({ length: 2 }, () => createSchedule()),
	}
	return owner
}
export const createGuide = (): TShopGuide => {
	const guide: TShopGuide = {
		parking: Number(Math.random() * 10),
		companion: Number(Math.random() * 10),
		reservationDeadline: Number(Math.random() * 10),
	}
	return guide
}
export const createShopInfo = (): TShopInfo => {
	const specialties = ["eyebrow", "padi", "nail"]
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
		owner: createOwner(),
		specialty: specialties[(Math.random() * 10) % 3] as TSpecialty,
		guide: createGuide(),
		operatingTimeArr: Array.from({ length: 7 }, () => createOperating()),
	}
	return shopInfo
}
