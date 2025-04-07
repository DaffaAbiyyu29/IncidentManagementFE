/** @type {import('next').NextConfig} */
import nextTranspileModules from 'next-transpile-modules';

const withTM = nextTranspileModules(['antd', 'rc-picker']);

const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
