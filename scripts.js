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

    let assignedAisle;

    if (chosenCategory === "Baking Items/Spices") {
      assignedAisle = 5;
    }
    else if (chosenCategory === "Cooking Wines/Condiments/Olives") {
      assignedAisle = 2;
    }

    aisleInput.val(assignedAisle);

  } //end of assignAisle

//   function assignAisle() {
// 	var x = document.getElementById("category").value;
// 	var y;
// 	if (x === "Cooking Wines" || x === "Condiments" || x == "Olives") {
// 		y = 2;
// 	}
// 	else if (x === "Baking Items" || x === "Spices") {
// 		y = 5;
// 	}
// 	else if (x === "Canned Fish" || x === "Ethnic Foods" || x === "Pasta/Pasta Sauce" || x === "Rice") {
// 		y = 6;
// 	}
// 	else if(x === "Canned Beans" || x === "Canned Tomatoes" || x === "Soups") {
// 		y = 7;
// 	}
// 	else if (x === "Household Goods (Paper Towels, TP, etc)") {
// 		y = 8;
// 	}
// 	else if (x === "Detergent (Dish and Laundry)") {
// 		y = 9;
// 	}
// 	else if (x === "Breads/Bagels" || x === "Peanut Butter and Jelly") {
// 		y = 13;
// 	}
// 	else if (x === "Frozen Lunches/Dinners") {
// 		y = "11/12";
// 	}
// 	else if (x === "Frozen Veggies" || x === "Ice Cream") {
// 		y = 12;
// 	}
// 	else if (x === "Honey") {
// 		y = 13;
// 	}
// 	else if (x === "Office Supplies") {
// 		y = 16;
// 	}
// 	else if (x === "Personal Care and Grooming") {
// 		y = "17/18";
// 	}
// 	else if (x === "Medicines (OTC)") {
// 		y = 18;
// 	}
// 	else if (x === "Chips" || x === "Nuts") {
// 		y = 19;
// 	}
// 	else if (x === "Soda") {
// 		y = 22;
// 	}
// 	else if (x === "Pest Control") {
// 		y = "Front";
// 	}
// 	else if (x === "Meat") {
// 		y = "Meat";
// 	}
// 	else if (x === "Produce") {
// 		y = "Produce";
// 	}
// 	else if (x === "Seafood (Fresh or Frozen)") {
// 		y = "Seafood";
// 	}
// 	document.getElementById("aisle").value = y;
// }

}); //end of jQuery body
