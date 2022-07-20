const imageShortcode = require("./imageShortcode.js");
const { DateTime } = require("luxon");

// human readable date
function readableDate(dateObj) {
  const realdate = new Date(dateObj); //in case of quotes in the date
  return DateTime.fromJSDate(realdate, { zone: "utc" }).toFormat(
    "dd LLL yyyy"
  );
};

module.exports = async function(post, sizes = "(max-width: 300px) 100vw, 100w") {
  
  let image = '';
  if (post.data.featuredImage) {
    image = await imageShortcode(post.data.featuredImage, post.data.title, sizes);
  } 

  return `
    <div class="post-preview">
      <a href="${ post.url }" class="post-preview-img">
        ${ image }
      </a>
      <div class="post-preview-text">
        <p class="post-preview-text-meta">
            <time class="post-preview-text-meta-date">
              ${ readableDate(post.date) }
              ${ post.data.author ? `by  ${ post.data.author }` : '' }
            </time>
            <a href="/category/${post.data.categories}" class="post-preview-text-meta-category">
              ${ (post.data.categories == 'news') ? 'Blog' : 'Recipe' }
            </a>
        </p>
        <div class="post-preview-text-content">
          <h2 class="post-preview-text-content-title">
              <a href="${ post.url }">
                  ${ post.data.title ? post.data.title : 'Untitled' }
              </a>
          </h2>
          ${ post.data.description ? `<p class="post-preview-text-content-excerpt">${ post.data.description }</p>` : '' }
          <a href="${ post.url }" class="post-preview-text-content-read-more">Read more</a>
        </div>
      </div>
    </div>`;
};