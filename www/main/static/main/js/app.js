(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  jQuery(function($) {
    var Item, ItemView, List, ListView, Other, app;
    Item = (function(_super) {

      __extends(Item, _super);

      function Item() {
        Item.__super__.constructor.apply(this, arguments);
      }

      Item.prototype.defaults = {
        "part1": "hello",
        "part2": "Backbone"
      };

      return Item;

    })(Backbone.Model);
    ItemView = (function(_super) {

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
        _.bindAll(this, "render", "unrender");
        this.model.bind("change", this.render);
        return this.model.bind("remove", this.unrender);
      };

      ItemView.prototype.render = function() {
        console.log("ItemView::render");
        $(this.el).html("<span>" + (this.model.get('part1')) + " " + (this.model.get('part2')) + "</span>\n<button class=\"swap\">swap</button>\n<button class=\"remove\">delete</button>");
        return this;
      };

      ItemView.prototype.unrender = function() {
        console.log("ItemView::unrender");
        return $(this.el).remove();
      };

      ItemView.prototype.swap = function() {
        return this.model.set({
          part1: this.model.get('part2'),
          part2: this.model.get('part1')
        });
      };

      ItemView.prototype.remove = function() {
        return this.model.destroy();
      };

      return ItemView;

    })(Backbone.View);
    List = (function(_super) {

      __extends(List, _super);

      function List() {
        List.__super__.constructor.apply(this, arguments);
      }

      List.prototype.model = Item;

      List.prototype.url = '/items';

      return List;

    })(Backbone.Collection);
    ListView = (function(_super) {

      __extends(ListView, _super);

      function ListView() {
        ListView.__super__.constructor.apply(this, arguments);
      }

      ListView.prototype.el = 'body';

      ListView.prototype.events = {
        "click button.additem": "addItem"
      };

      ListView.prototype.initialize = function() {
        _.bindAll(this, 'render', 'addItem', 'appendItem');
        this.collection.bind("add", this.appendItem);
        this.counter = 0;
        return this.render();
      };

      ListView.prototype.render = function() {
        console.log("ListView::Render");
        $(this.el).append("<button class='additem'>AddItem</button>");
        $(this.el).append("<ul>some other text</ul>");
        return this;
      };

      ListView.prototype.addItem = function() {
        var item, part2;
        console.log("ListView::additem");
        this.counter++;
        item = new Item;
        item.set({
          "part1": "Hello"
        });
        part2 = "" + (item.get('part2')) + " " + this.counter;
        item.set({
          "part2": part2
        });
        return this.collection.add(item);
      };

      ListView.prototype.appendItem = function(item) {
        var item_view;
        console.log("ListView::AppendItem");
        item_view = new ItemView({
          model: item
        });
        return $('ul').append(item_view.render().el);
      };

      return ListView;

    })(Backbone.View);
    Other = (function(_super) {

      __extends(Other, _super);

      function Other() {
        Other.__super__.constructor.apply(this, arguments);
      }

      Other.prototype.routes = {
        'home': 'home',
        'product': 'product'
      };

      Other.prototype.home = function() {
        var list, listview;
        console.log("Router Working");
        list = new List;
        listview = new ListView({
          collection: list
        });
        return list.fetch();
      };

      Other.prototype.product = function() {
        return console.log("Product Page");
      };

      return Other;

    })(Backbone.Router);
    app = new Other;
    return Backbone.history.start();
  });

}).call(this);
