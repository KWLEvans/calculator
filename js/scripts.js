//Back-end

var operators = {
  // clear: {
  //   perform: clearScreen()
  // }
  // clear-all:
  // deleteCharacter:
  // divide:
  // multiply:
  // subtract:
  // add:
  // plus-minus:
  // dot:
  // equals:
}


//Front-end

$(function() {
  var full_equation = "";
  var current_screen = "";
  var current_operator = "";

  function setScreens() {
    $("#main-screen").val(current_screen);
    $("#full-function").val(full_equation);
  }

//Requires operator selection object
  function operate(value) {
    var operator;
    current_operator = operator;
    current_screen = "";
    full_equation +=

    setScreens();
  }

  function clearScreen() {
    full_equation = full_equation.slice(0, -(current_screen.length));
    current_screen = "";
    setScreens();
  }

  function clearAll() {
    full_equation = "";
    current_screen = "";
    current_operator = "";
    $("#main-screen").text("");
    $("#full-function").text("");
  }

  function deleteCharacter() {
    if (full_equation.length > 0 && current_screen.lenth > 0) {
      full_equation = full_equation.slice(0, -1);
      current_screen= current_screen.slice(0, -1);
      setScreens();
    }
  }

  $(".calc-button").click(function() {
    $(this).submit();
  });

  $(".calc-button").submit(function(event) {
    var value = $(this).attr("id");

    if ($(this).hasClass("number-button")) {
      full_equation += value;
      current_screen += value;
      setScreens();
    }
    else {
      operators[value].perform();
    }

    event.preventDefault();
  });
});
