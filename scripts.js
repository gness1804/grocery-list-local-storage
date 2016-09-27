$(document).ready(function () {
  var titleInput = $("#title-input");
  var bodyInput = $("#body-input");
  var submitButton = $("#submit-button");

  var ideas = [];


  function Idea(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
  }

  Idea.prototype.add = function () {
    console.log(this.title);
  };

  function createIdea(newTitle, newBody) {
    var idea = new Idea(newTitle, newBody);
    idea.add();
  }

  submitButton.on("click", function (event) {
    event.preventDefault();
    var newTitle = titleInput.val();
    var newBody = bodyInput.val();
    createIdea(newTitle, newBody);

  });

}); //end of jQuery body
