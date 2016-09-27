$(document).ready(function () {
  var titleInput = $("#title-input");
  var bodyInput = $("#body-input");
  var submitButton = $("#submit-button");
  submitButton.on("click", function (event) {
    event.preventDefault();
    alert('hi');
  });

  function Idea(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
  }

  Idea.prototype.create = function () {

  };

}); //end of jQuery body
