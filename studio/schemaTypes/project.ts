import {defineType, defineField, defineArrayMember} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'card',
      title: 'Card text',
      type: 'text',
      rows: 3,
      description: 'Verbatim from the project file in .claude/rules. Never regenerated to fit.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Stack tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'url',
      title: 'Live URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      description: 'From the rules file. Leave empty while it is an unresolved CONFIRM.',
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Sort order on the front page. Lower comes first.',
    }),
    defineField({
      name: 'screenshot',
      type: 'image',
      description: 'Optional card image.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describes. Does not sell.',
        }),
      ],
    }),
    defineField({
      name: 'detail',
      title: 'Detail page body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      description:
        'Verbatim from the project file. Leave empty to show the card without a detail page.',
    }),
    defineField({
      name: 'stack',
      title: 'Stack paragraph',
      type: 'text',
      rows: 5,
      description: 'Rendered under a "Stack" heading on the detail page.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'card'},
  },
})
