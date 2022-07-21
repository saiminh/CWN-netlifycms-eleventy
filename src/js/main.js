import barba from '@barba/core';
import Alpine from 'alpinejs'
 
window.Alpine = Alpine 
Alpine.start()

barba.init({
  views: [{
    namespace: 'home',
    beforeEnter() {
      window.scrollTo(0, 0);
    },
    afterEnter() {
      enableCookmodeListChecking();
      initTooltip();
    }
  }]
});

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
  console.log(tipelementsArray);
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