//Back-end

var add = function(number1, number2) {
return number1 + number2;
};

var subtract = function(number1, number2) {
return number1 - number2;
};

var multiply = function(number1, number2) {
return number1 * number2;
};

var divide = function(number1, number2) {
return number1 / number2;
};


//Front-end

$(function() {
  $("form#add").submit(function(event) {
    var number1 = parseInt($("input#add1").val());
    var number2 = parseInt($("input#add2").val());
    $("div#output").text(add(number1, number2));

    event.preventDefault();
  });

  $("form#subtract").submit(function(event) {
    var number1 = parseInt($("input#subtract1").val());
    var number2 = parseInt($("input#subtract2").val());
    $("div#output").text(subtract(number1, number2));

    event.preventDefault();
  });

  $("form#multiply").submit(function(event) {
    var number1 = parseInt($("input#multiply1").val());
    var number2 = parseInt($("input#multiply2").val());
    $("div#output").text(multiply(number1, number2));

    event.preventDefault();
  });

  $("form#divide").submit(function(event) {
    var number1 = parseInt($("input#divide1").val());
    var number2 = parseInt($("input#divide2").val());
    $("div#output").text(divide(number1, number2));

    event.preventDefault();
  });
});
