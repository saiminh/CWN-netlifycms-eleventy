const elasticlunr = require('elasticlunr');

module.exports = function(collection) {
  //what fields do we want to search?
  let index = elasticlunr( function() {
    this.addField('title');
    this.addField('description');
    this.addField('tags');
    this.addField('categories');
    this.setRef('id');
  })

  collection.forEach((page) => {
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      description: page.template.frontMatter.data.description,
      tags: page.template.frontMatter.data.tags,
    })
  })

  return index.toJSON();
}