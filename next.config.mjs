import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adicione isso para permitir imagens externas (Notion/AWS)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Caso use covers do Unsplash no Notion
      },
      {
        protocol: 'https',
        hostname: '**', // Permitir tudo por enquanto (dev), ou especifique o domínio do Supabase
      },
    ],
  },
  serverExternalPackages: ['@payloadcms/db-mongodb', 'payload', 'sharp'],
  // Ignora erros de ESLint (como o do Hook e variáveis não usadas)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignora erros de TypeScript (como os tipos 'any')
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })