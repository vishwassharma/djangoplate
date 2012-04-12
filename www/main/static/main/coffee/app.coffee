jQuery ($) ->
    class Item extends Backbone.Model
        
        defaults :
            "part1" : "hello"
            "part2" : "Backbone"
    

    class ItemView extends Backbone.View
        tagName : 'li'


        events :
            "click button.swap" : "swap"
            "click button.remove" : "remove"
        
    
        initialize: ->
            _.bindAll @, "render", "unrender"
            @model.bind "change", @render
            @model.bind "remove", @unrender
            #@render()
    
        render: ->
            console.log "ItemView::render"
            #$(@el).html "<span>#{@model.get 'part1'} #{@model.get 'part2'}</span>"
            $(@el).html """
            <span>#{@model.get 'part1'} #{@model.get 'part2'}</span>
            <button class="swap">swap</button>
            <button class="remove">delete</button>
            """
            @

        unrender : ->
            console.log "ItemView::unrender"
            $(@el).remove()


        swap: ->
            @model.set
                part1 : @model.get 'part2'
                part2 : @model.get 'part1'

        remove : ->
            @model.destroy()

    class List extends Backbone.Collection

        model : Item
        url : '/items'

    class ListView extends Backbone.View
        el : 'body'
        
        events :
            "click button.additem" : "addItem"
        
    
        initialize: ->
            _.bindAll @, 'render', 'addItem', 'appendItem'
            @collection.bind "add", @appendItem

            @counter = 0

            @render()
    
        render: ->
            console.log "ListView::Render"
            $(@el).append "<button class='additem'>AddItem</button>"
            $(@el).append "<ul>some other text</ul>"
            @

        addItem : ->
            console.log "ListView::additem"
            @counter++
            item = new Item
            item.set "part1": "Hello"
            part2 = "#{item.get 'part2'} #{@counter}"
            item.set "part2" : part2
            @collection.add item

        appendItem : (item) ->
            console.log "ListView::AppendItem"
            item_view = new ItemView model : item
            $('ul').append item_view.render().el

    #Backbone.sync = (method, model, success, error) ->
        
        #success()

    class Other extends Backbone.Router
    
        routes:
            'home': 'home'
            'product': 'product'
        
        home: ->
            console.log "Router Working"
            list = new List

            listview = new ListView collection : list
            list.fetch()


        product : ->
            console.log "Product Page"


    app = new Other
    Backbone.history.start()
