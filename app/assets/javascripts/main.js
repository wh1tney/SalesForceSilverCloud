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


	$('.locate-clients').on('click', function(){
		var offsetPosition = $('#map').offset();
		$('html, body').animate({
		    scrollTop: offsetPosition.top
		}, 500);
	})

	var listDetails = $('.list-detail');
	var back = $('.back');

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

		that.find('.back')
		.addClass('expander');

		that.find('.business-name')
		.addClass('expander');

		that.find('.address-section')
		.addClass('expander');

		that.find('.expanded-details-wrapper')
		.addClass('expander');

		that.find('.expanded-details')
		.addClass('expander');

	});

	back.on('click', function(event){
		// Get a reference to listView
		var listView = $(this).closest('#list-view');
		var listDetail = $(this).closest('.list-detail');

		setTimeout(function(){
			// minimize list view back to original size
			listView.removeClass('expander');
			// Reshow all the divs
			listDetails.show();

			listDetail.find('.rank')
			.removeClass('expander');

			listDetail.find('.rank img')
			.removeClass('expander');

			listDetail.find('.back')
			.removeClass('expander');

			listDetail.find('.business-name')
			.removeClass('expander');

			listDetail.find('.address-section')
			.removeClass('expander');

			listDetail.find('.expanded-details-wrapper')
			.removeClass('expander');

			listDetail.find('.expanded-details')
			.removeClass('expander');
		});
		
	});
})