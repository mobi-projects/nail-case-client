import Alarm from "./alarm"
import LogoutButton from "./logout-button"
import ProfileImage from "./profile-image"

export default function HeaderMenu() {
	return (
		<div className="flex w-[236px] items-center justify-end gap-[12px] pr-[21px]">
			<Alarm />
			<ProfileImage />
			<LogoutButton />
		</div>
	)
}
