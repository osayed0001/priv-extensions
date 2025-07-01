const BASE_URL = "https://manhwa18.org";

export default {
  name: "Manhwa18",
  lang: "en",
  isNsfw: true,
  baseUrl: BASE_URL,

async search(query, page = 1) {
  const url = `${BASE_URL}/?s=${encodeURIComponent(query)}&post_type=wp-manga`;
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  const items = [...doc.querySelectorAll(".page-item-detail.manga")];
  return items.map(item => {
    const a = item.querySelector(".post-title h3 a");
    const img = item.querySelector(".item-thumb img");
    return {
      title: a?.textContent.trim() || "No Title",
      url: a?.href || "",
      thumbnail: img?.src || "",
      description: ""
    };
  });
}

