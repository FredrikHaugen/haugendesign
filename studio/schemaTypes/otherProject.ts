import {defineType, defineField} from 'sanity'

export const otherProject = defineType({
  name: 'otherProject',
  title: 'Other project',
  type: 'document',
  description: 'One line in the Other section. Not a work card.',
  fields: [
    defineField({
      name: 'title',
      title: 'Line',
      type: 'string',
      description: 'The whole entry is one line.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'External link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'url'},
  },
})
