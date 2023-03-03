const Image = require("@11ty/eleventy-img");

// Async Image Shortcode function
let asyncImageHTML = async function(src, alt, sizes, loading = "lazy") {
  let filePath = src;
  if ( src.toString().startsWith('/static') ) {
    filePath = src.toString().replace('/static', 'src/static');
  }
  let metadata = await Image(filePath, {
    widths: [300, 600, 900, 1200, 1500],
    formats: ["avif", "jpeg"],
    urlPath: "/static/img/optimized",
    outputDir: "src/static/img/optimized"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: loading,
    decoding: "async",
    origsrc: src
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}

module.exports = asyncImageHTML;

