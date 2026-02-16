import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/NOME_DO_REPOSITORIO',
  assetPrefix: '/NOME_DO_REPOSITORIO/',
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
