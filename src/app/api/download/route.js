import ytdl from '@distube/ytdl-core'
import {createWriteStream} from 'fs'
import { join } from 'path';
import { NextResponse } from 'next/server';

export const GET = (req) => {
  const videoId = new URL(req.url).searchParams.get('videoId')
  const stream = ytdl(`http://www.youtube.com/watch?v=${videoId}`)

  
// console.log(stream)
// stream.pipe(createWriteStream(join(process.cwd(), 'video.mp4')))
// return Response.json(stream)
  return new NextResponse(stream, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg', // Adjust content type as needed
      'Content-Disposition': `attachment; filename="video.mp4"`,
    },
  });

}
