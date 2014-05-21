$(function() {

  $("a.btn-page-content").click(function(e){
    e.preventDefault();
    $("#header-wrapper").toggleClass("up");
  });

  cbpBGSlideshow.init();

});
