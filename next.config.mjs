/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['lucide-react'],
	experimental: {
		forceSwcTransforms: true,
	},
};

export default nextConfig;
