# Shorthand the application namespace
app = logicstick.app

# Include the example module
Home = logicstick.module "home"

# Defining the application router, you can attach sub routers here.
Router = Backbone.Router.extend
  routes:
    "": "index"

  index: (hash) ->
    console.log "Am i actually working"
    home = new Home.View.ListView

# Treat the jQuery ready function as the entry point to the application.
# Inside this function, kick-off all initialization, everything up to this
# point should be definitions.
jQuery ($) ->
  # Define your master router on the application namespace and trigger all
  # navigation from this instance.
  app.router = new Router()

  # Trigger the initial route and enable HTML5 History API support
  Backbone.history.start(pushState: true)

# All navigation that is relative should be passed through the navigate
# method, to be processed by the router.  If the link has a data-bypass
# attribute, bypass the delegation completely.
$(document).on "click", "a:not([data-bypass])", (evt) ->
  # Get the anchor href and protcol
  href = $(this).attr("href")
  protocol = this.protocol + "#"

  # Ensure the protocol is not part of URL, meaning its relative.
  if href && href.slice(0, protocol.length) is not protocol
    # Stop the default event to ensure the link will not cause a page
    # refresh.
    evt.preventDefault()

    # This uses the default router defined above, and not any routers
    # that may be placed in modules.  To have this work globally (at the
    # cost of losing all route events) you can change the following line
    # to: Backbone.history.navigate(href, true)
    app.router.navigate(href, true)

