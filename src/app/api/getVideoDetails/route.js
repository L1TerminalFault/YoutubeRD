import { scraper } from "@/lib/scraper";

export const GET = async (req) => {
  const query = new URL(req.url).searchParams.get("keyword")
  const nextToken = new URL(req.url).searchParams.get("token")
  const url = `https://www.youtube.com/watch?v=${query}`

  let root
  try {
    root = await scraper(url);
  } catch (error) {
    console.log(error)
  }


  console.log(
    root
      // .contents.twoColumnWatchNextResults
      // .results
      // .results
      
      // .contents
      // [1].videoSecondaryInfoRenderer.owner
      // .videoOwnerRenderer.subscriberCountText.simpleText
      // .itemSectionRenderer
      // .results.contents[0].videoPrimaryInfoRenderer

  )
    // Renderer.primaryContents.sectionListRenderer
    // .contents[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token //get the continuation key here


    const meta = root
      .contents.twoColumnWatchNextResults
      .results.results.contents[1]?.videoSecondaryInfoRenderer.owner.videoOwnerRenderer
    const channel = root
      .contents.twoColumnWatchNextResults
      .results.results.contents[1]?.videoSecondaryInfoRenderer
 const data = root
      .contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer

    const response = {
    title: data.title.runs[0].text,
    publishedAt: data.relativeDateText.simpleText,
    channelThumbnail: meta.thumbnail.thumbnails[2].url,
    channelName: meta.title.runs[0].text,
    subscriberCount: meta ? meta.subscriberCountText.simpleText : '',
    description: channel.attributedDescription.content,
    viewCount: data.viewCount.videoViewCountRenderer.viewCount.simpleText
  }



  // console.log(root.contents.twoColumnBrowseResultsRenderer.tabs);
  // .itemSectionRenderer.contents[0]
  // .shelfRenderer.content.expandedShelfContentsRenderer.items[0]
  // .videoRenderer.channelThumbnailSupportedRenderers)
  return Response.json(response);
};
