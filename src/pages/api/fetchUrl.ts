import type { NextApiRequest, NextApiResponse } from 'next'
import og, { Data, ImageVideoMetadata } from 'open-graph'

type Meta = {
  title: string | string[],
  description?: string | string[],
  image?: string | string[] | ImageVideoMetadata
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    success: number,
    meta: Meta
  }>
): void {
  const { method, url } = req

  if (method?.toLowerCase() !== 'get' || !url) {
    res.end()
    return
  }

  const link: string = decodeURIComponent(
    url.split('?url=')[1]
  )

  og(link, (err: Error | null, meta: Data | undefined) => {
    if (meta) {
      res.status(200).json({
        success: 1,
        meta:    meta,
      })
      return
    }
    
    res.end(JSON.stringify ({
      success: 0,
      meta:    {}
    }))
    
    console.log(err)
  })  
}
