$(document).ready(function () {
  var titleInput = $("#title-input");
  var bodyInput = $("#body-input");
  var submitButton = $("#submit-button");
  var ideasMasterContainer = $("#ideas-master-container");

  function Idea(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
  }

  var ideaManager = {

    ideas: [],


  }; // end of ideaManager

  submitButton.on("click", function () {
    var newTitle = titleInput.val();
    var newBody = bodyInput.val();
    alert(newBody);
  });

}); //end of jQuery body
