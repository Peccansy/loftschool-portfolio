window.onload = function () {
	var target,
	items,
	parent;

	triggers = document.querySelectorAll('.team-accord__trigger');
	items = document.querySelectorAll('.team-accord__item');	
	console.log(triggers);
	for(var trigger of triggers) {
		console.log(trigger);
		trigger.onclick = function (event) {		
			parent = this.trigger.closest('.team-accord__item');				
			parent.classList.add('team-accord__item_open');
			return false;
		}
	};
}