import barba from '@barba/core';
import Alpine from 'alpinejs';
import elasticlunr from './elasticlunr.min.js';
 
window.Alpine = Alpine 
Alpine.start()

barba.init({
  transitions: [{
    leave(data) {
    },
    after(data) {
      updateBodyClass();
    }
  }],
  views: [{
    namespace: 'home',
    beforeEnter() {
      window.scrollTo(0, 0);
    },
    afterEnter() {
      enableCookmodeListChecking();
      initTooltip();
      fadeInImages();
    },
  }]
});

function updateBodyClass() {
  
  
  console.log('update body class');
  document.body.classList.remove('isHome', 'isBlog', 'isRecipes', 'isAbout');
  
  if ( document.querySelector('.feed--home') ) {
    document.body.classList.add('isHome');
  }
  if ( document.querySelector('.feed--news, .post--news') ) {
    document.body.classList.add('isBlog');
  }
  if ( document.querySelector('.feed--cooking, .post--cooking') ) {
    document.body.classList.add('isRecipes');
  }
  if ( document.querySelector('.page.about-me') ) {
    document.body.classList.add('isAbout');
  }
}

updateBodyClass();

function enableCookmodeListChecking() { 
  let listItems = document.querySelectorAll('.post-body-instructions p, .post-body-ingredients li');
  let listItemsArray = Array.from(listItems);
  listItemsArray.map(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('done');
    });
  })
};

const tooltip = document.querySelector('.tooltip');
document.body.addEventListener('mousemove', function(e) {
  let tooltipW = tooltip.offsetWidth;
  let tooltipH = tooltip.offsetHeight;
  let xPos = e.clientX;
  let yPos = e.clientY + 20;
  if (xPos >= window.innerWidth - tooltipW) {
    tooltip.style.transform = 'translate(' + (xPos - tooltipW) + 'px, ' + yPos + 'px)';
    tooltip.classList.add('tooltip--left');
  } else {
    tooltip.style.transform = 'translate(' + xPos + 'px, ' + yPos + 'px)';
    tooltip.classList.remove('tooltip--left');
  }
});

function initTooltip() {
  const tipelements = document.querySelectorAll('[data-tooltip]');
  const tipelementsArray = Array.from(tipelements);
  tipelementsArray.map(element => {
    let tiptext = element.getAttribute('data-tooltip');
    element.addEventListener('mouseover', function() {
      tooltip.innerText = tiptext;
      tooltip.classList.add('tooltip--visible');
    });
    element.addEventListener('mouseleave', function() {
      tooltip.classList.remove('tooltip--visible');
    });
  });
}

function fadeInImages() {
  let images = document.querySelectorAll('img');
  let imagesArray = Array.from(images);
  imagesArray.map(image => {
    image.onload = function() {
      image.classList.add('fade-in');
    }
  });
}

// Search functionality 
(function (window, document) {
  const search = (e) => {
    const results = window.searchIndex.search(e.target.value, {
      bool: "OR",
      expand: true,
    });
    
    const resEl = document.getElementById("searchResults");
    const noResultsEl = document.getElementById("noResultsFound");
    
    resEl.innerHTML = "";
    if (results) {
      noResultsEl.style.visibility = "hidden";
      results.map((r) => {
        const { id, title, description, tags } = r.doc;
        
        const el = document.createElement("li");
        resEl.appendChild(el);

        const h3 = document.createElement("h3");
        el.appendChild(h3);

        const a = document.createElement("a");
        a.setAttribute("href", id);
        a.textContent = title;
        h3.appendChild(a);
        
        const p = document.createElement("a");
        p.setAttribute("href", id);
        p.classList.add('search-result-description');
        p.textContent = description;
        el.appendChild(p);

        if (tags) {
          const tagsEl = document.createElement("div");
          tagsEl.innerHTML = `<div class="tags">` + tags.map((tag) => {
              return `<a class="tags-tag" href="/tags/${tag}">${tag}</a>`;
            }).join(" ") + `</div>`;
          el.appendChild(tagsEl);
        }
      });
    } else {
      noResultsEl.style.visibility = "visible";
    }
    if (resEl.innerHTML === "") {
      noResultsEl.style.visibility = "visible";
    }
  };

  fetch("/search-index.json").then((response) =>
    response.json().then((rawIndex) => {
      window.searchIndex = elasticlunr.Index.load(rawIndex);
      document.getElementById("searchField").addEventListener("input", search);
    })
  );
})(window, document);
