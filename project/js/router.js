(function() {
  function Router() {
    this._notFoundHandler = undefined;
    this._routes = [];
  }
  Router.prototype.notFound = function(handler) {
    this._notFoundHandler = handler;
  };
  Router.prototype.route = function(name, route, handler) {
    if (!handler) {
      handler = route;
      route = name;
      name = undefined;
    }
    for (var i = 0; i < this._routes.length; i++) {
      if (this._routes[i].route == route) {
        this._routes[i].handlers.push(handler);
        return;
      }
    }
    var newCurrentRoute = {
      name: name,
      route: route,
      handlers: [handler],
    };
    this._routes.push(newCurrentRoute);
  };
  Router.prototype.toPath = function(path) {
    for (var i = 0; i < this._routes.length; i++) {

      if (path.indexOf(this._routes[i].route + "/") !== 0 && this._routes[i].route !== path) {
        continue;
      }
      window.location.hash = '#' + path;

      for(var j = 0; j < this._routes[i].handlers.length; j++){
        this._routes[i].handlers[j]();
      }
    
      return;
    }
    if (this._notFoundHandler) {
      this._notFoundHandler();
    }
  };
  window.Router = Router;
})();
