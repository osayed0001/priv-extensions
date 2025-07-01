const BASE_URL = "https://manhwa18.org";

export default {
  name: "Manhwa18",
  lang: "en",
  isNsfw: true,
  baseUrl: BASE_URL,

async search(query, page = 1) {
  console.log("Dummy search triggered"); // just in case logs appear
  return [{
    title: "Test Manga",
    url: "https://example.com/test-manga",
    thumbnail: "https://example.com/test-thumbnail.jpg",
    description: "This is a test description."
  }];
}
