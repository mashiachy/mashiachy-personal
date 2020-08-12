export default (context, inject) => {
  const routeNumber = (page, { pages = ['index', 'who', 'what', 'why', 'how'], } = {}) => pages.indexOf(page);
  inject('routeNumber', routeNumber);
  context.$routeNumber = routeNumber;
}

