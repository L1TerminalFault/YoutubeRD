export const scraper = async (url) => {

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "X-Goog-PageId": "FEwhatYouMightLike",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      "Connection": "keep-alive",
      "Referer": "https://www.youtube.com/",
      "Origin": "https://www.youtube.com"
    },
  });

  const html = await res.text();

  const match = html.match(/var ytInitialData = ({.*?});<\/script>/s);

  if (match) {
    try {
      const jsonData = match[1].trim();

      const cleanedJsonData = jsonData
        .replace(/\\u003C/g, "<")
        .replace(/\\u003E/g, ">");

      // feedData is the root object
      const feedData = JSON.parse(cleanedJsonData);

      // console.log("Extracted Feed Data:", JSON.stringify(feedData, null, 2));
      return feedData;

      const feedContents = feedData.contents || {};
      console.log("Feed Contents:", JSON.stringify(feedContents, null, 2));
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    console.log("No feed data found.");
  }
}
