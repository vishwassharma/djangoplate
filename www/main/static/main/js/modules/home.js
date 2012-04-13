(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  (function(Home) {
    Home.Model = Backbone.Model.extend;
    Home.Collection = Backbone.Model.extend;
    Home.View = Backbone.Model.extend;
    Home.Model.Item = (function(_super) {

      __extends(Item, _super);

      function Item() {
        Item.__super__.constructor.apply(this, arguments);
      }

      Item.prototype.defaults = {
        "part1": "Hello",
        "part2": "Backbone"
      };

      return Item;

    })(Backbone.Model);
    Home.Collection.List = (function(_super) {

      __extends(List, _super);

      function List() {
        List.__super__.constructor.apply(this, arguments);
      }

      List.prototype.model = Home.Model.Item;

      return List;

    })(Backbone.Collection);
    Home.View.ItemView = (function(_super) {

      __extends(ItemView, _super);

      function ItemView() {
        ItemView.__super__.constructor.apply(this, arguments);
      }

      ItemView.prototype.tagName = 'li';

      ItemView.prototype.events = {
        "click button.swap": "swap",
        "click button.remove": "remove"
      };

      ItemView.prototype.initialize = function() {
        _.bindAll(this, 'render', 'remove', 'unrender');
        this.model.bind("change", this.render);
        return this.model.bind("remove", this.unrender);
      };

      ItemView.prototype.render = function() {
        $(this.el).html("<span>" + (this.model.get('part1')) + " " + (this.model.get('part2')) + "</span><button class='swap'>swap</button><button class='remove'>delete</button>");
        return this;
      };

      ItemView.prototype.swap = function() {
        return this.model.set({
          'part1': this.model.get('part2'),
          'part2': this.model.get('part1')
        });
      };

      ItemView.prototype.unrender = function() {
        console.log("Underder");
        return $(this.el).remove();
      };

      ItemView.prototype.remove = function() {
        console.log("Destroy");
        return this.model.destroy();
      };

      return ItemView;

    })(Backbone.View);
    return Home.View.ListView = (function(_super) {

      __extends(ListView, _super);

      function ListView() {
        ListView.__super__.constructor.apply(this, arguments);
      }

      ListView.prototype.el = $('body');

      ListView.prototype.initialize = function() {
        _.bindAll(this, 'render', 'addItem', 'appendItem');
        this.counter = 0;
        this.collection = new Home.Collection.List;
        this.collection.bind("add", this.appendItem);
        return this.render();
      };

      ListView.prototype.events = {
        "click button.addItem": "addItem"
      };

      ListView.prototype.render = function() {
        this.$el.append("<button class='addItem'>AddItem</button><ul><li>Hello world</li></ul>");
        return this;
      };

      ListView.prototype.addItem = function() {
        var item, part2;
        this.counter++;
        console.log("Adding Item");
        item = new Home.Model.Item;
        console.log(item);
        item.set({
          'part1': "Hello"
        });
        part2 = "Backbone " + this.counter;
        item.set({
          'part2': part2
        });
        console.log(this.collection);
        return this.collection.add(item);
      };

      ListView.prototype.appendItem = function(item) {
        var view;
        console.log("Adding item here");
        view = new Home.View.ItemView({
          model: item
        });
        return $('ul').append(view.render().el);
      };

      return ListView;

    })(Backbone.View);
  })(logicstick.module("home"));

}).call(this);
