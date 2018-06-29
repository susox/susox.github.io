/********************************************************************
**																   **
**	Adapted from Ben Holland:  http://stackoverflow.com/a/7128902  **
**                                                                 **
**	- Now with fluid pin widths that fill their columns,		   **
**	  i.e.: (no fix widths for pins),		   					   **
**  - Mimics behavior of task 1 (css implementation), similar	   **
**	  breakpoints and number of columns,						   **
**  - Adapts columns's width if a scrollbar is present,			   **
**	- Track the highest column to set the board's height.    	   **
**																   **
*********************************************************************/

$(window).load(function() {
    loadPins();
});

$(window).on('resize', function(){
	loadPins();	
});

var colCount = 0,
	windowWidth = $("#board").width(),
	colWidth = 0,
	margin = 20,
	spaceLeft = 0,
	pins = [],
	scrollBarWidth = 0;

function loadPins() {
	windowWidth = $("#board").width();
	scrollBarWidth = getScrollBarWidth()+1;
	
	/* Hack to mimic the column responsive behavior of 
	the CSS implementation (task 1): 1, 2 and 4 cols and
	the way how pins' width fill their columns.  */

	if(windowWidth < 650){
		colWidth = Math.floor(windowWidth);
	}else if(windowWidth <= 1150 && windowWidth >= 650){
		colWidth = Math.floor((windowWidth/2)-margin/2);
		colWidth = colWidth - scrollBarWidth/2;
	}else{
		colWidth = Math.floor((windowWidth/4)-margin/2-margin/4);
		colWidth = colWidth - scrollBarWidth/2 + scrollBarWidth/4;
	}

	pins = [];

	colCount = Math.floor(windowWidth/(colWidth+margin/2));
	colCount = colCount == 0 ? 1 : colCount;
	
	var i = 0;
	for(i = 0; i < colCount; i++){
		pins.push(margin);
	}

	setPins();
}

function setPins() {
	var accumulatedHeight = 0, 
		finalHeight = 0;

	$('.pin').each(function(){
		var min = Array.min(pins);
		var index = $.inArray(min, pins);
		var left = (index*(colWidth+margin));

		$(this).css({
				'left':left+'px',
				'top':min+'px',
				'width':colWidth+'px'
			});

		// Keep track of the highest column to set boards' height
		accumulatedHeight = min+$(this).outerHeight()+margin;
		pins[index] = accumulatedHeight;
		finalHeight = accumulatedHeight > finalHeight ? accumulatedHeight : finalHeight;
	});	

	/* Update the height of the board (to scroll until the right position),
	pins are position absolute so the board container won't grow auto.      */
	$("#board").css({"height":finalHeight+"px"});
}

// Function to get the Min value in Array 
Array.min = function(array) {
    return Math.min.apply(Math, array);
};

// Taken from Josh Bambrick - http://stackoverflow.com/a/19015262
function getScrollBarWidth(){
    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
};