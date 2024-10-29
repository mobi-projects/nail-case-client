import { NTPulldownProvider } from "@/component/common/nt-pulldown"

import Alarm from "./alarm"
import LogoutButton from "./logout-button"
import ProfileImage from "./profile-image"

export default function HeaderMenu() {
	return (
		<div className="flex w-[236px] items-center justify-end gap-[12px] max-md:gap-2">
			<NTPulldownProvider>
				<Alarm />
			</NTPulldownProvider>
			<ProfileImage />
			<LogoutButton />
		</div>
	)
}
