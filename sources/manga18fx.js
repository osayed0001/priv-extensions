const BASE_URL = "https://manga18fx.com";

export default {
  name: "Manga18FX",
  lang: "en",
  isNsfw: true,
  baseUrl: BASE_URL,

  // Latest manga — for Browse tab (optional if broken)
  async latestUpdates(page = 1) {
    const url = `${BASE_URL}/latest?page=${page}`;
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const items = [...doc.querySelectorAll(".page-item-detail")];
    return items.map(item => {
      const a = item.querySelector(".page-item-detail-content h3 a");
      return {
        title: a?.textContent.trim() || "No title",
        url: a?.getAttribute("href"),
        thumbnail: item.querySelector("img")?.getAttribute("src") || "",
        description: item.querySelector(".description")?.textContent.trim() || ""
      };
    });
  },

  // Search by title
  async search(query, page = 1) {
    const searchUrl = `${BASE_URL}/page/${page}/?s=${encodeURIComponent(query)}`;
    const res = await fetch(searchUrl);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const items = [...doc.querySelectorAll(".page-item-detail")];
    return items.map(item => {
      const a = item.querySelector(".page-item-detail-content h3 a");
      return {
        title: a?.textContent.trim() || "No title",
        url: a?.getAttribute("href"),
        thumbnail: item.querySelector("img")?.getAttribute("src") || "",
        description: item.querySelector(".description")?.textContent.trim() || ""
      };
    });
  },

  async chapters(mangaUrl) {
    const res = await fetch(BASE_URL + mangaUrl);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const items = [...doc.querySelectorAll(".chapter-list li a")];
    return items.map(el => ({
      name: el.textContent.trim(),
      url: el.getAttribute("href")
    }));
  },

  async pages(chapterUrl) {
    const res = await fetch(BASE_URL + chapterUrl);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const imgs = [...doc.querySelectorAll(".reading-content img")];
    return imgs.map(img => img.getAttribute("src"));
  }
};
