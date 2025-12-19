import { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name', // O nome do cliente vai aparecer na listagem
  },
  access: {
    read: () => true, // Público pode ler (necessário para exibir no site)
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