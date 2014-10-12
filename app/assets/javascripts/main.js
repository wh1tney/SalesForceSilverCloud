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
		// Adding expander classes to specific divs
		event.preventDefault();
		var that = $(this);
		// expand our list-view to cover the entire page
		that.closest('#list-view').addClass('expander');
		
		// Only allow the clicked div to show
		listDetails.hide();
		that.show();

		// Animation of our list-detail
		that.find('.rank')
		.addClass('expander');

		that.find('.rank img')
		.addClass('expander');


	})
})