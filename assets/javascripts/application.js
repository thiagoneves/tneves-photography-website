$(function() {

	SlideShow.init();

	$("a.btn-page-content").click(function(e){
		e.preventDefault();
		toogleMenuContent();
	});

	$(".image-grid a").click(function(e){
		e.preventDefault();
		SlideShow.showImage($(this).index());
		toogleMenuContent();
	});

});

function toogleMenuContent() {
	$("#header-wrapper").toggleClass("up");
}