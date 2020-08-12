export default ({store, app, route, from}) => {
  if (process.client) {
    if (app.$routeNumber(app.getRouteBaseName(from)) !== -1) {
      store.dispatch('three-managing/goToState', {
        key: app.$routeNumber(app.getRouteBaseName(route)),
      });
    }
  }
};
