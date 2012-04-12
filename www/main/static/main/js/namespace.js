(function() {

  this.namespace = {
    module: (function() {
      var modules;
      modules = {};
      return function(name) {
        if (modules[name]) return modules[name];
        return modules[name] = {
          Views: {}
        };
      };
    })(),
    fetchTemplate: function(path, done) {
      window.JST = window.JST || {};
      if (JST[path]) return done(JST[path]);
      return $.get(path, function(contents) {
        var tmpl;
        tmpl = _.template(contents);
        JST[path] = tmpl;
        return done(tmpl);
      });
    },
    app: _.extend({}, Backbone.Events)
  };

}).call(this);
