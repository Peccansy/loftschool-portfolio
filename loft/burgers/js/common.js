window.onload = function () {
	var tiggers,
	items,
	parent;	
	function toggleItem (e) {
		e.preventDefault();		
		var clicked = this;			

		items = clicked.closest('.team-accord__list').getElementsByClassName('team-accord__item');
		parent = clicked.closest('.team-accord__item');	

		if(parent.classList.contains('team-accord__item_open')) { 

			parent.classList.toggle('team-accord__item_open');
			return	false

		} else {
			for (var item of items) {
				if (item.classList.contains('team-accord__item_open')) {
					item.classList.toggle('team-accord__item_open');
				}
			}	

			parent.classList.add('team-accord__item_open');	
		}		

	}
	
	triggers = document.querySelectorAll('.team-accord__trigger');	
	for(var trigger of triggers) {	

		trigger.addEventListener('click',toggleItem);

	};

	function toggleItem1 (e) {
		e.preventDefault();		
		var clicked = this;			

		items = clicked.closest('.menu-accord__list').getElementsByClassName('menu-accord__item');
		parent = clicked.closest('.menu-accord__item');	

		if(parent.classList.contains('menu-accord__item_open')) { 

			parent.classList.toggle('menu-accord__item_open');
			return	false

		} else {
			for (var item of items) {
				if (item.classList.contains('menu-accord__item_open')) {
					item.classList.toggle('menu-accord__item_open');
				}
			}	

			parent.classList.add('menu-accord__item_open');	
		}		

	}

	triggers1 = document.querySelectorAll('.menu-accord__trigger');	

	for(var trigger1 of triggers1) {	

		trigger1.addEventListener('click',toggleItem1);

	};

	// POPUPS
	function popUp(e) {
		e.preventDefault();
		
		var btn = this;
		var popUp = btn.closest('.person__item').querySelector('.person__popup');
		
		popUp.classList.toggle('person__popup_open');		
		close(popUp.querySelector('.person__popup-close'),popUp);

	}

	function close(closeItem,container) {		
		container.addEventListener('click', closeToggle);
		function closeToggle(e) {

			if(e.target == container || e.target == closeItem) { 
				container.classList.toggle('person__popup_open');
				container.removeEventListener('click', closeToggle);
			} else {return}				

		}
	}	

	var personButtons = document.querySelectorAll('.person__btn');	

	for (var personButton of personButtons) {
		personButton.addEventListener('click', popUp);
	}

}
$(function () {

	var sections = $('.section'),
		onScreen = $('.content'),		
		scroll = false,
		activeSection,
		screen = 0;	

	// FIXED NAV VARS
	var navItem = $('.page-nav__item'),
	 	itemLink = $('.page-nav__link'),
	 	parent;			

	var scrollSection = function (sectionEq) {
		var pos;

		if (screen < 0) { return false }

		pos = (sections.eq(sectionEq).index() * - 100) + '%';
		sections.eq(sectionEq).addClass('section_active').siblings().removeClass('section_active')
		onScreen.css({
			'transform' : 'translate3d(0, ' + pos + ',0)'
		});			
	}

	document.querySelector('.wrapper').addEventListener('wheel', function(e) {
		e.preventDefault();
		activeSection = sections.filter('.section_active');
		if (!scroll) {

			scroll =  true;
			if (e.deltaY > 0) {
				//вниз				
				screen = activeSection.next().index();							
				navItem.eq(screen).addClass('page-nav__item_active').siblings().removeClass('page-nav__item_active');				
			}

			if (e.deltaY < 0) {
				//вверх	
				screen = activeSection.prev().index();
				navItem.eq(screen).addClass('page-nav__item_active').siblings().removeClass('page-nav__item_active');	
			}	
			scrollSection(screen);
		}

	setTimeout(function() { scroll = false; }, 1200);		
	});

	navItem.on('click', itemLink, function() {
		parent = $(this).closest(navItem);
		parent.addClass('page-nav__item_active')
				.siblings()
				.removeClass('page-nav__item_active');
		screen = parent.index();
		scrollSection(screen);
	});

	$('.hello__arrow').on('click', function() {
		scrollSection(1);
	});
});