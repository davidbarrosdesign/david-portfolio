import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      unique: true, // Opcional: Impede que você coloque dois itens com o número "1"
      label: 'Ordem de Exibição',
      defaultValue: 10,
      admin: {
        position: 'sidebar', // Coloca na barra lateral para não ocupar espaço
        description: '1 aparece primeiro, 2 em segundo, etc.',
      },
    },
    {
      name: 'title', // Ex: Produtos Digitais
      type: 'text',
      required: true,
      label: 'Nome do Serviço',
    },
    {
      name: 'description', // O texto introdutório
      type: 'textarea',
      required: true,
    },
    // --- AQUI ESTÃO OS ENTREGÁVEIS (Array) ---
    {
      name: 'deliverables',
      type: 'array',
      label: 'Lista de Entregáveis',
      minRows: 1,
      fields: [
        {
          name: 'title', // Ex: SaaS & Plataformas
          type: 'text',
          required: true,
        },
        {
          name: 'description', // A explicação detalhada
          type: 'textarea',
          required: true,
        },
      ],
    },
    // --- JÁ VAMOS PREPARAR OS PROCESSOS TAMBÉM ---
    {
      name: 'process',
      type: 'array',
      label: 'Etapas do Processo',
      fields: [
        {
          name: 'order', // Ex: "1", "2"...
          type: 'text',
          admin: { width: '20%' }
        },
        {
          name: 'title', // Ex: Imersão
          type: 'text',
          admin: { width: '40%' }
        },
        {
          name: 'description',
          type: 'textarea',
          admin: { width: '40%' }
        },
      ]
    },
    // --- DESTAQUE DE PROJETO ---
    {
      name: 'relatedProject',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: false, // Apenas 1 destaque por serviço
      label: 'Case em Destaque',
      admin: {
        position: 'sidebar',
      }
    },
  ],
}