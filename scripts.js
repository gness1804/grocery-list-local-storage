$(document).ready(function () {
  var titleInput = $("#title-input");
  var bodyInput = $("#body-input");
  var submitButton = $("#submit-button");


  function Idea(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
  }

  Idea.prototype.create = function () {

  };

  submitButton.on("click", function (event) {
    event.preventDefault();
    var newTitle = titleInput.val();
    var newBody = bodyInput.val();
    var idea = new Idea(newTitle, newBody);
    console.log(idea);
  });

}); //end of jQuery body
