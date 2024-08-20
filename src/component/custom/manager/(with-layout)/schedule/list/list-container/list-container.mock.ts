import type { TResGetListReservation } from "@/util/api-v2/list-reservation"

/** [TODO] : 추후에 삭제, mocking data */
export const MOCKING_PENDING_RESERVATION_LIST: TResGetListReservation = [
	{
		id: 1000,
		nickname: "동해물과 백두산이 마르고 닳도록",
		startTime: 1718440100,
		endTime: 1718447300,
		status: "PENDING",
		treatmentDetail: {
			options: ["AOM", "CARE"],
			images: null,
		},
		remove: "IN_SHOP",
		extend: true,
		conditionOptions: ["REPAIR", "AS"],
	},
	{
		id: 1001,
		nickname: "남산 위의 저 소나무 철갑을 두른 듯",
		startTime: 1718425700,
		endTime: 1718427200,
		status: "PENDING",
		treatmentDetail: {
			options: ["AOM", "MEMBER_IMAGE"],
			images: [
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 3001,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 3002,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 3003,
				},
			],
		},
		remove: "IN_SHOP",
		extend: true,
		conditionOptions: ["REPAIR", "AS"],
	},
	{
		id: 1002,
		nickname: "가을 하늘 공활한데 높고 구름없이",
		startTime: 1718078000,
		endTime: 1718092400,
		status: "PENDING",
		treatmentDetail: {
			options: ["AOM", "CARE", "ONE", "MEMBER_IMAGE"],
			images: [
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 3011,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 3012,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 3013,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 3014,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 3015,
				},
			],
		},
		remove: "ELSE_WHERE",
		extend: true,
		conditionOptions: ["REPAIR", "CORRECTION"],
	},
	{
		id: 1003,
		nickname: "이 기상과 이 맘으로 충성을 다 하여",
		startTime: 1720681200,
		endTime: 1720854000,
		status: "PENDING",
		treatmentDetail: {
			options: ["ONE"],
			images: null,
		},
		remove: "IN_SHOP",
		extend: false,
		conditionOptions: null,
	},
] as const

/** [TODO] : 추후에 삭제, mocking data */
export const MOCKING_CONFIRMED_RESERVATION_LIST: TResGetListReservation = [
	{
		id: 2000,
		nickname: "하나님이 보우하사 우리나라 만세",
		startTime: 1722063600,
		endTime: 1722070800,
		status: "CONFIRMED",
		treatmentDetail: {
			options: ["CARE", "ONE"],
			images: null,
		},
		remove: "NO_NEED",
		extend: false,
		conditionOptions: null,
	},
	{
		id: 2001,
		nickname: "바람서리 불변함은 우리 기상일세",
		startTime: 1718425700,
		endTime: 1718427200,
		status: "CONFIRMED",
		treatmentDetail: {
			options: ["AOM", "MEMBER_IMAGE"],
			images: [
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4001,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4002,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4003,
				},
			],
		},
		remove: "IN_SHOP",
		extend: false,
		conditionOptions: ["REPAIR", "AS", "WOUND_CARE", "CORRECTION"],
	},
	{
		id: 2002,
		nickname: "밝은 달은 우리 가슴 일편단심일세",
		startTime: 1722243600,
		endTime: 1722249000,
		status: "CONFIRMED",
		treatmentDetail: {
			options: ["AOM", "ONE", "MEMBER_IMAGE"],
			images: [
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4011,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4012,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4013,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4014,
				},
			],
		},
		remove: "NO_NEED",
		extend: false,
		conditionOptions: null,
	},
	{
		id: 2003,
		nickname: "괴로우나 즐거우나 우리나라 만세",
		startTime: 1720681200,
		endTime: 1720854000,
		status: "CONFIRMED",
		treatmentDetail: {
			options: ["ONE", "MEMBER_IMAGE"],
			images: [
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4021,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4022,
				},
			],
		},
		remove: "IN_SHOP",
		extend: true,
		conditionOptions: ["AS", "WOUND_CARE", "CORRECTION"],
	},
	{
		id: 2004,
		nickname: "산과 들의 푸르름은 우리 자랑일세",
		startTime: 1723000000,
		endTime: 1723003600,
		status: "CONFIRMED",
		treatmentDetail: {
			options: ["CARE", "ONE"],
			images: null,
		},
		remove: "ELSE_WHERE",
		extend: false,
		conditionOptions: ["REPAIR"],
	},
	{
		id: 2005,
		nickname: "강물처럼 흐르는 시간도 우리 것일세",
		startTime: 1724000000,
		endTime: 1724003600,
		status: "CONFIRMED",
		treatmentDetail: {
			options: ["AOM", "MEMBER_IMAGE"],
			images: [
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4031,
				},
				{
					imageUrl: "https://picsum.photos/540/675",
					imageId: 4032,
				},
			],
		},
		remove: "IN_SHOP",
		extend: true,
		conditionOptions: ["CORRECTION"],
	},
	{
		id: 2006,
		nickname: "바람 불어도 흔들리지 않는 나무",
		startTime: 1725000000,
		endTime: 1725003600,
		status: "CONFIRMED",
		treatmentDetail: {
			options: ["CARE"],
			images: null,
		},
		remove: "NO_NEED",
		extend: false,
		conditionOptions: null,
	},
	{
		id: 2007,
		nickname: "맑은 하늘 아래에 피어난 꽃들",
		startTime: 1726000000,
		endTime: 1726003600,
		status: "CONFIRMED",
		treatmentDetail: {
			options: ["AOM", "ONE"],
			images: null,
		},
		remove: "ELSE_WHERE",
		extend: true,
		conditionOptions: ["WOUND_CARE"],
	},
] as const
