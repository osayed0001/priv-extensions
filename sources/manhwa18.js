const BASE_URL = "https://manhwa18.org";
export default {
  name: "Manhwa18",
  lang: "en",
  isNsfw: false,
  baseUrl: BASE_URL,

  async search(query, page = 1) {
    const url = `${BASE_URL}/?s=${encodeURIComponent(query)}&post_type=wp-manga`;
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const items = [...doc.querySelectorAll(".c-tabs-item__content")];
    return items.map(item => {
      const a = item.querySelector("h3 a");
      return {
        title: a?.textContent.trim(),
        url: a?.getAttribute("href"),
        thumbnail: item.querySelector("img")?.getAttribute("src") || "",
        description: item.querySelector(".summary-content")?.textContent.trim() || ""
      };
    });
  },

  async chapters(mangaUrl) {
    const res = await fetch(mangaUrl);
    const doc = new DOMParser().parseFromString(await res.text(), "text/html");
    const items = [...doc.querySelectorAll(".listing-chapters_wrap .wp-manga-chapter a")];
    return items.map(a => ({
      name: a.textContent.trim(),
      url: a.getAttribute("href")
    }));
  },

  async pages(chapterUrl) {
    const res = await fetch(chapterUrl);
    const doc = new DOMParser().parseFromString(await res.text(), "text/html");
    const images = [...doc.querySelectorAll(".page-break img")];
    return images.map(img => img.getAttribute("data-src") || img.getAttribute("src"));
  }
};
