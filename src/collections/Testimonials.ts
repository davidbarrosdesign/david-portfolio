import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'authorRole', 'client', '_status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return false
      
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'authorRole',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: false,
      required: true,
      label: 'Empresa',
    },
  ],
}