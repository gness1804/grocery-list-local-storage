$(document).ready(function () {
  const itemInput = $("#item-input");
  const category = $("#category");
  const aisleInput = $("#aisle-input");
  const note = $("#note");
  const quantity = $("#quantity");

  const submitButton = $("#submit-button");

  const itemsMasterContainer = $("#items-master-container");
  const itemStatusMessage = document.getElementById("item-status-message");

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
        <h5 class="note"> Note: ${this.note}</h5>
        <h6 class="quantity"> Quantity: ${this.quantity}</h6>
        <p>Id: ${this.id}</p>
        <button class="delete-button"> Delete Item</button>
      </section>
      `);
  };

  var itemManager = {
    //this === itemManager

    items: [],

    add: function (newItem, newAisle, newNote, newQuantity) {
      this.items.push(new Item(newItem, newAisle, newNote, newQuantity));
      this.store();
      this.count();
    }, // end of add

    count: function () {
      let count = 0;
      for (var i = 0; i < this.items.length; i++) {
        count = count + 1;
      }
      if (count > 0) {
        itemStatusMessage.innerText = "You have " + count + " " + "item(s) remaining on your list.";
      }
      else {
        itemStatusMessage.innerText = "There are no items on your list!";
      }
    },

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
      this.count();
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
          itemManager.items.push(new Item(item.item, item.aisle, item.note, item.quantity, item.id));
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

  category.on("change", function () {
    assignAisle();
  });

  function addUserInputToProgram() {
    var newItem = itemInput.val();
    var newAisle = aisleInput.val();
    var newNote = note.val();
    var newQuantity = quantity.val();
    itemManager.add(newItem, newAisle, newNote, newQuantity);
  }

  function clearInputFields() {
    itemInput.val("");
    aisleInput.val("");
  }

  itemManager.retrieve();
  itemManager.render();
  itemManager.count();

  function assignAisle() {

    let chosenCategory = category.val();

    let selectedAisle;

    if (chosenCategory === "Baking Items/Spices") {
      selectedAisle = 5;
    }
    else if (chosenCategory === "Bottled Water") {
      selectedAisle = 20;
    }
    else if (chosenCategory === "Breads/PBJ/Honey") {
      selectedAisle = 13;
    }
    else if (chosenCategory === "Canned Beans/Tomatoes/Soups") {
      selectedAisle = 7;
    }
    else if (chosenCategory === "Canned Fish/Ethnic Foods/Pasta+Pasta Sauce/Rice") {
      selectedAisle = 6;
    }
    else if (chosenCategory === "Chips/Nuts") {
      selectedAisle = 19;
    }
    else if (chosenCategory === "Cooking Wines/Condiments/Olives") {
      selectedAisle = 2;
    }
    else if (chosenCategory === "Dish+Laundry Detergent") {
      selectedAisle = 9;
    }
    else if (chosenCategory === "Frozen Items") {
      selectedAisle = 11;
    }
    else if (chosenCategory === "Household Goods") {
      selectedAisle = 8;
    }
    else if (chosenCategory === "Medicines (OTC)") {
      selectedAisle = 18;
    }
    else if (chosenCategory === "Office Supplies") {
      selectedAisle = 16;
    }
    else if (chosenCategory === "Personal Care Items") {
      selectedAisle = 17;
    }
    else if (chosenCategory === "Pest Control") {
      selectedAisle = "Front";
    }
    else if (chosenCategory === "Produce") {
      selectedAisle = "Produce";
    }
    else if (chosenCategory === "Soda") {
      selectedAisle = 22;
    }

    aisleInput.val(selectedAisle);

  } //end of assignAisle

}); //end of jQuery body
