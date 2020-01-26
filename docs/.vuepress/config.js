module.exports = {
  theme: "reco",
  title: "Cosine's Blog",
  description: "just my blog",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Code", link: "/code/" },
      { text: "Game", link: "/game/" },
      { text: "Life", link: "/life/" },
      { text: "Google", link: "https://google.com", target: "_self", rel: "" }
    ],
    sidebar: {
      "/code/": [
        "" /* /foo/ */,
        "js-value-type-1" /* /foo/one.html */,
        "js-value-type-2" /* /foo/two.html */
      ],
      // fallback
      "/": ["" /* / */]
    },
    // sidebar: [
    //   {
    //     title: "Group 1", // 必要的
    //     path: "/foo/", // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1, // 可选的, 默认值是 1
    //     children: ["/", "/"]
    //   },
    //   {
    //     title: "旧迁移", // 必要的
    //     path: "/code/", // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 2, // 可选的, 默认值是 1
    //     children: [
    //       "/code/home" /* /foo/ */,
    //       "js-value-type-1" /* /foo/one.html */,
    //       "js-value-type-2" /* /foo/two.html */
    //     ]
    //   }
    // ],
    //   {
    //     title: "Group 2",
    //     children: [
    //       /* ... */
    //     ]
    //   }
    // ],
    search: false,
    lastUpdated: "Last Updated" // string | boolean
  }
};
