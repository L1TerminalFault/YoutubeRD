import { scraper } from "@/lib/scraper";

export const GET = async (req) => {
  const query = new URL(req.url).searchParams.get("keyword")
  const nextToken = new URL(req.url).searchParams.get("token")
  const url = nextToken ? `https://www.youtube.com/results?search_query=${query}&continuation=${nextToken}` : `https://www.youtube.com/results?search_query=${query}`;
  // const url = 'https://www.youtube.com/watch?v=YI9vYH80DZo'

  let root
  try {
    root = await scraper(url);
  } catch (error) {
    console.log(error)
  }


  console.log('the next token is ' , nextToken
    // root
    // .contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer
    // .contents[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token //get the continuation key here


    
    //.tabs[0].tabRenderer.content
    // .richGridRenderer
    // .sectionListRenderer
    // .contents[0].richSectionRenderer.content.feedNudgeRenderer
    // .itemSectionRenderer.contents   //.videoRenderer.thumbnail
    // .content.expandedShelfContentsRenderer.items[0].videoRenderer.thumbnail
    // .channelThumbnailSupportedRenderers
    // .channelThumbnailWithLinkRenderer
    // .thumbnail.thumbnails
  );

  const continuationToken = root
    .contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer
    .contents[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token

  const listOfVideos =
    root.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer
    .contents[0].itemSectionRenderer.contents

  let response = [];

  listOfVideos.forEach((video, index) => {
    if (!video.videoRenderer) return
    // shorts
    // if (!video.itemSectionRenderer.contents[0].shelfRenderer) return; // console.log(video.itemSectionRenderer.contents[0].reelShelfRenderer.items)
    // const items =
    //   video.itemSectionRenderer.contents[0].shelfRenderer.content
    //     .expandedShelfContentsRenderer.items // [0].videoRenderer;

    // items.forEach(item => {
      const data = video.videoRenderer
      response.push({
        videoId: data.videoId,
        thumbnail: data.thumbnail.thumbnails[2] ? data.thumbnail.thumbnails[2].url : data.thumbnail.thumbnails[1] ? data.thumbnail.thumbnails[1].url : data.thumbnail.thumbnails[0].url,
        title: data.title.runs[0].text,
        publishedAt: data?.publishedTimeText.simpleText ? data?.publishedTimeText.simpleText : '',
        channelThumbnail:
          data.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer
            .thumbnail.thumbnails[0].url,
        channelName: data.shortBylineText.runs[0].text,
        viewCount: data.shortViewCountText.simpleText,
        
      });
    // })
    // console.log(data.thumbnail.thumbnails[1] ? 'exist' : data.thumbnail.thumbnails)


    // console.log(response, index);
  });
  console.log(nextToken ? response : "no token found")

  // console.log(root.contents.twoColumnBrowseResultsRenderer.tabs);
  // .itemSectionRenderer.contents[0]
  // .shelfRenderer.content.expandedShelfContentsRenderer.items[0]
  // .videoRenderer.channelThumbnailSupportedRenderers)
  return Response.json({ videos: response, continuationToken, query });
};
