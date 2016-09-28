$(document).ready(function () {
  var titleInput = $("#title-input");
  var bodyInput = $("#body-input");
  var submitButton = $("#submit-button");
  var ideasMasterContainer = $("#ideas-master-container");
  // var buttonToDeleteIdea = $(".button-to-delete-idea");

  function Idea(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
  }

  Idea.prototype.toHTML = function () {
    return $(`
      <section id=${this.id} class="each-idea-container">
        <h3>Title: ${this.title}</h3>
        <h4>Body: ${this.body}</h4>
        <p>Id: ${this.id}</p>
        <p>Quality: ${this.quality}</p>
        <button class="button-to-delete-idea">Delete Idea</button>
      </section>
      `);
  };

  var ideaManager = {
    //this === ideaManager

    ideas: [],

    add: function (newTitle, newBody) {
      this.ideas.push(new Idea(newTitle, newBody));
      this.store();
    }, // end of add

    remove: function (id) {
      var targetId = parseInt(id);
      this.ideas = this.ideas.filter(function (idea) {
        return idea.id !== targetId;
      });
      this.store();
    }, // end of remove

    render: function () {
      ideasMasterContainer.html("");
      this.ideas.forEach(function (idea) {
        ideasMasterContainer.prepend(idea.toHTML());
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

  ideasMasterContainer.on("click", ".button-to-delete-idea", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    ideaManager.remove(id);
  } );

  function addUserInputToProgram() {
    var newTitle = titleInput.val();
    var newBody = bodyInput.val();
    ideaManager.add(newTitle, newBody);
  }

  function clearInputFields() {
    titleInput.val("");
    bodyInput.val("");
  }

  ideaManager.retrieve();
  ideaManager.render();

}); //end of jQuery body
