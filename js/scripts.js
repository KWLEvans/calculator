//Back-end
var operators = {
  add : {
    perform: function(num1, num2) {
      return parseFloat(num1) + parseFloat(num2);
    },
    stringValue: " + "
  },

  subtract : {
    perform: function(num1, num2) {
      return parseFloat(num1) - parseFloat(num2);
    },
    stringValue: " - "
  },

  multiply : {
    perform: function(num1, num2) {
      return parseFloat(num1) * parseFloat(num2);
    },
    stringValue: " × "
  },

  divide : {
    perform: function(num1, num2) {
      return parseFloat(num1) / parseFloat(num2);
    },
    stringValue: " ÷ "
  }
}

//Front-end

$(function() {
  var full_equation = "";
  var current_screen = "";
  var current_operator = "";
  var last_screen = "";
  var overwrite = false;
  var just_operated = false;
  var equals_operated = false;
  var equals_repeated;

  function setScreens() {
    $("#main-screen").val(current_screen);
    $("#full-function").val(full_equation);
  }


  function numberSubmit(id) {
    if (overwrite) {
      current_screen = "";
      overwrite = false;
    }
    full_equation += id;
    current_screen += id;
    just_operated = false;
    equals_operated = false;
    setScreens();
  }

  function performOperation(id, nextId) {
    current_screen = operators[id].perform(last_screen, current_screen);
    last_screen = current_screen;
    current_operator = nextId;
    just_operated = true;
    overwrite = true;
    equals_operated = false;
  }

  function operatorSubmit(id) {
    if (just_operated) {
      current_operator = id;
      full_equation = full_equation.slice(0, -3) + operators[id].stringValue;
      setScreens();
    }
    else if (last_screen === "")
    {
      last_screen = current_screen;
      current_operator = id;
      overwrite = true;
      just_operated = true;
      equals_operated = false;
      full_equation += operators[id].stringValue;
      setScreens();
    }
    else
    {
      performOperation(current_operator, id);
      full_equation += operators[id].stringValue;
      setScreens();
    }
  }

  var submitFunction = {
    screenClear: function() {
      var screenLength = full_equation.length - 1;
      if (full_equation[screenLength] === " ") {
        current_operator = "";
        full_equation = full_equation.slice(0, -3);
        last_screen = "";
        overwrite = false;
        just_operated = false;
      } else {
        full_equation = full_equation.slice(0, -current_screen.length);
        current_screen = "";
        just_operated = true;
      }
      equals_operated = false;
      setScreens();
    },
    clearAll: function() {
      full_equation = "";
      current_screen = "";
      current_operator = "";
      last_screen = "";
      overwrite = false;
      just_operated = false;
      equals_operated = false;
      setScreens();
    },
    deleteCharacter: function() {
      if (full_equation.length > 0 && current_screen.length > 0) {
        if (!just_operated) {
          full_equation = full_equation.slice(0, -1);
          current_screen= current_screen.slice(0, -1);
        }
          setScreens();
      }
    },
    plusMinus: function() {
      if (!just_operated) {
        if (current_screen[0] != "-") {
          full_equation = full_equation.slice(0, -(current_screen.length));
          current_screen = "-" + current_screen;
          full_equation += current_screen;
        } else {
          full_equation = full_equation.slice(0, -(current_screen.length));
          current_screen = current_screen.slice(0, 2);
          full_equation += current_screen;
        }
        setScreens();
      }
    },
    dot: function() {
      if (!/\./.test(current_screen)) {
        if (overwrite || current_screen === "") {
          current_screen = "0.";
          overwrite = false;
        } else {
          current_screen += ".";
        }
        full_equation += ".";
        just_operated = false;
        equals_operated = false;
        setScreens();
      }
    },
    equals: function() {
      if (!just_operated || equals_operated) {
        if (!just_operated) {
          equals_repeated = current_screen;
          current_screen = operators[current_operator].perform(last_screen, current_screen);
        } else {
          current_screen = operators[current_operator].perform(equals_repeated, current_screen);
          full_equation += operators[current_operator].stringValue + " " + equals_repeated;
        }
        just_operated = true;
        overwrite = true;
        equals_operated = true;
        setScreens();
      }
    }
  }

// Submit event

  $(".calc-button").click(function() {
    $(this).submit();
  });

  $(".calc-button").submit(function(event) {
    var id = $(this).attr("id");

    if ($(this).hasClass("number-button")) {
      numberSubmit(id);
    } else if ($(this).hasClass("operator")) {
      operatorSubmit(id);
    } else {
      submitFunction[id]();
    }

    event.preventDefault();
  });
});
