export default function AccountDetectionNotice({ email }: { email: string }) {
	return (
		<span className="flex gap-[4px] text-Title03 font-SemiBold text-Gray100">
			<p className="inline-block font-Bold">{email}</p>
			<p className="inline-block">님의</p>
			<p className="inline-block text-PB100">운영자 계정</p>
			<p className="inline-block">이 확인되었습니다.</p>
		</span>
	)
}
