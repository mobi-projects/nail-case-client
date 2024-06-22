export default function Manager_Base_MyShop_Review_03() {
	return (
		<div className="mt-[18px] flex w-full flex-col gap-[25px] border-[5px] border-orange-300">
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01() {
	return (
		<div className="flex w-full flex-col gap-[16px] border-[5px] border-green-300">
			<Manager_Base_MyShop_Review_03_01_01 />
			<Manager_Base_MyShop_Review_03_01_02 />
			<Manager_Base_MyShop_Review_03_01_03 />
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01_01() {
	return <div className="h-[60px] w-full border-[5px] border-blue-300"></div>
}
function Manager_Base_MyShop_Review_03_01_02() {
	return <div className="h-[60px] w-full border-[5px] border-blue-300"></div>
}
function Manager_Base_MyShop_Review_03_01_03() {
	return (
		<div className="flex h-fit min-h-[30px] w-full items-end justify-between pr-[21px]">
			<div className="flex w-full gap-[36px]">
				<ReivewCommentImgae />
				<ReivewComment />
			</div>
		</div>
	)
}
function ReivewCommentImgae() {
	return (
		<div className="h-[164.85px] w-[180px] rounded-[26px] shadow-customGray80"></div>
	)
}
//사진 들어가면 border삭제 예정 또한 div > image변경예정
function ReivewComment() {
	return (
		<div className="line-clamp-5 h-fit w-[631px] text-Title03 text-Gray80">
			젠가 그대가 원한다면 Only we’ve been seeing what we need my bad 우리에게
			필요한 건 우리만 아니까 If you’re sober I’ll feel fine 그대가 취하지
			않았다면 난 괜찮을 거예요 If we get away, could we be like that? 만약 함께
			떠난다면 우리에게 사랑이 올까요? Sometime if you want me like that 언젠가
			그대가 원한다면 Only we’ve been seeing what we need my bad 우리에게 필요한
			건 우리만 아니까 If you’re sober I’ll feel fine 그대가 취하지 않았다면 난
			괜찮을 거예요 Oh oh oh oh (give it to me) 오 오 오 오 (신호를 줘요) Oh oh
			oh oh (give it to me) 오 오 오 오 (내가 알 수 있도록) Oh oh oh o
		</div>
	)
}
