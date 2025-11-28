import type { CollectionConfig } from 'payload'

export const Trabalhos: CollectionConfig = {
  slug: 'trabalhos',
  admin: {
    useAsTitle: 'título',
  },
  fields: [
    {
      name: 'título',
      type: 'text',
      required: true,
    },
    {
        name: 'slug',
        type: 'text',
        required: true,
        admin: {
            position: 'sidebar',
        }
    }
  ],
}
