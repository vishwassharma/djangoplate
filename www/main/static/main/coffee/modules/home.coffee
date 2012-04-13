((Home) ->
    Home.Model = Backbone.Model.extend
    Home.Collection = Backbone.Model.extend
    Home.View = Backbone.Model.extend

    class Home.Model.Item extends Backbone.Model
        
        defaults :
            "part1" : "Hello"
            "part2" : "Backbone"
    
    class Home.Collection.List extends Backbone.Collection
        
        model : Home.Model.Item

    class Home.View.ItemView extends Backbone.View
        tagName : 'li'

        events :
            "click button.swap" : "swap"
            "click button.remove" : "remove"
    
        initialize: ->
            _.bindAll @, 'render', 'remove', 'unrender'
            @model.bind "change", @render
            @model.bind "remove", @unrender
            #@render()
    
        render: ->
            $(@el).html "<span>#{@model.get 'part1'} #{@model.get 'part2'}</span><button class='swap'>swap</button><button class='remove'>delete</button>"
            @

        swap : ->
            @model.set
                'part1' : @model.get 'part2'
                'part2' : @model.get 'part1'

        unrender : ->
            console.log "Underder"
            $(@el).remove()

        remove : ->
            console.log "Destroy"
            @model.destroy()
    
    
    class Home.View.ListView extends Backbone.View
        el : $ 'body'
    
        initialize: ->
            _.bindAll @, 'render', 'addItem', 'appendItem'
            @counter = 0

            @collection = new Home.Collection.List
            @collection.bind "add", @appendItem

            @render()

        events :
            "click button.addItem" : "addItem"
    
        render: ->
             #.... your code here.....
            this.$el.append "<button class='addItem'>AddItem</button><ul><li>Hello world</li></ul>"
            @

        addItem: ->
            @counter++
            console.log "Adding Item"
            item = new Home.Model.Item
            console.log item
            item.set 'part1' : "Hello"
            part2 = "Backbone #{@counter}"
            item.set 'part2' : part2
            console.log @collection
            @collection.add item
        
        appendItem : (item) ->
            console.log "Adding item here"
            #$('ul').append '<li>#{item.get "part1"} #{item.get "part2"}</li>'
            view = new Home.View.ItemView model: item 
            $('ul').append view.render().el

)(logicstick.module("home"))
