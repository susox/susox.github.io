/*********************************************************
**														**
**	Only JS for triggering classes on click events:   	**
**														**
**  - Mobile menu (pushing away the main content area)	**
**  - Fade in/out submenus (horizontal menu)			**
**	- Slide down/up submenus (vertical menu)			**
**	- Hamburguer animation ;)	   						**
**														**
**********************************************************/

window.onload = function(){

	// Global elements
	var wrapper = document.getElementById("wrapper"),
		hamburger = document.getElementById("hamburger"),
		menu = document.getElementById("menu-ul"),
		submenus = document.querySelectorAll("#menu-ul ul"),
		board = document.getElementById("board");

	/********************************************
	**   START : Push effect for mobile menu   **
	*********************************************/

	hamburger.onclick = function(){
		toggleClass(wrapper, "pushed");
		toggleClass(hamburger, "is-active");
	}

	/* Reset classes in case of reaching the 
	breaking point. Mobile menu could be open 
	when this happens (portrait to landscape),
	leaving the main area pushed away. */

	if(matchMedia) {
		// get the MediaQueryList
		var mediaQuery = window.matchMedia("(min-width: 45.0625em)");
		mediaQuery.addListener(widthChange);
		widthChange(mediaQuery);
	}

	// Remove classes when media query changes
	function widthChange(mq){
		if(mq.matches) {
			// window width is at least 45.0625em
			removeClass(wrapper, "pushed");
			removeClass(hamburger, "is-active");
		}
	}

	/* End reset classes */

	/********************************************
	**    EDN : Push effect for mobile menu    **
	*********************************************/


	/********************************************
	**  START : Slide down-up for mobile menu  **
	*********************************************/

	// Adding just one evet listener (parent)
	menu.addEventListener("click", setSlideClasses, false);

	function setSlideClasses(e){
		var link = e.target;
		var submenu = link.parentNode.querySelector("ul");

		if(hasClass(link, "no-children")){
			closeAll();
		}else{
			//if it has a submenu (not leaf)
			if(submenu){
				if(hasClass(submenu, "slide-down")){
					closeSubmenu(submenu)
				}else{
					closeAll(); 
					openSubmenu(submenu);
				}
			}
		}

		e.stopPropagation();
	}	

	function closeAll(){
		var i = 0;
		for(i = 0; i < submenus.length; i++){
			removeClass(submenus[i], "slide-down");
			addClass(submenus[i], "slide-up");
		}
	}

	function closeSubmenu(el){
		removeClass(el, "slide-down");
		addClass(el, "slide-up");
	}

	function openSubmenu(el){
		removeClass(el, "slide-up");
		addClass(el, "slide-down");
	}

	/********************************************
	**   END : Slide down-up for mobile menu   **
	*********************************************/

	// Well just adding pins with random heights :P
	addRandomPins(board);

};

/*********************************************
**  Utility function to add 50 pins with    **
**  random heights (between 50 and 100px).  **
**********************************************/

function addRandomPins(board){
	var i = 0,
		height = 0
		blue = "#6191B0",
		green = "#86B73D",
		color = 0;
	
	for(i = 0; i < 50; i++){
		var pin = document.createElement("div");
		pin.className = "pin";
		height = Math.floor((Math.random() * 100) + 50);
		pin.style.height = height+"px";
		color = Math.round(Math.random());
		color = (color > 0) ? "#6191B0" : "#86B73D";
		pin.style.background = color;
		board.appendChild(pin);
	}
}

/******************************************
**  Utility functions to handle classes  **
**  (due to the only JS requirement).    **
*******************************************/

function hasClass(el, name){
	/* Starts with space or is the start
	 of the string + class name + ends with
	 space or is the end of the string */

	var re = new RegExp("(\\s|^)"+name+"(\\s|$)", "g");
	return re.test(el.className);
}

function addClass(el, name){
	if(!hasClass(el, name)){
		/* If the element has a class append
		space to separate the new one */

		el.className += (el.className ? ' ' : '') + name;
	}
}

function removeClass(el, name){
	if(hasClass(el, name)){
		/* Starts with space or it is the start
		of the string + class name + ends with space 
		or it is the end of the string */

		var re = new RegExp("(\\s|^)"+name+"(\\s|$)", "g");
		el.className = el.className.replace(re,' ').trim();
	}
}

function toggleClass(el, name){
	hasClass(el, name) ? removeClass(el, name) : addClass(el, name);
}