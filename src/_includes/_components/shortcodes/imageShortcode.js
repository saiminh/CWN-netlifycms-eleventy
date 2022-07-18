const Image = require("@11ty/eleventy-img");

// Async Image Shortcode function
module.exports = async function(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1200, 1500],
    formats: ["avif", "jpeg"],
    urlPath: "/static/img/optimized",
    outputDir: "src/static/img/optimized"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}