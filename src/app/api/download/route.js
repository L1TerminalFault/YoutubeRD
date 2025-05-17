// export const runtime = 'nodejs'

// import ytdl from '@distube/ytdl-core'
// import {createWriteStream} from 'fs'
// import { join } from 'path';
// import { NextResponse } from 'next/server';



// export const GET = (req) => {
//   const videoId = new URL(req.url).searchParams.get('videoId')
//   const stream = ytdl(`http://www.youtube.com/watch?v=${videoId}`, {
//     filter: 'videoandaudio',
//     quality: 'highest'
//   })

  
// // console.log(stream)
// // stream.pipe(createWriteStream(join(process.cwd(), 'video.mp4')))
// // return Response.json(stream)
//   return new Response(stream, {
//     status: 200,
//     headers: {
//       'Content-Type': 'video/mp4', // Adjust content type as needed
//       'Content-Disposition': `attachment; filename="video"`,
//     },
//   });

// }


// app/api/get-download-url/route.js
export const runtime = 'nodejs';

import ytdl from '@distube/ytdl-core';

export async function GET(req) {
  const videoId = new URL(req.url).searchParams.get('videoId');
  if (!videoId) return new Response('Missing videoId', { status: 400 });

  try {
    const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

    return Response.json({ url: format.url }); // direct YouTube URL
  } catch (e) {
    return new Response('Error getting video', { status: 500 });
  }
}
