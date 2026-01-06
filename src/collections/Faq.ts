import { CollectionConfig } from 'payload'

export const Faq: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', '_status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Pergunta',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Resposta',
    }
  ],
}