import { CollectionConfig } from 'payload'

export const Faq: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
  },
  access: {
    read: () => true,
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