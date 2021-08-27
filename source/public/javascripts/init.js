$(function () {
	var animationSpeed = 250,
		subMenuSelector = '.sub-menu';
	$('.sidebar-navigation').on('click', 'li a', function (e) {
		var $this = $(this);
		var checkElement = $this.next();
		if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
			checkElement.slideUp(animationSpeed, function () {
				checkElement.removeClass('open');
			});
			checkElement.parent('li').removeClass('active');
		}
		//If the menu is not visible
		else if (checkElement.is(subMenuSelector) && !checkElement.is(':visible')) {
			//Get the parent menu 
			var parent = $this.parents('ul').first();
			//Close all open menus within the parent
			var ul = parent.find('ul:visible').slideUp(animationSpeed);
			//Remove the open class from the parent
			ul.removeClass('open'); 
			//Get the parent li
			var parent_li = $this.parent('li');

			//Open the target menu and add the open class
			checkElement.slideDown(animationSpeed, function () {
				//Add the class active to the parent li
				checkElement.addClass('open');
				parent.find('li.active').removeClass('active');
				parent_li.addClass('active');
			});
		}
		//if this isn't a link, prevent the page from being redirected
		if (checkElement.is(subMenuSelector)) {
			e.preventDefault();
		}
	});

	$('[data-toggle="tooltip"]').tooltip();
	//var sddsdsdsd = document.getElementById('navbartopmain');
	//alert("document is ready");
	// set bootstrap-select version
	$('.btn-sidenav').sideNav({
		menuWidth: 290, // Default is 240
		//edge: 'right', // Choose the horizontal origin
		closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		draggable: true, // Choose whether you can drag to open on touch screens
	});

	// Move to top button appand in web layout
	$.icodetutsfrminput.init();

	$('body').prepend(
		"<div id='move-top' class='btn btn-theme hoverable move-top'><i class='fa fa-arrow-up'></i></div>"
	);
	var scrollTopBtn = 'html,body';
	/*Opera does a strange thing if we use 'html' and 'body' together*/
	if (navigator.userAgent.match(/opera/i)) {
		scrollTopBtn = 'html';
	}
	// show ,hide move top button button
	$('#move-top').hide();
	jQuery(window).scroll(function () {
		if ($(this).scrollTop() > 180) {
			$('#move-top').fadeIn();
		} else {
			$('#move-top').fadeOut();
		}
	});
	// scroll to top when click
	jQuery('#move-top').click(function (e) {
		jQuery(scrollTopBtn).animate(
			{
				scrollTop: 0,
			},
			{
				duration: 600,
			}
		);
		e.preventDefault();
	});

	var modalUniqueClass = '.modalLoop';
	$('.modalLoop').on('show.bs.modal', function (e) {
		var $element = $(this);
		var $uniques = $(modalUniqueClass + ':visible').not($(this));
		if ($uniques.length) {
			$uniques.modal('hide');
			$uniques.one('hidden.bs.modal', function (e) {
				$element.modal('show');
			});
			return false;
		}
	});
	$('.modalLoop').on('shown.bs.modal', function () {
		$(this).find('[autofocus]').focus();
	});

	// File Input Path

	$(document).on('change', '.form-file-group input[type="file"]', function () {
		var fileField = $(this).closest('.form-file-group');
		var fileinputpath = fileField.find('input.file-path');
		var files = $(this)[0].files;
		var filenames = [];
		for (var i = 0; i < files.length; i++) {
			filenames.push(files[i].name);
		}
		fileinputpath.val(filenames.join(', '));
		fileinputpath.trigger('change');
	});

	//
	$('.navbar-collapse,.sidebar-navigation')
		.find('a')
		.on('click', function (e) {
			// e.preventDefault();
			var section = $(this).data('href'),
				headerHeight = $('.siteNavbar').outerHeight();
			// section.parent().removeClass('active');
			$(this).parents().find('li').removeClass('active');
			$(this).parent().addClass('active');
			// alert(section);
			$('html, body').animate(
				{
					scrollTop: $(section).offset().top - headerHeight,
				},
				'slow'
			);
		});

	//


	$('.pickDate').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		dateFormat: 'dd-mm-yy',
		// minDate: new Date(2021, 1 - 1, 1),
		minDate: "-3y",
		maxDate: "+1m",
		showAnim: 'fadeIn',
		changeMonth: true,
		changeYear: true,
		// todayBtn: true,
		autoclose: true,
		// showButtonPanel: true,
		prevText: '<i class="fa fa-chevron-left"></i>',
		nextText: '<i class="fa fa-chevron-right"></i>',
		afterShow: function () {
			$('.ui-datepicker-prev')
				.remove()
				.append('<i class="fa fa-chevron-left icons"></i>');
			$('.ui-datepicker-next')
				.remove()
				.append('<i class="fa fa-chevron-right icons"></i>');
		},
	});

	$('.pickDate').attr('autocomplete', 'off');
	
});

$(window).on('scroll', function () {
	var nav_sections = $('section');
	var main_nav = $('.navbar-collapse,.sidebar-navigation');
	var cur_pos = $(this).scrollTop() + 200;
	nav_sections.each(function () {
		var top = $(this).offset().top,
			bottom = top + $(this).outerHeight();

		if (cur_pos >= top && cur_pos <= bottom) {
			if (cur_pos <= bottom) {
				main_nav.find('li').removeClass('active');
			}
			main_nav
				.find('a[href="#' + $(this).attr('id') + '"]')
				.parent('li')
				.addClass('active');
		}
		if (cur_pos < 300) {
			$(
				'.navbar-collapse ul:first li:first, .sidebar-navigation ul:first li:first'
			).addClass('active');
		}
	});
});

$(window).on('load resize', function () {
	// var windowsWidth = $(window).width();
	var windowsHeight = $(window).height();
	var navbarHeight = $('.siteNavbar').outerHeight();
	var footerHeight = $('.page-footer').outerHeight();

	console.log(windowsHeight, navbarHeight, footerHeight);

	$('.pages').css({
		minHeight: windowsHeight - (navbarHeight + footerHeight),
	});
});
