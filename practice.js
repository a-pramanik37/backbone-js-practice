        //########### defining a model ###############
        // let User = Backbone.Model.extend({
        //     defaults: {
        //         name: "rahim",
        //         age: 22,
        //         email: "rahim@gmail.com"
        //     }
        // });

        // let user = new User();

        // console.log(`Name: ${user.get("name")} and Age: ${user.get("age")}`);

     
        //#####################################
        //passing a list of model or collection into a view
        //######################################
        // let Song = Backbone.Model.extend();
        // let Songs = Backbone.Collection.extend({
        //     model: Song
        // });

        // let SongView = Backbone.View.extend({
        //     tagName: "li",
        //     className: "list-item",
        //     render: function() {
        //         this.$el.html(this.model.get("title"));
        //         return this;
        //     }

        // });

        // let SongsView = Backbone.View.extend({
        //     render: function(){
        //         let self = this;
        //         this.model.each(function(song){
        //             let songView = new SongView({model: song});
        //             self.$el.append(songView.render().$el);
        //         })
        //     }
        // });

        // let songs = new Songs([
        //     new Song({title : "Blue in Green"}),
        //     new Song({title : "So What"}),
        //     new Song({title : "All Blues"})
        // ])

        // let songsView = new SongsView({el: "#songs", model: songs});
        // songsView.render();


        //#####################################
        //passing a list of model or collection into a view
        //######################################

        // let Song = Backbone.Model.extend();

        // let SongView = Backbone.View.extend({
        //     events: {
        //         "click": "onclick",
        //         "click .bookmark": "onClickBookmark",
        //     },
        //     onclick: function(){
        //         console.log("Listen clicked");
        //     },
            
        //     onClickBookmark: function(e){
        //         //stoppropagation method helps to not bother other events in the same cycle
        //         e.stopPropagation();
        //         console.log("Bookmark clicked");
        //     },

        //     render: function(){
        //         this.$el.html(this.model.get("title")+ " <button>Listen</button> <button class='bookmark'>Bookmark</button>");
        //         return this;
        //     }
        // });

        // let song = new Song({title: "Blue in Green"});

        // let songView = new SongView({el: "#container", model:song});
        // songView.render();


        //#####################################
        //Handling model events
        //######################################

        // let Song = Backbone.Model.extend({
        //     defaults: {
        //         listeners: 0
        //     }
        // });

        // let SongView = Backbone.View.extend({
        //     initialize: function(){
        //         this.model.on("change", this.onModelChange, this);
        //     },

        //     onModelChange: function(){
        //         this.$el.addClass("someClass");
        //     },

        //     render: function(){
        //         this.$el.html(this.model.get("title")+" - Listeners: "+ this.model.get("listeners"));
        //         return this;
        //     }

        // });

        // let song = new Song({title: "Blue in Green"});
        
        // let songView = new SongView({el: "#container", model: song});
        // songView.render();


        //#####################################
        //Handling model events
        //######################################



        //#################### STEP-2
        // Define the Task model
        

    var Task = Backbone.Model.extend({
    defaults: {
      title: ''
    }
  });
  
  // Define the TaskList collection
  var TaskList = Backbone.Collection.extend({
    model: Task,
    localStorage: true
  });
  
  var taskList = new TaskList();


  //###################### STEP-3

  var TodoView = Backbone.View.extend({
    template: _.template($('#todo-template').html()),
    events: {
      'click': 'toggleStatus'
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    toggleStatus: function() {
      this.model.set('completed', !this.model.get('completed'));
      this.model.save();
    }
  });
  
  var TodoListView = Backbone.View.extend({
    el: '#todo-app',
    initialize: function() {
      this.listenTo(this.collection, 'add', this.render);
      this.render();
    },
    render: function() {
      this.$('#todo-list').empty();
      this.collection.each(function(task) {
        var todoView = new TodoView({ model: task });
        this.$('#todo-list').append(todoView.render().el);
      }, this);
      return this;
    },
    events: {
      'click #add-button': 'addTask'
    },
    addTask: function() {
      var title = this.$('#todo-input').val();
      if (title) {
        this.collection.create({ title: title });
        this.$('#todo-input').val('');
      }
    }
  });
  
  var todoListView = new TodoListView({ collection: taskList });
  
  



