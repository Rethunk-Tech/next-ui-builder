import type {
  BlockTool,
  BlockToolConstructable,
  BlockToolConstructorOptions,
  // FilePasteEvent,
  // HTMLPasteEvent,
  // PasteConfig,
  // PasteEvent,
  // PatternPasteEvent,
  SanitizerConfig
} from '@editorjs/editorjs'
import BorderAllIcon from '@mui/icons-material/BorderAll'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import WallpaperIcon from '@mui/icons-material/Wallpaper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { ClipboardEvent } from 'react'
import { render } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'

type Data = {
  caption?: string
  mode?: number
  url?: string

  // tune settings
  fullWidth?: boolean
  withBorder?: boolean
}

type SettingNames = 'fullWidth' | 'withBorder'
type Setting = { name: SettingNames, icon: string }

export default class Image implements BlockTool {
  static get isReadOnlySupported(): boolean {
    return true
  }

  // static get pasteConfig(): PasteConfig {
  //   return {
  //     tags:  ['IMG'],
  //     files: {
  //       mimeTypes:  ['image/*'],
  //       extensions: ['gif', 'jpg', 'jpeg', 'tiff', 'png', 'svg']
  //     },
  //     patterns: {
  //       image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|svg)$/i
  //     }
  //   }
  // }

  static get sanitize(): SanitizerConfig {
    return {
      url:     false, // disallow HTML
      caption: {} // only tags from Inline Toolbar 
    }
  }

  static get toolbox(): BlockToolConstructable['toolbox'] {
    return {
      title: 'Image',
      icon:  renderToStaticMarkup(<WallpaperIcon />)
    }
  }

  api: BlockToolConstructorOptions['api']
  data: Data
  readOnly: BlockToolConstructorOptions['readOnly']
  settings: Setting[]
  wrapper?: HTMLElement

  constructor({ api, data, readOnly }: BlockToolConstructorOptions<Data>) {
    this.api = api
    this.data = {
      caption:    data?.caption || '',
      mode:       data?.mode || data?.url ? 1 : 0,
      url:        data?.url || '',
      fullWidth:  data?.fullWidth || false,
      withBorder: data?.fullWidth || false,
    }
    this.readOnly = readOnly
    this.settings = [
      {
        name: 'fullWidth',
        icon: renderToStaticMarkup(<FullscreenIcon />)
      },
      {
        name: 'withBorder',
        icon: renderToStaticMarkup(<BorderAllIcon />)
      }
    ]
    this.wrapper = undefined
  }
  
  // onPaste(event: PasteEvent): void {
  //   switch (event.type) {
  //   // when pasting HTML
  //   case 'tag':
  //     {
  //       const e: HTMLPasteEvent = event as HTMLPasteEvent
  //       const ele: HTMLImageElement = e.detail.data as HTMLImageElement
  //       this._createImage(ele.src)
  //     }
      
  //     break
    
  //   // when pasting files
  //   case 'file':
  //     {
  //       const e: FilePasteEvent = event as FilePasteEvent
  //       const reader: FileReader = new FileReader()

  //       reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
  //         if (loadEvent.target?.result) this._createImage(loadEvent.target.result)
  //       }

  //       // read file as base64 string
  //       reader.readAsDataURL(e.detail.file)
  //     }
      
  //     break
      
  //     // when pasting URLs
  //   case 'pattern':
  //     {
  //       const e: PatternPasteEvent = event as PatternPasteEvent
  //       this._createImage(e.detail.data)
  //     }
        
  //     break
  //   }
  // }

  render(): HTMLElement {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('simple-image')

    if (this.data.mode === 1 && this.data.url) {
      this._createImage(this.data.url)

      return this.wrapper
    }

    const urlEntry: HTMLDivElement = document.createElement('div')
    render(<TextField
      defaultValue={this.data?.url || ''}
      fullWidth
      onPaste={(event: ClipboardEvent) => {
        this._createImage(event.clipboardData?.getData('text') || '')
      }}
      placeholder="Paste an image URL..."
      size="small"
    />, urlEntry)

    this.wrapper.innerHTML = ''
    this.wrapper.appendChild(urlEntry)

    return this.wrapper
  }
  
  renderSettings(): HTMLElement {
    const settingsWrapper: HTMLDivElement = document.createElement('div')

    this.settings.forEach((tune: Setting) => {
      const button: HTMLDivElement = document.createElement('div')

      button.classList.add(this.api.styles.settingsButton)
      button.classList.toggle(this.api.styles.settingsButtonActive, this.data[tune.name])
      button.innerHTML = tune.icon
      
      button.addEventListener('click', () => {
        button.classList.toggle(this.api.styles.settingsButtonActive)
        this._toggleTune(tune.name)
      })
      
      settingsWrapper.appendChild(button)
    })

    return settingsWrapper
  }

  save(blockContent: HTMLElement): Data {
    const image: HTMLImageElement | null = blockContent.querySelector('img')
    const caption: HTMLElement | null = blockContent.querySelector('[contenteditable]')

    return Object.assign(this.data, {
      caption: caption?.innerHTML || '',
      mode:    image?.src ? 1 : 0,
      url:     image?.src,
    })
  }

  /**
   * @private
   * Render Image (with caption entry if not readOnly)
   * @param {string} url — data-URI or URL of image
   */
  _createImage(url: string): void {
    if (this.wrapper === undefined) return

    const image: HTMLImageElement = document.createElement('img')
    image.src = url
    
    this.wrapper.innerHTML = ''
    this.wrapper.appendChild(image)

    // if readOnly and caption unset, hide caption line entirely
    if (!(this.readOnly && !this.data.caption)) {
      const captionEntry: HTMLDivElement = document.createElement('div')
      render(<Typography variant="caption">
        <span contentEditable={!this.readOnly}>
          {this.data.caption || 'Caption...'}
        </span>
      </Typography>, captionEntry)
      this.wrapper.appendChild(captionEntry)
    }

    this._applyTunes()
  }

  /**
   * @private
   * Enables or disables tunes based on this.data[tune]
   */
  _applyTunes(): void {
    this.settings.forEach((tune: Setting) => {
      this.wrapper?.classList.toggle(tune.name, !!this.data[tune.name])

      if (tune.name === 'fullWidth') {
        this.api.blocks.stretchBlock(this.api.blocks.getCurrentBlockIndex(), !!this.data.fullWidth)
      }
    })
  }
  
  /**
   * @private
   * Click on the Settings Button
   * @param {string} tune — tune name from this.settings
   */
  _toggleTune(tune: SettingNames): void {
    this.data[tune] = !this.data[tune]
    this._applyTunes()
  }
}
