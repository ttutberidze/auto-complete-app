const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export const filter = (text) => {
  return fetch(`${baseUrl}?part=snippet&q=${text}&key=${apiKey}`)
    .then(res => res.json())
    .then(res => res.items.map(video => ({value: video.id.videoId, label: video.snippet.title})))
}
