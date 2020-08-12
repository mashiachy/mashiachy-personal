export default ({store, $routeNumber, route, from}) => {
  store.dispatch('transition-managing/setNewName', {
    fromN: $routeNumber(from),
    toN: $routeNumber(route),
  });
};
