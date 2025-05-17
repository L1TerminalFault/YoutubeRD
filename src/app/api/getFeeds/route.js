import { scraper } from "@/lib/scraper";

export const GET = async () => {
  const url = "https://www.youtube.com/feed/trending";
  // const url = 'https://www.youtube.com/watch?v=YI9vYH80DZo'

  let root
  try {
    root = await scraper(url);
  } catch (error) {
    console.log(error)
  }


  // console.log(root
  //   // .contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
  //   // .richGridRenderer
  //   // .sectionListRenderer
  //   // .contents[0].richSectionRenderer.content.feedNudgeRenderer
  //   // .itemSectionRenderer.contents[0].shelfRenderer
  //   // .content.expandedShelfContentsRenderer.items[0].videoRenderer.thumbnail
  //   // .channelThumbnailSupportedRenderers
  //   // .channelThumbnailWithLinkRenderer
  //   // .thumbnail.thumbnails
  // );

  const listOfVideos =
    root.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
      .sectionListRenderer.contents;

  let response = [];

  listOfVideos.forEach((video, index) => {
    if (!index) return
    // shorts
    if (!video.itemSectionRenderer.contents[0].shelfRenderer) return; // console.log(video.itemSectionRenderer.contents[0].reelShelfRenderer.items)
    const items =
      video.itemSectionRenderer.contents[0].shelfRenderer.content
        .expandedShelfContentsRenderer.items // [0].videoRenderer;

    items.forEach(item => {
      const data = item.videoRenderer
      response.push({
        videoId: data.videoId,
        thumbnail: data.thumbnail.thumbnails[2].url,
        title: data.title.runs[0].text,
        publishedAt: data.publishedTimeText.simpleText,
        channelThumbnail:
          data.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer
            .thumbnail.thumbnails[0].url,
        channelName: data.shortBylineText.runs[0].text,
        viewCount: data.shortViewCountText.simpleText,
      });
    })


    // console.log(response, index);
  });

  // console.log(root.contents.twoColumnBrowseResultsRenderer.tabs);
  // .itemSectionRenderer.contents[0]
  // .shelfRenderer.content.expandedShelfContentsRenderer.items[0]
  // .videoRenderer.channelThumbnailSupportedRenderers)
  return Response.json(response);
};
