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

    add: function (newTitle, newBody) {
      this.ideas.push(new Idea(newTitle, newBody));
      this.store();
    } // end of add


  }; // end of ideaManager

  submitButton.on("click", function () {
    var newTitle = titleInput.val();
    var newBody = bodyInput.val();
    ideaManager.add(newTitle, newBody);
  });

}); //end of jQuery body
