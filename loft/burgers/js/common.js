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