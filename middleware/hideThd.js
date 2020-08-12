export default ({store, app, route}) => {
  if (process.client) {
    if (app.$routeNumber(app.getRouteBaseName(route)) === -1) {
      store.dispatch('three-managing/hide');
    }
  }
};
