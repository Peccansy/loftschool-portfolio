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
	}

	document.querySelector('.wrapper').addEventListener('wheel', function(e) {
		e.preventDefault();

		if ($('.person__popup').is('.person__popup_open')||$('.order__modal').is('.order__modal_open')) return false  // отключаем прокрутку если открыт попап

			activeSection = sections.filter('.section_active');
		if (!scroll) {

			scroll =  true;
			if (e.deltaY > 0) {
				//вниз				
				screen = activeSection.next().index();
				if(screen === -1) screen = sections.length - 1;								
			}

			if (e.deltaY < 0) {
				//вверх	
				screen = activeSection.prev().index();
				if(screen === -1) screen = 0;						
			}						
			scrollSection(screen);

			setTimeout(function() { 
				scroll = false; 				
			}, 1200);	
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

	//accordeon
	var accordOpen = function (itemClick, itemClass) {
		var container = itemClick.closest('.'+itemClass+'__item');
		var open = itemClass + '__item_open';
		if(container.hasClass(open)) {
			container.removeClass(open);
			return false;
		}
		container.siblings().removeClass(open);
		container.addClass(open);
	}
	$('.team-accord__trigger').on('click', function(){
		accordOpen($(this), 'team-accord');
	});

	$('.menu-accord__trigger').on('click', function(){		
		accordOpen($(this), 'menu-accord');
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
			if (itemIndex === -1) itemIndex = sliderItems.length - 1;			
		}

		if(clickedBtn.is('.slider__btn_next')) {				
			itemIndex = activeItem.next().index();				
			if (itemIndex === -1) itemIndex = 0;
		}

		if(itemIndex >= 0) slide(itemIndex);
	});

	//popUps	
	function closePopup(container, closeBtn, itemClass) {
		$(container).on('click', function(e){			
			if (container.has(e.target).length === 0){
				container.removeClass(itemClass+'_open');
			}
		});
		$(closeBtn).on('click', function(e){
			e.preventDefault();
			container.removeClass(itemClass+'_open');
		});
	}
	$('.person__btn').on('click', function(){		
		var btn = $(this);
		var item = btn.closest('.person__item');
		var popUp = item.find('.person__popup');
		var closeBtn =	popUp.find('.person__popup-close');	
		popUp.addClass('person__popup_open');
		closePopup(popUp, closeBtn, 'person__popup');
	});

	//MASk 
	$('#phone').inputmask("+7 (999) 999-99-99"); 


	//MAILER
	var sendForm = function(){
		var order = $('.order__form-tag').serialize();		
		$.ajax({
			type: 'POST',
			url: 'order.php',
			data: order,
			success: function(data) {
				$('.order__modal').addClass('order__modal_open');				
			}
		})
		closePopup($('.order__modal'),$('.order__modal-btn'), 'order__modal');
	}
	$('.order__form-tag').on('submit', function(e){
		sendForm();
		return false;
	});
	
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
			iconImageHref: 'img/icons/map-marker.svg',            
			iconImageSize: [50, 50],            
			iconImageOffset: [-3, -42]
		});  
		var restoraunt2 = new ymaps.Placemark([55.755920,37.614943], { 
			hintContent: 'Ресторан.', 
			balloonContent: 'EXAMPLE ADRESS'
		},{           
			iconLayout: 'default#image',            
			iconImageHref: 'img/icons/map-marker.svg',           
			iconImageSize: [50, 50],           
			iconImageOffset: [-3, -42]
		});    
		var restoraunt3 = new ymaps.Placemark([55.756646,37.659017], { 
			hintContent: 'Ресторан.', 
			balloonContent: 'EXAMPLE ADRESS'
		},{           
			iconLayout: 'default#image',            
			iconImageHref: 'img/icons/map-marker.svg',            
			iconImageSize: [50, 50],           
			iconImageOffset: [-3, -42]
		});    
		var restoraunt4 = new ymaps.Placemark([55.761922,37.623912], { 
			hintContent: 'Ресторан.', 
			balloonContent: 'EXAMPLE ADRESS'
		},{           
			iconLayout: 'default#image',           
			iconImageHref: 'img/icons/map-marker.svg',           
			iconImageSize: [50, 50],            
			iconImageOffset: [-3, -42]
		});        	
		myMap.geoObjects.add(restoraunt1);    
		myMap.geoObjects.add(restoraunt2);    
		myMap.geoObjects.add(restoraunt3);    
		myMap.geoObjects.add(restoraunt4);    
	}

});