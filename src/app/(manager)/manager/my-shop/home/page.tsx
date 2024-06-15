"use client"

import { useState } from "react"

import NTOption from "@/component/common/nt-option"
import Pagination from "@/component/common/nt-pagination"
import { useOption } from "@/hook/use-component"

export default function Home() {
	const sections = new Array(4).fill(null)
	const notice = new Array(3).fill(null)
	const [currentPage, setCurrentPage] = useState(1)

	const categories = [
		{
			title: "시술 내용",
			options: ["이달의 아트", "케어", "원 컬러", "사진 등록"],
		},
		{
			title: "네일 제거 유무",
			options: ["자샾 제거 필요", "타샾 제거 필요", "제거 필요 없음"],
		},
		{
			title: "연장 유무",
			options: ["연장 필요", "연장 필요 없음"],
		},
		{
			title: "컨디션",
			options: ["손톱 보수 필요", "A/S 필요", "상처 있음", "교정 필요"],
		},
	]

	const {
		onClickOption: onClickOption1,
		checkedOption: checkedOption1,
		optionArr: optionArr1,
	} = useOption(categories[0].options)
	const {
		onClickOption: onClickOption2,
		checkedOption: checkedOption2,
		optionArr: optionArr2,
	} = useOption(categories[1].options)
	const {
		onClickOption: onClickOption3,
		checkedOption: checkedOption3,
		optionArr: optionArr3,
	} = useOption(categories[2].options)
	const {
		onClickOption: onClickOption4,
		checkedOption: checkedOption4,
		optionArr: optionArr4,
	} = useOption(categories[3].options)

	const handlePageChange = (nextPage: number) => {
		setCurrentPage(nextPage)
	}

	return (
		<div>
			<div>헤더</div>
			<div>케러셀</div>
			<div>텝바</div>
			<div>
				<div className="text-Title03 text-Gray100">내 샾 정보</div>
				<div className="flex justify-between">
					{sections.map((_, index) => (
						<div
							key={index}
							className="border-Gary100 h-[164px] w-[282px] rounded-[26px] border drop-shadow"
						>
							<div className="section-title"></div>
							<div className="section-content"></div>
						</div>
					))}
				</div>
				<div className="my-[25px] border border-b-[1.5px] border-Gray10"></div>
				<div>
					<div className="mb-[25px] text-Title03 text-Gray100">
						필수 예약 사항
					</div>
					<div>
						<div className="flex justify-between">
							<div className="flex h-[586px] w-[690px] flex-col justify-center space-y-6 rounded-[26px] border p-4 drop-shadow">
								<div>
									<div className="text-Heading02 mb-[15px] text-Gray80">
										{categories[0].title}
									</div>
									<NTOption
										onClickOption={onClickOption1}
										optionArr={optionArr1}
										checkedOption={checkedOption1}
										itemsPerRow={4}
									/>
								</div>
								<div className="border border-b-Gray10"></div>
								<div>
									<div className="text-Heading02 mb-[15px] text-Gray80">
										{categories[1].title}
									</div>
									<NTOption
										onClickOption={onClickOption2}
										optionArr={optionArr2}
										checkedOption={checkedOption2}
										itemsPerRow={4}
									/>
								</div>
								<div className="border border-b-Gray10"></div>
								<div>
									<div className="text-Heading02 mb-[15px] text-Gray80">
										{categories[2].title}
									</div>
									<NTOption
										onClickOption={onClickOption3}
										optionArr={optionArr3}
										checkedOption={checkedOption3}
										itemsPerRow={4}
									/>
								</div>
								<div className="border border-b-Gray10"></div>
								<div>
									<div className="text-Heading02 mb-[15px] text-Gray80">
										{categories[3].title}
									</div>
									<NTOption
										onClickOption={onClickOption4}
										optionArr={optionArr4}
										checkedOption={checkedOption4}
										itemsPerRow={4}
									/>
								</div>
							</div>
							<div className="h-[586px] w-[486px] rounded-[26px] border drop-shadow"></div>
						</div>
					</div>
				</div>
				<div className="mt-[25px]">
					<div className="flex items-center justify-between">
						<div className="text-Title03 text-Gray100">공지</div>
						<div className="text-Heading02 text-Gray40">전체보기</div>
					</div>
					<div>
						{notice.map((_, index) => (
							<div
								key={index}
								className="border-Gary100 my-[25px] h-[260px] w-[1200px] rounded-[26px] border drop-shadow"
							>
								<div className="section-title"></div>
								<div className="section-content"></div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div>
				<Pagination
					curPage={currentPage}
					perPage={1}
					totPage={3}
					onChangePage={handlePageChange}
				/>
			</div>
		</div>
	)
}
