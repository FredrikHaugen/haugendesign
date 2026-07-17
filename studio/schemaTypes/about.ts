import {defineType, defineField, defineArrayMember} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  description: 'Singleton. Source copy lives in .claude/rules/ABOUT.md and is entered verbatim.',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status line',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'oneLiner',
      title: 'One-liner',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'shortBio',
      title: 'Short bio',
      type: 'text',
      rows: 4,
      description: 'Hero intro. The first sentence is also the meta description.',
    }),
    defineField({
      name: 'longBio',
      title: 'Long bio',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'work',
      title: 'Work history',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'workEntry',
          fields: [
            defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'org', title: 'Organization', type: 'string'}),
            defineField({name: 'location', type: 'string'}),
            defineField({name: 'dates', type: 'string'}),
            defineField({name: 'description', type: 'text', rows: 4}),
            defineField({
              name: 'slug',
              type: 'slug',
              options: {source: 'org'},
              description: 'Only needed when the entry has a detail body. Gives it /experience/<slug>.',
            }),
            defineField({
              name: 'url',
              title: 'Organization URL',
              type: 'url',
              description: 'Shown on the detail page as an external link.',
            }),
            defineField({
              name: 'detail',
              title: 'Detail body',
              type: 'array',
              of: [defineArrayMember({type: 'block'})],
              description:
                'About the organization. Entries with a body get a detail page; the rest render as plain rows.',
            }),
          ],
          preview: {select: {title: 'role', subtitle: 'org'}},
        }),
      ],
    }),
    defineField({
      name: 'education',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'educationEntry',
          fields: [
            defineField({name: 'degree', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'institution', type: 'string'}),
            defineField({name: 'years', type: 'string'}),
            defineField({
              name: 'slug',
              type: 'slug',
              options: {source: 'degree'},
              description: 'Only needed when the entry has a detail body. Gives it /education/<slug>.',
            }),
            defineField({
              name: 'url',
              title: 'Institution URL',
              type: 'url',
              description: 'Shown on the detail page as an external link.',
            }),
            defineField({
              name: 'detail',
              title: 'Detail body',
              type: 'array',
              of: [defineArrayMember({type: 'block'})],
              description:
                'About the institution. Entries with a body get a detail page; the rest render as plain rows.',
            }),
          ],
          preview: {select: {title: 'degree', subtitle: 'institution'}},
        }),
      ],
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'skillGroup',
          fields: [
            defineField({name: 'category', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'items',
              type: 'string',
              description: 'One comma-separated line, verbatim.',
            }),
          ],
          preview: {select: {title: 'category', subtitle: 'items'}},
        }),
      ],
    }),
    defineField({
      name: 'email',
      type: 'string',
      description: 'Leave empty until the address is confirmed. The mail link renders only when set.',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'threads',
      title: 'Threads URL',
      type: 'url',
    }),
    defineField({
      name: 'x',
      title: 'X URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {title: 'name'},
  },
})
