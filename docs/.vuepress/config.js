module.exports = {
    title:"Xxk'notes",
    base:'/notes/',
    port:9999,
    themeConfig: {
        logo:"/guagua.jpg",
        nav: require('./nav/nav.js'),
        sidebar: require('./sidebar/sidebar'),
        editLinks: true,
        docsDir: 'docs',
        smoothScroll: true,
    },
    markdown: {
        extendMarkdown: md => {
          md.use(require("markdown-it-disable-url-encode"));
        }
      }
}