(function() {
  var Home, Router, app;

  app = logicstick.app;

  Home = logicstick.module("home");

  Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },
    index: function(hash) {
      var home;
      console.log("Am i actually working");
      return home = new Home.View.ListView;
    }
  });

  jQuery(function($) {
    app.router = new Router();
    return Backbone.history.start({
      pushState: true
    });
  });

  $(document).on("click", "a:not([data-bypass])", function(evt) {
    var href, protocol;
    href = $(this).attr("href");
    protocol = this.protocol + "#";
    if (href && href.slice(0, protocol.length) === !protocol) {
      evt.preventDefault();
      return app.router.navigate(href, true);
    }
  });

}).call(this);
