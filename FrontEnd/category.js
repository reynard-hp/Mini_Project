$(document).ready(function () {
  $(".add-button").click(function (e) {
    e.stopPropagation();
    $(".add-category").show();
  });
  
  $(".close-button").click(function () {
    $(".pop-up-container").hide();
  });

  $(window).click(function () {
    $(".pop-up-container").hide();
  });

  // Prevent clicks inside the pop-up containers from closing them
  $(".pop-up-container").click(function (e) {
    e.stopPropagation();
  });
});

