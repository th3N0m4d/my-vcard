/*
	Name: impressivCard
	Description: Responsive HTML5 vCard
	Version: 2.0.0
*/


// DOCUMENT READY
$(function() {

	// ------------------------------
	// NAV MENU: highlight current page
	var path = window.location.pathname.replace(/\/$/, '');
	$('#header nav ul a').each(function() {
		var href = $(this).attr('href').replace(/\/$/, '');
		if (href === path) {
			$(this).parent().addClass('current-menu-item');
		}
	});
	// ------------------------------


	// ------------------------------
	// MOBILE NAV MENU - SELECT LIST
	var mainNavigation = $('#header nav ul').clone();
	$('#header nav').prepend('<select class="mobile-nav"></select>');
	var selectMenu = $('select.mobile-nav');

	$(mainNavigation).children('li').each(function() {
		var href = $(this).children('a').attr('href');
		var text = $(this).children('a').text();
		var selected = $(this).hasClass('current-menu-item') ? ' selected' : '';
		$(selectMenu).append('<option value="' + href + '"' + selected + '> ' + text + '</option>');
	});

	$(selectMenu).change(function() {
		window.location = this.options[this.selectedIndex].value;
	});
	// ------------------------------


	// ------------------------------
	// PORTFOLIO FILTERING : ISOTOPE
	var $container = $('#portfolio-items');
	if ($container.length) {
		$container.waitForImages(function() {
			$container.isotope({
				itemSelector: '.item',
				layoutMode: 'masonry'
			});
			$('#filters a').click(function() {
				var selector = $(this).attr('data-filter');
				$container.isotope({ filter: selector });
				$(this).parent().addClass('current').siblings().removeClass('current');
				return false;
			});
		}, null, true);
	}
	// ------------------------------


	// ------------------------------
	// LIGHTBOX
	$('.lightbox').each(function() {
		$(this).attr('rel', $(this).attr('data-lightbox-gallery'));
	});

	if ($("a[rel^='fancybox']").length) {
		$("a[rel^='fancybox']").fancybox({
			padding: 0,
			margin: 44,
			width: 640,
			height: 360,
			transitionIn: 'none',
			transitionOut: 'none',
			overlayColor: '#000',
			overlayOpacity: '.5',
			onStart: function() { showLoader(); },
			onComplete: function() {
				if ($(this).attr('href').indexOf("soundcloud.com") >= 0) {
					$('#fancybox-content').height(166);
				}
				hideLoader();
			},
			onCancel: function() { hideLoader(); }
		});
	}
	// ------------------------------


	setTimeout(function() { $(".video-wrap").fitVids(); }, 100);

});
// DOCUMENT READY


// ------------------------------
// AJAX LOADER
function showLoader() {
	$(".loader").show().spin({
		lines: 7,
		length: 1,
		width: 5,
		radius: 7,
		corners: 0,
		rotate: 41,
		color: '#fff',
		speed: 1.5,
		trail: 70,
		shadow: false,
		hwaccel: true,
		className: 'spinner',
		zIndex: 2e9,
		top: 10,
		left: 12
	});
}
function hideLoader() {
	$(".loader").spin(false).hide();
}
// ------------------------------
