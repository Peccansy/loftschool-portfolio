$(document).ready(function() {

	function windowSize() {
		if ($(window).width()<=480){
			$('#scroll').perfectScrollbar('destroy');
		}else {
			$('#scroll').perfectScrollbar();	
		}
	}
	$(window).on('load resize',windowSize);	

	$('.hello').addClass('hello_anim')
});