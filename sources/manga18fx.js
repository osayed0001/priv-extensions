// Manga18FX scraper for AnymeX/Mangayomi
// Based on the selectors you provided

const BASE_URL = "https://manga18fx.com";

export default {
  name: "Manga18FX",
  lang: "en",
  isNsfw: true,
  baseUrl: BASE_URL,

  // Fetch latest manga list page
  async latestUpdates(page = 1) {
    const url = `${BASE_URL}/latest?page=${page}`;
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const items = [...doc.querySelectorAll(".page-item-detail")];
    return items.map(item => {
      const titleEl = item.querySelector(".page-item-detail-content h3 a");
      return {
        title: titleEl?.textContent.trim() || "No title",
        url: titleEl?.getAttribute("href") || "",
        thumbnail: item.querySelector("img")?.getAttribute("src") || "",
        description: item.querySelector(".page-item-detail-content .description")?.textContent.trim() || ""
      };
    });
  },

  // Fetch chapters for a manga URL
  async chapters(mangaUrl) {
    const url = BASE_URL + mangaUrl;
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const chapterEls = [...doc.querySelectorAll(".chapter-list li a")];
    return chapterEls.map(ch => ({
      name: ch.textContent.trim(),
      url: ch.getAttribute("href")
    }));
  },

  // Fetch pages (images) for a chapter URL
  async pages(chapterUrl) {
    const url = BASE_URL + chapterUrl;
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const pageImgs = [...doc.querySelectorAll(".reading-content img")];
    return pageImgs.map(img => img.getAttribute("src"));
  }
};
