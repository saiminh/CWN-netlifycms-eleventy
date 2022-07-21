const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const markdown = require("markdown-it")({ html: true });
const addShortcodes = require("./src/_includes/_components/shortcodes.js");



module.exports = function (eleventyConfig) {

  addShortcodes(eleventyConfig);

  // adding markdown support to njk templates
  eleventyConfig.addShortcode("markdown", function (content = '') { 
    return `${markdown.render(content)}` 
  });

  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const realdate = new Date(dateObj); //in case of quotes in the date
    return DateTime.fromJSDate(realdate, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  
  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/static/css/style.css");
  eleventyConfig.addPassthroughCopy("./src/static/css/style-deferred.css");
  eleventyConfig.addPassthroughCopy("./src/static/css/style-desktop.css");
  eleventyConfig.addPassthroughCopy("./src/static/css/style-desktop-deferred.css");
  eleventyConfig.addPassthroughCopy("./src/static/css/style-CMS.css");
  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/static/js/main.js");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Get only content that matches a tag
  eleventyConfig.addCollection("allArticles", function(collectionApi) {
    return collectionApi.getFilteredByTags("post");
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
