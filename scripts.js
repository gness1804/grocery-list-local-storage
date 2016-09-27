var titleInput = $("#title-input");
var bodyInput = $("#body-input");



$(document).ready(function () {

  function Idea(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
  }

  Idea.prototype.create = function () {

  };

}); //end of jQuery body
