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

	// // POPUPS
	// function popUp(e) {
	// 	e.preventDefault();	 	
	// 	var btn = this;
	// 	var popUp = btn.closest('.person__item').querySelector('.person__popup');
		
	// 	popUp.classList.toggle('person__popup_open');		
	// 	close(popUp.querySelector('.person__popup-close'),popUp);

	// }

	// function close(closeItem,container) {		
	// 	container.addEventListener('click', closeToggle);
	// 	function closeToggle(e) {

	// 		if(e.target == container || e.target == closeItem) { 
	// 			container.classList.toggle('person__popup_open');
	// 			container.removeEventListener('click', closeToggle);
	// 		} else {return}				

	// 	}
	// }	

	// var personButtons = document.querySelectorAll('.person__btn');	

	// for (var personButton of personButtons) {
	// 	personButton.addEventListener('click', popUp);
	// }

}



$(function () {
	var sections = $('.section'),
		onScreen = $('.content'),		
		scroll = false,
		activeSection,
		screen = 0;						

	var scrollSection = function (sectionEq) {
		var pos;
			
		pos = (sections.eq(sectionEq).index() * - 100) + '%';
		sections.eq(sectionEq).addClass('section_active').siblings().removeClass('section_active')
		onScreen.css({
			'transform' : 'translate3d(0, ' + pos + ',0)'
		});	

		$('.page-nav__item').eq(sectionEq)
						    .addClass('page-nav__item_active')
						    .siblings()
						    .removeClass('page-nav__item_active');

		setTimeout(function() { 
				scroll = false; 				
			}, 1200);			
	}

		document.querySelector('.wrapper').addEventListener('wheel', function(e) {
		e.preventDefault();

		if ($('.person__popup').is('.person__popup_open')) { return false } // отключаем прокрутку если открыт попап

		activeSection = sections.filter('.section_active');
		if (!scroll) {

			scroll =  true;
			if (e.deltaY > 0) {
				//вниз				
				screen = activeSection.next().index();
				if(screen == -1) screen = sections.length - 1;								
			}

			if (e.deltaY < 0) {
				//вверх	
				screen = activeSection.prev().index();
				if(screen == -1) screen = 0;						
			}	
			
			scrollSection(screen);
		}
		
	});

	$('.page-nav__link, .nav__link').on('click', function(e) {
		e.preventDefault();
	 	var href = parseInt($(this).attr('href'));
		scrollSection(href);
	});

	$('.hello__arrow').on('click', function() {
		scrollSection(1);
	});


	//SLIDER
	var sliderItems = $('.slider__item'),
		activeItem = sliderItems.filter('.slider__item_active'),
		container = sliderItems.closest('.slider__list'),
		itemIndex = 0;		
		var slide = function (slideEq) {
			var position;			
			position = slideEq * -100 + '%';			
			container.css({
				'transform':'translate3d('+ position +',0,0)'
			});

			sliderItems.eq(slideEq)
					  .addClass('slider__item_active')
					  .siblings()
					  .removeClass('slider__item_active');

			activeItem = sliderItems.filter('.slider__item_active')
		}

		$('.slider__btn').on('click', function(e){
			e.preventDefault();

			var clickedBtn = $(this);

			if(clickedBtn.is('.slider__btn_prev')) {				
				itemIndex = activeItem.prev().index();
				if (itemIndex == -1) itemIndex = sliderItems.length - 1;			
			}

			if(clickedBtn.is('.slider__btn_next')) {				
				itemIndex = activeItem.next().index();				
				if (itemIndex == -1) itemIndex = 0;
			}

			if(itemIndex >= 0) slide(itemIndex);
		});
	//popUps
	$('.person__btn').on('click', function(){
		var btn = $(this);
		var item = btn.closest('.person__item');
		var popUp = item.find('.person__popup');
		var closeIcon =	popUp.find('.person__popup-close');	
		popUp.addClass('person__popup_open');
		$(popUp).on('click', function(e){			
   			if (popUp.has(e.target).length === 0){
       			popUp.removeClass('person__popup_open');
       		}
		});
		$(closeIcon).on('click', function(){
			popUp.removeClass('person__popup_open');
		});
	});

	//MASk 
	$('#phone').inputmask("+7 (999) 999-99-99"); 

	//YAMAP
	ymaps.ready(init);
    var myMap,placemark;
    	

    function init(){     
        myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 14,
            controls:[]                  
        });        
        myMap.behaviors.disable('scrollZoom');

		

        var restoraunt1 = new ymaps.Placemark([55.76, 37.64], { 
        		hintContent: 'Ресторан.', 
        		balloonContent: 'EXAMPLE ADRESS'
        	},{           
            iconLayout: 'default#image',            
            iconImageHref: '../img/icons/map-marker.svg',            
            iconImageSize: [50, 50],            
            iconImageOffset: [-3, -42]
        });  
        var restoraunt2 = new ymaps.Placemark([55.755920,37.614943], { 
        		hintContent: 'Ресторан.', 
        		balloonContent: 'EXAMPLE ADRESS'
        	},{           
            iconLayout: 'default#image',            
            iconImageHref: '../img/icons/map-marker.svg',           
            iconImageSize: [50, 50],           
            iconImageOffset: [-3, -42]
        });    
        var restoraunt3 = new ymaps.Placemark([55.756646,37.659017], { 
        		hintContent: 'Ресторан.', 
        		balloonContent: 'EXAMPLE ADRESS'
        	},{           
            iconLayout: 'default#image',            
            iconImageHref: '../img/icons/map-marker.svg',            
            iconImageSize: [50, 50],           
            iconImageOffset: [-3, -42]
        });    
        var restoraunt4 = new ymaps.Placemark([55.761922,37.623912], { 
        		hintContent: 'Ресторан.', 
        		balloonContent: 'EXAMPLE ADRESS'
        	},{      		
            
            iconLayout: 'default#image',           
            iconImageHref: '../img/icons/map-marker.svg',           
            iconImageSize: [50, 50],            
            iconImageOffset: [-3, -42]
        });        	
        myMap.geoObjects.add(restoraunt1);    
        myMap.geoObjects.add(restoraunt2);    
        myMap.geoObjects.add(restoraunt3);    
        myMap.geoObjects.add(restoraunt4);    
    }

});