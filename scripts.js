$(document).ready(function () {
  var titleInput = $("#title-input");
  var bodyInput = $("#body-input");
  var submitButton = $("#submit-button");
  var ideasMasterContainer = $("#ideas-master-container");
  var noIdeasMessage = document.getElementById("no-ideas-message");

  function Idea(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
  }

  Idea.prototype.toHTML = function () {
    return $(`
      <section id=${this.id} class="each-idea-container">
        <h3 contenteditable="true" class="editable-title">${this.title}</h3>
        <h4 contenteditable="true" class="editable-body">${this.body}</h4>
        <p>Id: ${this.id}</p>
        <p>Quality: ${this.quality}</p>
        <button class="button-to-delete-idea">Delete Idea</button>
        <button class="upvote">Upvote</button>
        <button class="downvote">Downvote</button>
      </section>
      `);
  };

  var ideaManager = {
    //this === ideaManager

    ideas: [],

    add: function (newTitle, newBody) {
      this.ideas.push(new Idea(newTitle, newBody));
      this.store();
      noIdeasMessage.innerText = "You have some good ideas! Why not add some more?";
    }, // end of add

    checkIfClear: function () {
      if (this.ideas.length === 0) {
        noIdeasMessage.innerText = "There are no ideas here! We want to see your bright ideas!";
      }
      else {
        noIdeasMessage.innerText = "You have some good ideas! Why not add some more?";
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

  ideasMasterContainer.on("keyup", ".editable-title", function (key) {
    if (key.which === 13) {
      var titleText = $(this).closest("h3").text();
      var id = $(this).closest(".each-idea-container").attr("id");
      ideaManager.findID(id).editTitleOfIdea(titleText);
    }
  });

  ideasMasterContainer.on("click", ".button-to-delete-idea", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    ideaManager.remove(id);
  } );

  ideasMasterContainer.on("click", ".upvote", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    ideaManager.findID(id).upvoteIdea();
  } );

  ideasMasterContainer.on("click", ".downvote", function () {
    var id = $(this).closest(".each-idea-container").attr("id");
    ideaManager.findID(id).downvoteIdea();
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
  ideaManager.checkIfClear();

}); //end of jQuery body
