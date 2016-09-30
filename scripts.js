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

  var itemManager = {
    //this === itemManager

    items: [],

    add: function (newTitle, newBody) {
      this.items.push(new Idea(newTitle, newBody));
      this.store();
      itemStatusMessage.innerText = "You have some good items! Why not add some more?";
    }, // end of add

    checkIfClear: function () {
      if (this.items.length === 0) {
        itemStatusMessage.innerText = "There are no items here! We want to see your bright items!";
      }
      else {
        itemStatusMessage.innerText = "You have some good items! Why not add some more?";
      }
    }, //end of checkIfClear

    findID: function (id) {
      var targetId = parseInt(id);
      var found = this.items.find(function (idea) {
        return idea.id === targetId;
      });
      return found;
    },

    remove: function (id) {
      var targetId = parseInt(id);
      this.items = this.items.filter(function (idea) {
        return idea.id !== targetId;
      });
      this.store();
      this.checkIfClear();
    }, // end of remove

    render: function () {
      itemsMasterContainer.html("");
      this.items.forEach(function (idea) {
        itemsMasterContainer.prepend(idea.toHTML());
      }); // end of forEach
    }, // end of render

    retrieve: function () {
      var retrieveditems = JSON.parse(localStorage.getItem("items"));
      if (retrieveditems) {
        retrieveditems.forEach(function (idea) {
          itemManager.items.push(new Idea(idea.title, idea.body, idea.id, idea.quality));
        });
      } // end of if statement
    }, // end of retrieve

    store: function () {
      localStorage.setItem("items", JSON.stringify(this.items));
      this.render();
    }, // end of store

  }; // end of itemManager

  Idea.prototype.upvoteIdea = function () {
    var quality = this.quality;
    if (quality === "swill") {
      this.quality = "plausible";
    }
    else if (quality === "plausible") {
      this.quality = "genius";
    }
    itemManager.store();
  };

  Idea.prototype.downvoteIdea = function () {
    var quality = this.quality;
    if (quality === "genius") {
      this.quality = "plausible";
    }
    else if (quality === "plausible") {
      this.quality = "swill";
    }
    itemManager.store();
  };

  Idea.prototype.editTitleOfIdea = function (titleText) {
    this.title = titleText;
    itemManager.store();
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
      itemManager.findID(id).editTitleOfIdea(titleText);
    }
  });

  itemsMasterContainer.on("click", ".delete-button", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    itemManager.remove(id);
  } );

  itemsMasterContainer.on("click", ".upvote", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    itemManager.findID(id).upvoteIdea();
  } );

  itemsMasterContainer.on("click", ".downvote", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    itemManager.findID(id).downvoteIdea();
  } );

  function addUserInputToProgram() {
    var newTitle = itemInput.val();
    var newBody = aisleInput.val();
    itemManager.add(newTitle, newBody);
  }

  function clearInputFields() {
    itemInput.val("");
    aisleInput.val("");
  }

  itemManager.retrieve();
  itemManager.render();
  itemManager.checkIfClear();

}); //end of jQuery body
