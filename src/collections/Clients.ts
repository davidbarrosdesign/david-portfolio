import { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name', // O nome do cliente vai aparecer na listagem
    defaultColumns: ['name', 'country', 'featured', '_status', 'updatedAt'],
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome da Empresa',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      label: 'País de Origem',
      admin: {
        placeholder: 'Ex: Brasil, EUA, Espanha...',
      }
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logotipo',
    },
    // Opcional: Website do cliente
    {
      name: 'website',
      type: 'text',
      label: 'Site Oficial (Opcional)',
    },
    {
      name: 'featured',
      type: 'select',
      label: 'Destaque',
      defaultValue: 'false',
      options: [
        { label: 'Sim', value: 'true' },
        { label: 'Não', value: 'false' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Se marcado, o cliente será exibido na página inicial',
      }
    }
  ],
}