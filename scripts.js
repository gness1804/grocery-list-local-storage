$(document).ready(function () {
  var titleInput = $("#title-input");
  var bodyInput = $("#body-input");
  var submitButton = $("#submit-button");
  var ideasMasterContainer = $("#ideas-master-container");

  var ideas = [];

  function Idea(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
  }

  function createNewIdea(newTitle, newBody) {
    ideas.push(new Idea(newTitle, newBody));
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }

  function renderIdeas() {
    ideas.forEach(function (idea) {
      var toHTML = (`
        <section>${idea.title}</section>
        `);
        // ideasMasterContainer.html(toHTML);
        ideasMasterContainer.prepend(toHTML);
    }); // end of forEach
  }

  submitButton.on("click", function (event) {
    event.preventDefault();
    var newTitle = titleInput.val();
    var newBody = bodyInput.val();
    createNewIdea(newTitle, newBody);
    renderIdeas();
    console.log(ideas);
  });

}); //end of jQuery body
