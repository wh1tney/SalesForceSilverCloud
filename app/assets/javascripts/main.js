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

		that.find('.business-name')
		.addClass('expander');

		that.find('.address-section')
		.addClass('expander');

		that.find('.expanded-details-wrapper')
		.addClass('expander');

		that.find('.expanded-details')
		.addClass('expander');

	})
});

$(document).ready(function() {
  $('.clients-list').hide();

  $('.locate-clients').on('click', function () {
    $('.clients-list').slideDown(600)
  });

  $('.industry-filter a').on('click', function () {
    var industry = $(this).text().split(' ')[0];
    $('.list-detail').each(function () {
      if ($(this).is('.' + industry)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
