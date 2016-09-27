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
    console.log("hi");
  };

  submitButton.on("click", function (event) {
    event.preventDefault();
    var idea = new Idea();
    idea.create();
  });

}); //end of jQuery body
