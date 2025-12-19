import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'year', 'featured', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // --- ABA 1: CAPA E DADOS GERAIS ---
        {
          label: 'Dados do Projeto',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Título do Projeto',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Subtítulo (Chamada)',
              admin: {
                description: 'Texto maior que aparece no card ou no topo da página interna.',
              }
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                position: 'sidebar',
                description: 'URL amigável (ex: app-financeiro)',
              },
            },
            {
              name: 'featured',
              type: 'select',
              label: 'Destaque na Home?',
              defaultValue: 'false',
              options: [
                { label: 'Sim', value: 'true' },
                { label: 'Não', value: 'false' },
              ],
              admin: {
                position: 'sidebar',
              }
            },
            {
              name: 'client',
              type: 'relationship',
              relationTo: 'clients',
              required: true,
              hasMany: false,
              label: 'Cliente',
              admin: {
                position: 'sidebar',
                description: 'O país será puxado automaticamente deste cliente.',
              }
            },
            {
              name: 'year',
              type: 'text',
              label: 'Ano',
              required: true,
              admin: {
                position: 'sidebar',
                width: '50%',
              }
            },
            {
              name: 'services',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              required: true,
              label: 'Serviços Prestados',
              admin: {
                position: 'sidebar', // Fica organizado na lateral
              },
            },
            {
              name: 'relatedTestimonial',
              type: 'relationship',
              relationTo: 'testimonials', // Nome da coleção de depoimentos
              hasMany: false, // Seleciona apenas 1 depoimento (destaque do case)
              label: 'Depoimento do Projeto',
              admin: {
                position: 'sidebar', // Fica organizado na lateral
                description: 'Se selecionado, aparecerá em destaque na página do projeto.',
              },
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Capa (Thumbnail)',
              admin: {
                position: 'sidebar', // Fica organizado na lateral
                description: 'Selecione a capa do projeto',
              },
            },
          ]
        },

        // --- ABA 2: CONTEÚDO (O CASE STUDY) ---
        {
          label: 'Conteúdo do Case',
          fields: [
            {
              name: 'layout',
              type: 'blocks', // O poder do Payload está aqui!
              minRows: 1,
              blocks: [
                // Bloco 1: Texto Rico
                {
                  slug: 'contentBlock',
                  labels: { singular: 'Texto', plural: 'Textos' },
                  fields: [
                    {
                      name: 'content',
                      type: 'richText',
                      label: 'Conteúdo de Texto',
                    }
                  ]
                },
                // Bloco 2: Imagem Grande (Full Width)
                {
                  slug: 'imageBlock',
                  labels: { singular: 'Mídia Grande', plural: 'Mídias Grandes' },
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'caption',
                      type: 'text',
                      label: 'Legenda (Opcional)',
                    }
                  ]
                },
                // Bloco 3: Galeria (Grid)
                {
                  slug: 'galleryBlock',
                  labels: { singular: 'Galeria', plural: 'Galerias' },
                  fields: [
                    {
                      name: 'images',
                      type: 'upload',
                      relationTo: 'media',
                      hasMany: true, // Permite selecionar várias imagens
                      required: true,
                      label: 'Imagens da Galeria',
                    },
                    {
                      name: 'columns',
                      type: 'select',
                      defaultValue: '2',
                      options: [
                        { label: '2 Colunas', value: '2' },
                        { label: '3 Colunas', value: '3' },
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },

        // --- ABA 3: SEO ---
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
        }
      ]
    }
  ],
}