# Use an IIFE...
# (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
# to assign your module reference to a local variable, in this case Example.
#
# Change line 16 'Example' to the name of your module, and change line 36 to
# the lowercase version of your module name.  Then change the namespace
# for all the Models/Collections/Views/Routers to use your module name.
#
# For example: Renaming this to use the module name: Project
#
# Line 16: ((Project) ->
# Line 36: )(namespace.module("project"))
#
# Line 18: Project.Model = Backbone.Model.extend
#
((Example) ->

  Example.Model = Backbone.Model.extend # ...
  Example.Collection = Backbone.Collection.extend # ...
  Example.Router = Backbone.Router.extend # ...

  # This will fetch the tutorial template and render it.
  Example.Views.Tutorial = Backbone.View.extend
    template: "/static/main/coffee/templates/example.html",

    render: (done) ->
      view = this

      # Fetch the template, render it to the View element and call done.
      logicstick.fetchTemplate this.template, (tmpl) ->
        view.el.innerHTML = tmpl()

        # If a done function is passed, call it with the element
        if _.isFunction(done)
          done(view.el)
)(logicstick.module("example"))
