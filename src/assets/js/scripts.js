$(document).ready(function () {
  $(".menu-icon").click (function () {
    if( $(this).hasClass('active') ){
      $(this).removeClass('active');
      $("body").removeClass('menu-fullwidth');
    }
    else{
      $(this).addClass('active');
      $("body").addClass('menu-fullwidth');
    }
    return false;
  });

  $(".theme-light").click (function () {
      $("body").addClass('theme-light');
    return false;
  });
  $(".theme-dark").click (function () {
      $("body").removeClass('theme-light');
    return false;
  });

});