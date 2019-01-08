// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $submitBtn2 = $("#submit2");
var $submitBtn3 = $("#submit3");
var $exampleList = $("#example-list");
var $showBtn = $("#show-button");
var $showBtn2= $("#show-button2")

var example = {
  text: $exampleText.val().trim(),
  description: $exampleDescription.val().trim()
};

var queryurl = "https://www.google.com/maps/embed/v1/directions?origin=edgewater%20florida&destination=daytona%20beach&key=AIzaSyCOklIJPFWYtwRMRYl8bX6vitsT78kWXAk";
// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);
      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

$submitBtn2.on("click", handleFormSubmit);
$submitBtn2.on("click", showDiv);
$showBtn.on("click", showDiv);
$showBtn2.on("click",showDiv);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
console.log(showDiv)

function showDiv() {
  var exampleT = $exampleText.val().trim();
  var exampleD = $exampleDescription.val().trim()
  var querydiv = '<div id="mapdiv"><iframe width="466" height="456" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?origin=' + exampleT + '&destination=' + exampleD + '&key=AIzaSyCOklIJPFWYtwRMRYl8bX6vitsT78kWXAk"allowfullscreen></iframe></div>';
  $('#test2').html(querydiv);
}



