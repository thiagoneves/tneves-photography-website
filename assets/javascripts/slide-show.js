var SlideShow = (function() {

	var $slideshow = $("#cbp-bislideshow"),
		$items = $slideshow.children("li"), itemsCount = $items.length,
		$controls = $("#cbp-bicontrols"),
			navigation = {
				$navPrev : $controls.find("span.cbp-biprev"),
				$navNext : $controls.find("span.cbp-binext")
		},
		current = 0;

	function init( config ) {

		if(itemsCount == 1) {
			hideControls();
		}

		$slideshow.imagesLoaded( function() {

			if(Modernizr.backgroundsize) {
				$items.each( function() {
					var $item = $(this);
					$item.css("background-position", $item.find( "img" ).data("focus"));
					$item.css("background-image", "url(" + $item.find( "img" ).attr( "src" ) + ")");
				});
			} else {
				$slideshow.find("img").show();
			}
			
			$items.eq(current).css("opacity", 1);

			initEvents();

		});

	}

	function initEvents() {

		navigation.$navPrev.on("click", function() {
			navigate( "prev" );
		});

		navigation.$navNext.on("click", function() {
			navigate( "next" );
		});

		$(document).keyup(function(e){
			if (e.keyCode == 39) {
			  navigate("next");
			}

		  if (e.keyCode == 37) {
				navigate("prev");
			}
		});

	}

	function navigate(direction) {

		var $oldItem = $items.eq( current );

		if( direction === "next" ) {
			current = current < itemsCount - 1 ? ++current : 0;
		} else if( direction === "prev" ) {
			current = current > 0 ? --current : itemsCount - 1;
		}

		var $newItem = $items.eq( current );

		$oldItem.css("opacity", 0);
		$newItem.css("opacity", 1);

	}

	function showImage(position){
		$items.eq(current).css("opacity", 0);
		$items.eq(position).css("opacity", 1);
		current = position;
	}

	function hideControls(){
		navigation.$navPrev.hide();
		navigation.$navNext.hide();
	}

	return { 
		init : init,
		showImage : showImage
	};

})();
