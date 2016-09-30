$(document).ready(function () {
  var itemInput = $("#item-input");
  var aisleInput = $("#aisle-input");
  var submitButton = $("#submit-button");
  var itemsMasterContainer = $("#items-master-container");
  var itemStatusMessage = document.getElementById("item-status-message");

  function Item(item, aisle, note, quantity, id) {
    this.item = item;
    this.aisle = aisle;
    this.note = note || "No note added";
    this.quantity = quantity || "No quantity noted";
    this.id = id || Date.now();
  }

  Item.prototype.toHTML = function () {
    return $(`
      <section id=${this.id} class="each-idea-container">
        <h3 contenteditable="true" class="editable-item"> Item: ${this.item}</h3>
        <h4 contenteditable="true" class="editable-aisle"> Aisle: ${this.aisle}</h4>
        <p>Id: ${this.id}</p>
        <input type="text" value="${this.note}" />
        <button class="save-note"> Save Note</button>
        <button class="delete-button"> Delete Item</button>
      </section>
      `);
  };

  var itemManager = {
    //this === itemManager

    items: [],

    add: function (newItem, newAisle) {
      this.items.push(new Item(newItem, newAisle));
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
      var found = this.items.find(function (item) {
        return item.id === targetId;
      });
      return found;
    },

    remove: function (id) {
      var targetId = parseInt(id);
      this.items = this.items.filter(function (item) {
        return item.id !== targetId;
      });
      this.store();
      this.checkIfClear();
    }, // end of remove

    render: function () {
      itemsMasterContainer.html("");
      this.items.forEach(function (item) {
        itemsMasterContainer.prepend(item.toHTML());
      }); // end of forEach
    }, // end of render

    retrieve: function () {
      var retrieveditems = JSON.parse(localStorage.getItem("items"));
      if (retrieveditems) {
        retrieveditems.forEach(function (item) {
          itemManager.items.push(new Item(item.item, item.aisle, item.id, item.note));
        });
      } // end of if statement
    }, // end of retrieve

    store: function () {
      localStorage.setItem("items", JSON.stringify(this.items));
      this.render();
    }, // end of store

  }; // end of itemManager

  // Idea.prototype.editTitleOfIdea = function (titleText) {
  //   this.title = titleText;
  //   itemManager.store();
  // };

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

  itemsMasterContainer.on("keyup", ".editable-item", function (key) {
    if (key.which === 13) {
      var titleText = $(this).closest("h3").text();
      var id = $(this).closest(".each-idea-container").attr("id");
      itemManager.findID(id).editTitleOfIdea(titleText);
    }
  });

  itemsMasterContainer.on("click", ".delete-button", function () {
    let that = this;
    let confirmDelete = confirm("Are you sure you want to delete the item?");
    if (confirmDelete) {
      var id = $(that).closest(".each-idea-container").attr("id");
      itemManager.remove(id);
    }
  } );

  itemsMasterContainer.on("click", ".save-note", function () {


  } );

  function addUserInputToProgram() {
    var newItem = itemInput.val();
    var newAisle = aisleInput.val();
    itemManager.add(newItem, newAisle);
  }

  function clearInputFields() {
    itemInput.val("");
    aisleInput.val("");
  }

  itemManager.retrieve();
  itemManager.render();
  itemManager.checkIfClear();

}); //end of jQuery body
