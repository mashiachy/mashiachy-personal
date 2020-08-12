export default ({store, app, route, $routeNumber}) => {
  if (process.client) {
    if ($routeNumber(app.getRouteBaseName(route)) !== -1) {
      store.dispatch('scroll-navigation/modeOn');
      store.dispatch('scroll-navigation/toPage', app.getRouteBaseName(route));
    } else {
      store.dispatch('scroll-navigation/modeOff');
    }
  }
};
