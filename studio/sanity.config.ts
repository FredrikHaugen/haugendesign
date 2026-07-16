import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Haugendesign',

  projectId: '73tyvgdh',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('otherProject').title('Other projects'),
            S.listItem()
              .title('About')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
