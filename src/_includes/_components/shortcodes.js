const postCard = require("./shortcodes/postCard.js");
const imageShortcode = require("./shortcodes/imageShortcode.js");

module.exports = function (eleventyConfig) {
  // image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
  // PostCard Module
  eleventyConfig.addNunjucksAsyncShortcode("postCard", postCard);
};