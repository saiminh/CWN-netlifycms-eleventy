barba.init({
  views: [{
    namespace: 'home',
    beforeEnter() {
      window.scrollTo(0, 0);
    }
  }]
});
// Barba.Dispatcher.on('newPageReady', function(current, prev, container) {
//   history.scrollRestoration = 'manual';
// });