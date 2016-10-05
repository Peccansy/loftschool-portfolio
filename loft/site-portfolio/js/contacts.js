$(document).ready(function() {
	var target=$('.contacts__trigger');
	var contacts=$('.contacts__dropdown');	
	target.click(function(){
		target=$(this);
		if(!target.is('.contacts__trigger_active')){
			target.addClass('contacts__trigger_active');
			contacts.addClass('contacts__dropdown_triggered');
		}else{
			target.removeClass('contacts__trigger_active');
			contacts.removeClass('contacts__dropdown_triggered');
		}
	});
});