import ShopRegisterHeader from "@/component/custom/manager/base/register-shop/header"
import ShopRegisterForm from "@/component/custom/manager/base/register-shop/register-form"

export default function ManagerBaseShopRegister() {
	return (
		<div className="mb-[100px] flex h-fit w-full flex-col">
			<ShopRegisterHeader />
			<ShopRegisterForm />
		</div>
	)
}
