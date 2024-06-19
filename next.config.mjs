/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "loremflickr.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/:path*",
				destination: `${process.env.NEXT_PUBLIC_BACKEND_APP}/:path*`,
			},
		]
	},
}

export default nextConfig
