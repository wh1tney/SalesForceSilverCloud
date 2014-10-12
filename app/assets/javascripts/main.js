$(function(){
	$('.signup').on('click', function(event){
		$('.signup_form').addClass('active');
		$('.signin_form').removeClass('active');
	});

	$('.signin').on('click', function(event){
		$('.signup_form').removeClass('active');
		$('.signin_form').addClass('active');
	});

	$('.menu-link').bigSlide();

	var listDetails = $('.list-detail');

	listDetails.on('click', function(event){
		event.preventDefault();
		$(this).closest('#list-view').addClass('expander');
		listDetails.hide();
		$(this).show();
	})
})