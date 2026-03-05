// sanity/schemaTypes/post.ts (ou sanity/schemas/post.ts selon ta structure)
import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Article de Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de l\'article',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Lien URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      description: 'Ex: Intelligence Artificielle, UI/UX Design...',
    }),
    defineField({
      name: 'date',
      title: 'Date de publication',
      type: 'string',
      description: 'Ex: 05 Mars 2026',
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'string',
      description: 'Ex: 5 min',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true, // Permet de recadrer l'image depuis le CMS !
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait (Résumé court)',
      type: 'text',
      rows: 3,
      description: 'Apparaît sur la carte de la page principale du blog.',
    }),
    defineField({
      name: 'content',
      title: 'Contenu de l\'article',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }], // Permet d'écrire du texte riche et d'insérer des images
    }),
  ],
})