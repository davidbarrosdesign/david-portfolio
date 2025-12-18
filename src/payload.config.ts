import { buildConfig } from 'payload'
import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Clients } from './collections/Clients'
import { Services } from './collections/Services'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Clients, Services],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true, // Não salva no disco do Next.js (economiza espaço)
          
          // Função mágica para gerar a URL pública do Supabase
          generateFileURL: ({ filename }) => {
            const endpoint = process.env.S3_ENDPOINT || '';
            const publicEndpoint = endpoint.replace('/s3', '/object/public');
            
            return `${publicEndpoint}/${process.env.S3_BUCKET}/${filename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION as string,
        endpoint: process.env.S3_ENDPOINT as string,
        forcePathStyle: true,
      },
    }),
  ],
});