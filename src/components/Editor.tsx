import NestedChecklist from '@calumk/editorjs-nested-checklist'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'
import Paragraph from '@editorjs/paragraph'
import Table from '@editorjs/table'
import {
  Button,
  Paper,
  Toolbar
} from '@mui/material'
import { grey } from '@mui/material/colors'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'
import {
  MutableRefObject,
  useCallback,
  useRef
} from 'react'
import { createReactEditorJS } from 'react-editor-js'
import Image from './editor/Image'

export default function Editor(): JSX.Element {
  const ReactEditorJS = createReactEditorJS()

  const editorJS: MutableRefObject<null> = useRef(null)

  const handleInitialize = useCallback((instance) => {
    editorJS.current = instance
  }, [])

  // const [previewMode, setPreviewMode] = useState<boolean>(false)
  // const togglePreview = useCallback(() => {
  //   if (editorJS.current) {
  //     editorJS.current.readOnly = previewMode
  //   }
    
  //   setPreviewMode(!previewMode)
  // }, [previewMode])

  const handleSave = useCallback(async () => {
    if (!editorJS.current) return
    
    const savedData = await editorJS.current.save()
    
    console.log(savedData)
  }, [])

  return <>
    <Paper
      elevation={4}
      sx={{
        bgcolor:        grey[300],
        borderRadius:   0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'stretch',
        position:       'fixed',
        top:            0,
        left:           0,
        right:          0,
        zIndex:         5,
      }}
    >
      {/* <Button
        color="info"
        onClick={togglePreview}
        variant="contained"
        sx={{
          borderRadius: 0,
          borderColor:  grey[300],
          borderRight:  '1px solid',
          ml:           'auto',
        }}
      >
        {previewMode ? 'Exit Preview' : 'Preview'}
      </Button> */}
      <Button
        color="primary"
        // disabled={previewMode}
        onClick={handleSave}
        variant="contained"
        sx={{
          borderRadius: 0,
        }}
      >
        Save
      </Button>
    </Paper>
    <Toolbar />
    <ReactEditorJS
      aotofocus={false}
      defaultValue={{
        'time':   1651285912478,
        'blocks': [
          {
            'id':   'sheNwCUP5A',
            'type': 'header',
            'data': {
              'text':  'Next-UI-Builder by Rethunk.Tech, LLC.',
              'level': 1
            },
            'tunes': {
              'alignmentTune': {
                'alignment': 'center'
              }
            }
          },
          {
            'id':   'OKDlLjtfvU',
            'type': 'header',
            'data': {
              'text':  'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
              'level': 5
            },
            'tunes': {
              'alignmentTune': {
                'alignment': 'center'
              }
            }
          },
          {
            'id':   'K1tu4MllLn',
            'type': 'image',
            'data': {
              'caption': '',
              'mode':    1,
              'url':     'https://www.oberlo.com/media/1603898633-what-is-user-interface.png?fit=max&amp;fm=jpg&amp;w=1800'
            },
            'tunes': {
              'alignmentTune': {
                'alignment': 'center'
              }
            }
          },
          {
            'id':   'vlCVAWjE9Y',
            'type': 'paragraph',
            'data': {
              'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sodales sit amet quam id euismod. Praesent vitae tortor eros. Phasellus fermentum pharetra nulla, id ultricies diam suscipit et. Phasellus at feugiat nibh. Vivamus fringilla justo ac mauris convallis, quis suscipit turpis lacinia. Nullam sollicitudin fringilla malesuada. Mauris non orci lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis scelerisque mattis tellus sed condimentum. Quisque aliquet nisl leo, quis porta turpis euismod ac. Aliquam turpis nisl, ultrices ac elementum ut, elementum sed nibh. Cras porta scelerisque ultricies. Sed eget imperdiet nisl. Fusce id porta dolor, non rutrum mauris. Proin vitae neque ultrices libero fermentum elementum. Vestibulum sagittis nisl eu elit venenatis tristique.'
            },
            'tunes': {
              'alignmentTune': {
                'alignment': 'justify'
              }
            }
          },
          {
            'id':   'xeIfidaxKU',
            'type': 'header',
            'data': {
              'text':  'Where does Lorem Ipsum come from?',
              'level': 2
            },
            'tunes': {
              'alignmentTune': {
                'alignment': 'left'
              }
            }
          },
          {
            'id':   'QnjWdeWcAq',
            'type': 'paragraph',
            'data': {
              'text': 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
            },
            'tunes': {
              'alignmentTune': {
                'alignment': 'justify'
              }
            }
          },
          {
            'id':   'rq6KNacJKu',
            'type': 'paragraph',
            'data': {
              'text': 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
            },
            'tunes': {
              'alignmentTune': {
                'alignment': 'justify'
              }
            }
          },
          {
            'id':   'FrJ_PxLP0r',
            'type': 'header',
            'data': {
              'text':  'Why do we use it?',
              'level': 3
            },
            'tunes': {
              'alignmentTune': {
                'alignment': 'left'
              }
            }
          },
          {
            'id':   'RmvmktOJ0f',
            'type': 'paragraph',
            'data': {
              'text': 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
            },
            'tunes': {
              'alignmentTune': {
                'alignment': 'justify'
              }
            }
          },
          {
            'id':   'NzpfA2wFzt',
            'type': 'paragraph',
            'data': {
              'text': 'This application\'s&nbsp;<a href="https://github.com/Rethunk-Tech/next-ui-builder"><b>source is available&nbsp;on GitHub</b>.</a>'
            },
          }
        ],
        'version': '2.24.1'
      }}
      holder='ssrHolder'
      inlineToolbar={['bold', 'italic', 'link']}
      onInitialize={handleInitialize}
      // readOnly={previewMode}
      tools={{
        embed: {
          class:         Embed,
          inlineToolbar: true
        },
        header: {
          class:         Header,
          inlineToolbar: ['link'],
          tunes:         ['alignmentTune']
        },
        image: {
          class:         Image,
          inlineToolbar: ['link'],
          tunes:         ['alignmentTune']
        },
        link: {
          class:  LinkTool,
          tunes:  ['alignmentTune'],
          config: {
            endpoint: '/api/fetchUrl',
          }
        },
        list: {
          class:         NestedChecklist,
          inlineToolbar: true,
          tunes:         ['alignmentTune']
        },
        paragraph: {
          class:         Paragraph,
          inlineToolbar: true,
          tunes:         ['alignmentTune']
        },
        table: {
          class:  Table,
          config: {
            rows: 2,
            cols: 3,
          },
          inlineToolbar: true
        },
        alignmentTune: {
          class:  AlignmentTuneTool,
          config: {
            blocks: {
              header: 'center',
              image:  'center',
            }
          },
        }
      }}
    />
  </>
}
