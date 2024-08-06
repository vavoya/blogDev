/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
            },
        ],
    },
    experimental: {
        jsconfigPaths: true, // 이 플래그를 추가하여 jsconfig.json/tsconfig.json 경로 별칭을 활성화합니다.
    },
};

export default nextConfig;
