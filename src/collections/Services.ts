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
      type: 'tabs',
      tabs: [
        {
          label: 'Dados do Serviço',
          fields: [
            {
              name: 'title', // Ex: Produtos Digitais
              type: 'text',
              required: true,
              label: 'Nome do Serviço',
            },
            {
              name: 'slug', // Ex: Produtos Digitais
              type: 'text',
              required: true,
              unique: true,
              label: 'URL amigável',
            },
            {
              name: 'description', // O texto introdutório
              type: 'textarea',
              required: true,
            },
            {
              name: 'order',
              type: 'number',
              required: true,
              unique: true, // Opcional: Impede que você coloque dois itens com o número "1"
              label: 'Ordem de Exibição',
              defaultValue: 10,
              admin: {
                position: 'sidebar',
                description: '1 aparece primeiro, 2 em segundo, etc.',
              },
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'Ícone',
              admin: {
                position: 'sidebar',
                description: 'Ícone do serviço',
              },
            },
            {
              name: 'iconCode',
              type: 'code',
              required: false,
              label: 'Código SVG do Ícone (Otimizado)',
              admin: {
                position: 'sidebar',
                language: 'html',
                description: 'Cole o código <svg>...</svg> aqui. Isso substitui a imagem de upload e permite animações.',
              },
            },
            {
              name: 'relatedProject',
              type: 'relationship',
              relationTo: 'projects',
              hasMany: false, // Apenas 1 destaque por serviço
              label: 'Case em Destaque',
              admin: {
                position: 'sidebar',
                description: 'Se selecionado, aparecerá em destaque na página do serviço.',
              }
            },
          ]
        },
        {
          label: 'Lista de Entregáveis',
          fields: [
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
          ]
        },
        {
          label: 'Metodologia',
          fields: [
            {
              name: 'process',
              type: 'array',
              label: 'Etapas do Processo',
              minRows: 1,
              fields: [
                {
                  name: 'order',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                  label: 'Ícone'
                },
                {
                  name: 'iconCode',
                  type: 'code',
                  required: false,
                  label: 'Código SVG do Ícone (Otimizado)',
                  admin: {
                    position: 'sidebar',
                    language: 'html',
                    description: 'Cole o código <svg>...</svg> aqui. Isso substitui a imagem de upload e permite animações.',
                  },
                },
              ]
            },
          ]
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Título SEO',
              admin: {
                description: 'Se vazio, usa o título do projeto.',
              }
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Descrição SEO',
              maxLength: 160,
            },
            {
              name: 'metaImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagem de Compartilhamento (OG Image)',
            }
          ]
        },
      ],
    }
  ],
}