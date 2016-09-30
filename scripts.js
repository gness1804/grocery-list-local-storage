$(document).ready(function () {
  var itemInput = $("#item-input");
  var aisleInput = $("#aisle-input");
  var submitButton = $("#submit-button");
  var itemsMasterContainer = $("#items-master-container");
  var itemStatusMessage = document.getElementById("item-status-message");

  function Item(item, aisle, id, note) {
    this.item = item;
    this.aisle = aisle;
    this.id = id || Date.now();
    this.note = note;
  }

  Item.prototype.toHTML = function () {
    return $(`
      <section id=${this.id} class="each-idea-container">
        <h3 contenteditable="true" class="editable-title">${this.item}</h3>
        <h4 contenteditable="true" class="editable-body">${this.aisle}</h4>
        <p>Id: ${this.id}</p>
        <textarea>${this.note}</textarea>
        <button class="delete-button"> Delete Item</button>
      </section>
      `);
  };

  var ideaManager = {
    //this === ideaManager

    ideas: [],

    add: function (newTitle, newBody) {
      this.ideas.push(new Idea(newTitle, newBody));
      this.store();
      itemStatusMessage.innerText = "You have some good ideas! Why not add some more?";
    }, // end of add

    checkIfClear: function () {
      if (this.ideas.length === 0) {
        itemStatusMessage.innerText = "There are no ideas here! We want to see your bright ideas!";
      }
      else {
        itemStatusMessage.innerText = "You have some good ideas! Why not add some more?";
      }
    }, //end of checkIfClear

    findID: function (id) {
      var targetId = parseInt(id);
      var found = this.ideas.find(function (idea) {
        return idea.id === targetId;
      });
      return found;
    },

    remove: function (id) {
      var targetId = parseInt(id);
      this.ideas = this.ideas.filter(function (idea) {
        return idea.id !== targetId;
      });
      this.store();
      this.checkIfClear();
    }, // end of remove

    render: function () {
      itemsMasterContainer.html("");
      this.ideas.forEach(function (idea) {
        itemsMasterContainer.prepend(idea.toHTML());
      }); // end of forEach
    }, // end of render

    retrieve: function () {
      var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
      if (retrievedIdeas) {
        retrievedIdeas.forEach(function (idea) {
          ideaManager.ideas.push(new Idea(idea.title, idea.body, idea.id, idea.quality));
        });
      } // end of if statement
    }, // end of retrieve

    store: function () {
      localStorage.setItem("ideas", JSON.stringify(this.ideas));
      this.render();
    }, // end of store

  }; // end of ideaManager

  Idea.prototype.upvoteIdea = function () {
    var quality = this.quality;
    if (quality === "swill") {
      this.quality = "plausible";
    }
    else if (quality === "plausible") {
      this.quality = "genius";
    }
    ideaManager.store();
  };

  Idea.prototype.downvoteIdea = function () {
    var quality = this.quality;
    if (quality === "genius") {
      this.quality = "plausible";
    }
    else if (quality === "plausible") {
      this.quality = "swill";
    }
    ideaManager.store();
  };

  Idea.prototype.editTitleOfIdea = function (titleText) {
    this.title = titleText;
    ideaManager.store();
  };

  submitButton.on("click", function () {
    addUserInputToProgram();
    clearInputFields();
  });

  $("input").on("keyup", function (key) {
    if (key.which === 13) {
      addUserInputToProgram();
      clearInputFields();
    }
  });

  itemsMasterContainer.on("keyup", ".editable-title", function (key) {
    if (key.which === 13) {
      var titleText = $(this).closest("h3").text();
      var id = $(this).closest(".each-idea-container").attr("id");
      ideaManager.findID(id).editTitleOfIdea(titleText);
    }
  });

  itemsMasterContainer.on("click", ".delete-button", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    ideaManager.remove(id);
  } );

  itemsMasterContainer.on("click", ".upvote", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    ideaManager.findID(id).upvoteIdea();
  } );

  itemsMasterContainer.on("click", ".downvote", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    ideaManager.findID(id).downvoteIdea();
  } );

  function addUserInputToProgram() {
    var newTitle = itemInput.val();
    var newBody = aisleInput.val();
    ideaManager.add(newTitle, newBody);
  }

  function clearInputFields() {
    itemInput.val("");
    aisleInput.val("");
  }

  ideaManager.retrieve();
  ideaManager.render();
  ideaManager.checkIfClear();

}); //end of jQuery body
