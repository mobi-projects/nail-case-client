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
			{
				protocol: "http",
				hostname: "**.kakaocdn.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "newtips-bucket-azxwettoqoqaaz.s3.amazonaws.com",
				port: "",
				pathname: "/**",
			},
		],
	},
}

export default nextConfig
