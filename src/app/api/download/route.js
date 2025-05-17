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


  import { NextResponse } from 'next/server';
  import { exec } from 'child_process';
  import { tmpdir } from 'os';
  import { join } from 'path';
  import { createWriteStream } from 'fs';

  export const runtime = 'nodejs';

  export async function GET(req) {
    const url = new URL(req.url);
    const videoId = url.searchParams.get('videoId');

    if (!videoId) {
      return new Response('Missing videoId', { status: 400 });
    }

    const outputPath = join(tmpdir(), `${videoId}.mp4`);
    const command = `yt-dlp -f bestvideo+bestaudio --merge-output-format mp4 -o "${outputPath}" https://www.youtube.com/watch?v=${videoId}`;

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(new Response(`Error: ${stderr || error.message}`, { status: 500 }));
        } else {
          const stream = createReadStream(outputPath);
          resolve(
            new Response(stream, {
              status: 200,
              headers: {
                'Content-Type': 'video/mp4',
                'Content-Disposition': `attachment; filename="${videoId}.mp4"`,
              },
            })
          );
        }
      });
    });
  }
