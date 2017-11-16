$(function() {
	// Initialize materialize select box
	$('select').material_select();

	// Initialize materialize carousel
	$('.carousel.carousel-slider').carousel({fullWidth: true});

	// Initialize materialize sideNav
	$('.sidenav-btn').sideNav();

	// Initialize materialize tooltip
	$('.tooltipped').tooltip({delay: 50, html: true});
	$('.tooltipped').tooltip('open');

	// Banner Select box width configuration
	$("#banner-area").on("click change", ".first-level .dropdown-select #dropwdown-options", function() {
		var text = $(this).parent().find(".selected").text();

		// For tablet and desktop screen
		if($(window).width() >= 768) {
			if(text == 'Select All') {
				$("#banner-area .first-level .input-field").css("width", "185px");
			}else if(text == 'car, ute or van') {
				$("#banner-area .first-level .input-field").css("width", "281px");
			}else if(text == 'boat') {
				$("#banner-area .first-level .input-field").css("width", "107px");
			}else if(text == 'caravans & RV') {
				$("#banner-area .first-level .input-field").css("width", "290px");
			}else if(text == 'commercial equipment') {
				$("#banner-area .first-level .input-field").css("width", "457px");
			}else if(text == 'other') {
				$("#banner-area .first-level .input-field").css("width", "120px");
			}
		}

		// For mobile screen
		if($(window).width() < 768) {
			if(text == 'car, ute or van') {
				$("#banner-area .first-level .input-field").css("width", "148px");
			}else if(text == 'boat') {
				$("#banner-area .first-level .input-field").css("width", "60px");
			}else if(text == 'caravans & RV') {
				$("#banner-area .first-level .input-field").css("width", "150px");
			}else if(text == 'commercial equipment') {
				$("#banner-area .first-level .input-field").css("width", "238px");
			}else if(text == 'other') {
				$("#banner-area .first-level .input-field").css("width", "66px");
			}
		}

		if($(window).width() >= 375 && $(window).width() <= 442) {
			if(text == 'commercial equipment') {
				$("#banner-area .select-wrapper").css("left", "-8px");
			}else {
				$("#banner-area .select-wrapper").css("left", "0");
				$("#banner-area .dropdown-content").css("left", "-50px !important");
			}
		}

		if($(window).width() >= 375 && $(window).width() <= 767) {
			if(text == 'commercial equipment') {
				$("#banner-area .input-field").css("width", "238px");
			}
		}
	});

	// Remove anchor default page up
	$("a").click(function() {
		if($(this).attr("href") == "#") {
			return false;
		}
	});

	// Replace social icon image on mouse enter event
	$('.social-ul li a img').mouseenter(function(){
		var src = $(this).attr('src');
		$(this).attr('src', src.replace('.png', '_ov.png'));
	});

	// Bring back the default social icon image on mouse leave event
	$('.social-ul li a img').mouseleave(function(){
		var src = $(this).attr('src');
		$(this).attr('src', src.replace('_ov.png', '.png'));
	});

	// Workarea content switching for mobile screen
	var $swithPos01 = $(".switch-pos1-sp");
	var $swithPos02 = $(".switch-pos2-sp");

	if($(window).width() <= 767) { // if mobile screen
		var contentToSwitch01 = $swithPos01.html();
		var contentToSwitch02 = $swithPos02.html();
		$swithPos01.html(contentToSwitch02);
		$swithPos02.html(contentToSwitch01);
	}

	// Change carousel active button
	window.changeCarousel = function () {
		console.log('ewewe')
		setTimeout(function() {
			var activeIndex = $("#work-carousel").find(".indicators .active").index() + 1;

			$(".step-ul li").removeClass("active").parent().find("li:nth-child("+activeIndex+")").addClass("active");
			$("#work-area .step-num-ul li a").removeClass("active").parents("ul").find(" li:nth-child("+activeIndex+") a").addClass("active");
		}, 700);
	}

	//Add click event to the indicator to call the changeCarousel() function
	$("#work-carousel .indicators li").click(changeCarousel);

	if($("#work-carousel").length) { // check if work-carousel exist
		// Add pan end event for mobile
		var myElement = document.getElementById('work-carousel');
		var mc = new Hammer(myElement);
		mc.on("panleft panright tap press, panend", function(ev) {
			if(ev.type == 'panend') {
				changeCarousel();
			}
		});
	}


	$(".step-num-ul li").click(function() {
		var index = $(this).index();
		$(this).parent().find("li a").removeClass("active"); // remove current active class
		$(this).find("a").addClass("active"); // add active class to the selected list
		$('#work-area .carousel').carousel('set', index);

		return false;
	});

	// Generate mark up for mobile sideNav
	var $mainNavHtml = $(".main-nav").html();
	var $topNavHtml = $(".top-nav").html();
	var $callEmailHtml = $(".call-email").html();
	$("#nav-mobile").append($mainNavHtml).append($topNavHtml);

	$($callEmailHtml).insertBefore("#nav-mobile");
	$("#nav-mobile .has-submenu").find("a").append("<i class='material-icons toggle-icon tiny'>expand_more</i>")
	// chevron_right

	// Use to programmatically hide the sidenav when nav-close was clicked
	$(".nav-close").click(function() {
		$(".side-nav").sideNav('hide');
		$(".call-email-block").hide();
	});

	$("#nav-mobile").on("click", ".toggle-icon", function() { // add click event for all the navbar li

		var href = $(this).parent().parent().find("a").attr("href");
		if($(window).width() <= 992) { // only trigger for mobile and tablet
			var $menuClass = $(this).parent().parent().attr("class");
			var $menuStatus = $(this).parent().parent().attr("data-status");

			if($menuClass == "has-submenu level1") { // 1st level menu
				if($menuStatus == "open") { // current status = open
					$(this).parent().parent().find(".ul-level1").slideUp(); // close first level
					$(this).parent().parent().find(".ul-level2").slideUp(); // close second level
				}else { // current status = close
					$(".has-submenu").removeAttr("data-status").find(".ul-level1").slideUp();
					$(this).parent().parent().find(".ul-level1").slideDown(); // open it
				}
			} else if($menuClass == "has-submenu level2") { // 2nd level menu
				if($menuStatus == "open") { // current status = open
					$(this).parent().parent().find(".ul-level2").slideUp(); // close it
				}else { // current status = close
					$(this).parent().parent().find(".ul-level2").slideDown(); // open it
				}
			}

			if($(this).parent().parent().attr("data-status") == "open") { // already open
				$(this).parent().parent().removeAttr("data-status");
			}else {
				$(this).parent().parent().attr("data-status", "open");
			}
		}

		// if(href != '#') { // redirect the page to the href url if href value is not equal to # (hash)
		// 	window.location.href = href;
		// }

		return false;
	});
	/* END SIDENAV SCRIPT */

	// Show Call and Email on SP
	$(".sidenav-btn").click(function() {
		$(".call-email-block").show();
	});

	// Footer change content on mobile screen
	if($(window).width() <= 767) {
		var footerContent = $(".change-pos-sp").html();
		$(".sp-content").prepend("<div class='footer-logo'>"+footerContent+"</div>");

		var footerLi03 = $(".footer-box li:nth-child(3)").html();
		var footerLi04 = $(".footer-box li:nth-child(4)").html();
		$(".footer-box ul").prepend("<li>"+footerLi03+"</li>").prepend("<li>"+footerLi04+"</li>");
		$(".footer-box li:nth-child(5), .footer-box li:nth-child(6)").remove();
	}

	$(".video-container").each(function(i) {
		var ytid = $(this).attr('data-embed')
		var source = 'https://img.youtube.com/vi/' + ytid + '/sddefault.jpg';    
		$(".videoThumbNail").attr("src",source);
		// Load the image asynchronously
		var img = $('<img />', { 
			class: 'img-responsive',
			src: source,
			alt: $(this).parent().find(".details .title").text()
		});
		$(this).on('click',function(){
			$(".vidPreview").addClass("d-none");
			var iFrame = $(this).children("iframe");
			iFrame.attr('src',iFrame.attr('src') + '?autoplay=1');
			var iClone = iFrame.clone();
			$(this).children("iframe").remove();
			$(this).append(iClone);
		});
	});

	// Selector and other things needed in slider
	var carouselCar = $('.slCarousel'),
		carouselItem = carouselCar.children('li'),
		carouselStep = $('#slider-sp #work-carousel-sp'),
		carouselStepItem = carouselStep.children('li'),
		carouselStar = $('.ia-carousel-sp'),
		carouselStarItem = $('.ia-carousel-sp').children('li'),
		slideOffset = 0,
		flagCounter = 1,
		stepNumber = 1,
		prevStep = 0,
		prevCar = 0,
		prevStar = 0;

	// Slider Main Controller
	var initSwipe = function(selector, children) {
		selector.hammer({
			direction: Hammer.DIRECTION_HORIZONTAL
		}).bind('panleft panright', function(e) {
			if(flagCounter === 1 && slideOffset >= 0) {
				if(selector.is(carouselStep)) {
					e.type === 'panleft' ? stepNumber++ : stepNumber--;
					stepNumber = stepNumber < 2 ? 1 : (stepNumber > 2 ? 3 : stepNumber);
					$('.step-num-ul li:nth-child('+ stepNumber +') a').addClass('active').parent().siblings().find('a').removeClass('active');
					$('.step-ul li:nth-child('+ stepNumber +')').addClass('active').siblings().removeClass('active');
					prevStep = (stepNumber - 1) * children.outerWidth(true, true);
					slideOffset = prevStep;
				} else if(selector.is(carouselCar)) {
					var limitation = children.outerWidth(true, true) * (children.length - 1);
					e.type === 'panleft' && prevCar != limitation ? prevCar += children.outerWidth(true, true) : (
						e.type === 'panright' && prevCar && (prevCar -= children.outerWidth(true, true))
					);
					slideOffset = prevCar;
				} else {
					var limitation = children.outerWidth(true, true) * (children.length - 1);
					e.type === 'panleft' && prevStar != limitation ? prevStar += children.outerWidth(true, true) : (
						e.type === 'panright' && prevStar && (prevStar -= children.outerWidth(true, true))
					);
					slideOffset = prevStar;
				}
				selector.animate({
					'left': '-'+ slideOffset +'px'
				}, 500, function() {
					flagCounter = 1;
				});
			}
			flagCounter++;
		});
	};

	// Handle event for the steps.
	$('.step-num-ul li a').click(function(e) {
		e.preventDefault();
		stepNumber = $(this).parent().index() + 1;
		slideOffset = (stepNumber - 1) * carouselStepItem.outerWidth(true, true);
		$('.step-ul li:nth-child('+ stepNumber +')').addClass('active').siblings().removeClass('active');
		carouselStep.animate({
			'left': '-'+ slideOffset +'px'
		}, 500);
	});

	// All Mobile Slider.
	var allMobileSlider = function () {
		initSwipe(carouselStep, carouselStepItem);
		initSwipe(carouselCar, carouselItem);
		initSwipe(carouselStar, carouselStarItem);
	};

	var allMobileSliderUnbind = function() {
		carouselCar.css('left', 0).hammer().unbind('panleft panright');
		carouselStep.unbind('panleft panright');
		carouselStar.unbind('panleft panright');
	};

	// Initialized if it is in mobile.
	if($(window).outerWidth(true, true) <= 767) {
		allMobileSlider();
	}

	// Swipe only apply in mobile version otherwise it will reset the default style and unbind hammer.
	$(window).resize(function() {
		var vw = $(this).outerWidth(true, true);
		return vw <= 767 ? allMobileSlider() : allMobileSliderUnbind();
	});

	$(".with-comma").keyup(function(event) {
		// skip for arrow keys
		if(event.which >= 37 && event.which <= 40){
			event.preventDefault();
		}
		var $this = $(this);
		var num = $this.val().replace(/,/gi, "");
		var num2 = num.split(/(?=(?:\d{3})+$)/).join(",");
		// the following line has been simplified. Revision history contains original.
		$this.val(num2);
	});

	// Remove non numeric input
	$(".number").keyup(function(e) {
		var inputVal = $(this).val();

		var validInput = inputVal.replace(/[^0-9\,/\.]/g, '');
		$(this).val(validInput);
	});

	// $(".dropdown-select").on("click", ".select-dropdown", function() {
	$(".dropdown-select").on("focus", ".select-dropdown", function() {
		$(".select-wrapper").attr("style", "z-index: 1 !important");
		$(this).parents(".dropdown-select").find(".select-wrapper").attr("style", "z-index: 998 !important");
	});

	$(".dropdown-select").on("blur", ".select-dropdown", function() {
		$(this).parents(".dropdown-select").find(".select-wrapper").attr("style", "z-index: 10 !important");
	});

	$('#btn-business').click(function(){
		$('#btn-business').removeClass();
		$('#btn-business').addClass('btn-cars-loan-active');
		$('#btn-personal').removeClass();
		$('#btn-personal').addClass('btn-cars-loan-inactive');
		$('.tabs-personal').css('display','none');
		$('.tabs-business').css('display','block');
	});

	$('#btn-personal').click(function(){
		$('#btn-personal').removeClass();
		$('#btn-personal').addClass('btn-cars-loan-active');
		$('#btn-business').removeClass();
		$('#btn-business').addClass('btn-cars-loan-inactive');
		$('.tabs-business').css('display','none');
		$('.tabs-personal').css('display','block');
	});

	// Car loan Calculator script
	$("#txt-borrow").focus(function() {
		$("#txt-borrow").val("");
	});

	$(".buy-area").on("click change",".dropdown-select #dropwdown-options", function() {
		var isFirstLevel = $(this).parents(".first-level").length;
		var isSecondLevel = $(this).parents(".second-level").length;
		var isThirdLevel = $(this).parents(".third-level").length;

		if(isFirstLevel) {
			$(".first-level .select-dropdown").attr('disabled', true).parents(".select-wrapper").addClass("disabled");
			$(".buy-area .second-level").fadeIn(1000);
			$(".buy-area .third-level").hide();
		}

		if(isSecondLevel) {
			$(".second-level .select-dropdown").attr('disabled', true).parents(".select-wrapper").addClass("disabled");
			$(".buy-area .third-level").fadeIn(1000);
		}

		if(isThirdLevel) {
			$(".third-level .select-dropdown").attr('disabled', true).parents(".select-wrapper").addClass("disabled");
			$(".buy-area .fourth-level").fadeIn(1000).css('margin-top', "20px");
		}
	});

	// For contact us page, banner contact info
	var contactInfo =  $("#contact-area .contact-block02").html();
	$("#contact-page .banner-section").append(contactInfo);

	$(document).click(function(e) {
		var t = $(e.target);
		if(t.is($('.input-area ul.dropdown-data-content li span')) || t.is($('i.material-icons'))) {
			return;
		}
		if(e.type === 'click' && $('ul.dropdown-data-content').is(':visible')) {
			// dynamicWidthInit(select, 35);
		}
		return $('.input-area ul.dropdown-data-content').removeClass('dropdown-data-focus');
	});

	// Add event listener to the icon
	$('.input-area .dropdown-dynamic-width i.material-icons').click(function() { 
		$(this).parent(".dropdown-data").find(".dropdown-data-content").addClass("dropdown-data-focus");
	});

	// Show dropdown.
	$('.input-area .select-dropdown').focus(function() {
		$(this).parent(".dropdown-data").find(".dropdown-data-content").addClass("dropdown-data-focus");
	});

	// Format of number, change if needed.
	$('.input-area .number').blur(function() {
		var self = $(this),
			currency = self.val();
		if(!isNaN(currency)) {
			return self.val(currency.replace(/\B(?=(\d{3})+(?!\d))/g, ', '));
		}
	});

	// Event for dropdown.
	$('.input-area ul.dropdown-data-content li').click(function() {
		defaultInputSize();
		var liVal = $(this).find("span").text(); // get the value of selected li
		$(this).parents(".custom-dropdown").find(".active-width").text(liVal); // set the value of selected li
		$(this).parent('ul').siblings('.select-dropdown')
		$(this).parents(".custom-dropdown").find(".select-dropdown").attr("value", liVal); // set the value of input
		if($(window).width() >= 768) { // for pc
			var inputWidth = $(this).parents(".custom-dropdown").find(".active-width").width() + 30; // get the value of input width + 50 for spacing
		}else {
			var inputWidth = $(this).parents(".custom-dropdown").find(".active-width").width() + 25; // get the value of input width + 50 for spacing
		}
		$(this).parents(".dropdown-data").attr("style", "width: "+inputWidth+"px"); // assign dynamic width to the input

		$(this).parent().find("li").removeAttr("selected");
		$(this).attr("selected", true);
		$(this).parent().removeClass("dropdown-data-focus"); // close the pop up select box
	});


	defaultInputSize();
	function defaultInputSize() {
		$(".select-dropdown").each(function() {
			var selectVal = $(this).attr("value");
			$(this).parents(".custom-dropdown").find(".active-width").text(selectVal);



			if($(window).width() >= 768) { // for pc
				var inputWidth = $(this).parents(".custom-dropdown").find(".active-width").width() + 20;
				var inputWidthForSelectBox = inputWidth + 100;
			}else {
				var inputWidth = $(this).parents(".custom-dropdown").find(".active-width").width() + 20;
				var inputWidthForSelectBox = inputWidth + 50;
			}

			$(this).parents(".dropdown-data").attr("style", "width: "+inputWidth+"px");
			$(this).parent(".dropdown-data").find(".dropdown-data-content").attr("style", "width: "+inputWidthForSelectBox+"px");
		});
	}

	// Car Loan Calculator, collapsing content
	$("#car-loan-page .calc-content01 input").keyup(function() {
		defaultInputSize();
		$(".calc-content02").fadeIn();
	});

	$(".calcu-dollar").click(function() {
		$(this).find(".input-error").hide();
		$(this).removeClass("has-error");
	});

	$("#car-loan-page .calc-content02 li").click(function() {
		defaultInputSize();
		$(".calc-content03").fadeIn();
	});

	$("#car-loan-page .calc-content03 input").keyup(function() {
		defaultInputSize();
		$(".calc-content04").fadeIn();
	});

	$("#car-loan-page .calc-content04 li").click(function() {
		$(".calc-content07, .submit-wrap, .calc-notes").fadeIn();
	});

	// Article pagination
	var noPerPage = 9; 
	var counter = 1;
	var maxNo = 20;

	function paginate() {
		$(".art-pagination-ul").find("li.active").attr("data-id", counter);
		$(".art-pagination-ul").find("li.active .page").text(counter);
	}

	$(".art-pagination-ul .prev").click(function() {
		counter--;
		if(counter <= 1) {
			counter = 1;
		}

		paginate();
	});

	$(".art-pagination-ul .next").click(function() {
		counter++;
		if(counter >= maxNo) {
			counter = 20;
		}

		paginate();
	});

	// Article dropdown script, a dummy content just to show the functionalities
	$('.dropdown-data-content li').click(function() {
		var carCount = 4;
		var loanCount = 5;
		var liContent = $(".art-ul").find("li").html();
		var inputVal = $(this).parents(".custom-dropdown").find(".select-dropdown").val();
		var liContentCar = "";
		   	liContentCar += '<li data-name="car">';
			liContentCar += '<a href="#">';
			liContentCar += '<img class="responsive-img" src="images/inter_img01.jpg">';
			liContentCar += '<div class="txtContent">';
			liContentCar += '<p class="listTitle">Car</p>';
			liContentCar += '<p class="bCaption">Which fuel type should I choose for my next car?</p>';
			liContentCar += '<p class="desc">Long gone are the days of simply choosing diesel over petrol; these days...</p>';
			liContentCar += '</div>';
			liContentCar += '</a>';
			liContentCar += '</li>';

			var liContentLoan = "";
		   	liContentCar += '<li data-name="car">';
			liContentCar += '<a href="#">';
			liContentCar += '<img class="responsive-img" src="images/inter_img01.jpg">';
			liContentCar += '<div class="txtContent">';
			liContentCar += '<p class="listTitle">Loan</p>';
			liContentCar += '<p class="bCaption">Which fuel type should I choose for my next car?</p>';
			liContentCar += '<p class="desc">Long gone are the days of simply choosing diesel over petrol; these days...</p>';
			liContentCar += '</div>';
			liContentCar += '</a>';
			liContentCar += '</li>';

		var html = "";
		if(inputVal == 'car') {
			for(x = 0; x < carCount; x++) {
				html += liContentCar;
			}
		}else if(inputVal == 'loan') {
			for(x = 0; x < carCount; x++) {
				html += liContentLoan;
			}
		}else {
			for(x = 0; x < carCount; x++) {
				html += liContentCar;
			}
			for(x = 0; x < carCount; x++) {
				html += liContentLoan;
			}
		}

		$(".art-ul").html(html);

		if(inputVal == 'all') {
			$(this).parents("#article-page").find(".art-ul li").fadeIn(600);
		}

		// reset the pagination counter
		$(".art-pagination-ul").find(".page").text(1);
		counter = 1;
	});

	// Script for calculator minimum / error validation
	$(".has-hint").keyup(function() { // on key event validate the user's input
		var value = $(this).val();
		var inputVal = value.replace(",","");

		var minVal = $(this).parents(".calcu-dollar").find(".input-hint").attr("data-min-value");
		if(parseInt(inputVal) > parseInt(minVal)) {
			$(this).parents(".calcu-dollar").removeClass("has-error");
			$(this).parents(".calcu-dollar").find(".input-error").fadeOut(600);
		}
	});

	$(".has-hint").focus(function() { // on focus event validate the user's input
		if($(this).parents(".calcu-dollar").hasClass("has-error")) {
			$(this).parents(".calcu-dollar").find(".input-hint").hide();
			$(this).parents(".calcu-dollar").find(".input-error").fadeIn(600);
		}else {
			$(this).parents(".calcu-dollar").find(".input-error").hide();
			$(this).parents(".calcu-dollar").find(".input-hint").fadeIn(600);
		}
	});

	$(".has-hint").blur(function() { // on blur event validate the user's input
		var value = $(this).val();
		var inputVal = value.replace(",",""); // remove comma
		var minVal = $(this).parents(".calcu-dollar").find(".input-hint").attr("data-min-value"); // get the minimum value on data-attribute

		if(parseInt(inputVal) < parseInt(minVal)) {
			$(this).parents(".calcu-dollar").addClass("has-error");

			$(this).parents(".calcu-dollar").find(".input-error").fadeIn(600);
		}else {
			$(this).parents(".calcu-dollar").removeClass("has-error");
			$(this).parents(".calcu-dollar").find(".input-error").fadeOut(600);
		}

		$(this).parents(".calcu-dollar").find(".input-hint").fadeOut(600);
	});

	// Car loan Tab
	$(".car-loan-tab ul li").click(function() {
		$(this).parent().find("li").removeClass("active");
		$(this).addClass("active");

		var href = $(this).find("a").attr("href");
		console.log(href);

		$("#personal, #business").hide();
		$(href).fadeIn(700);

		return false;
	});

	// Calculator on submit event
	$("body").on("submit", ".calcu-form", function() {
		if(!$(".calc-content01 .calcu-dollar").hasClass("has-error")) { // check if no input error
			$(".calc-output").hide(700); // hide output
			$(this).find(".primary-btn").attr("disabled", true).text("Calculating").css("opacity", ".7"); // disabled button and change status
			setTimeout(function() {
				$(".calcu-form").find(".primary-btn").attr("disabled", false).text("Calculate").css("opacity", "1"); // add delay for faking the http response time
				$(".calc-output").fadeIn(700);
			}, 1000); // 2 secs
		}
		return false;
	});

	// residual checkbox
	$("#calculate-checkbox").click(function() {
		var checkVal = $(this).is(':checked');
		if(checkVal) {
			$(".residual-block").fadeIn(700);
		}else {
			$(".residual-block").fadeOut(300);
		}
	});

	// FAQ script for accordion
	if($(window).width() > 767) {
		$(".car-loan-list li a").click(function() {
			var href = $(this).attr("href");
			$(".pc-details .list-info").hide();
			$(".pc-details").find(href).fadeIn(600);
			$(".car-loan-list li a").removeClass("active");
			$(this).addClass("active");
			
			return false;
		});
	}else {
		$(".car-loan-list li a").click(function() {
			var href = $(this).attr("href");
			$(".perks-box01 .list-info").hide();
			$(this).parent().find(href).fadeIn(600);
			$(".car-loan-list li a").removeClass("active");
			$(this).addClass("active");
			
			return false;
		});
	}

	// Search Button
	$('.search-btn').click(function(){
		$('.search-area').slideToggle('fast').find('.search-input').val('').focus();
		return false;
	});
	$('html').click(function(){
		$('.search-area').slideUp('fast');
	});
	$('.search-area').click(function(e){
		e.stopPropagation();
	});

	// Newletter
	$('.close-n-btn').click(function(){
		$('.newsletter-input').val('');
	});


	// Contact Script for drowdown menu filter
	$(".filter-contact li").click(function() { // select box event for dynamic filter
		$(".location-list").hide();
		$(".location-list").fadeIn();
	});

	if($(window).width() <= 767) {
		
		$(".calcu-info-block").find("h4").click(function() {
			$(this).toggleClass("active");
			$(this).parents(".calc-box").find(".info").slideToggle();
			
		});
	}

	// Single page JS
	$(".input-area .first-level li").click(function() {
		$(".input-area .second-level").fadeIn();
		$(this).parents(".dropdown-data").find("input").attr('disabled', true).css("opacity", ".7");
		$(this).parents(".dropdown-data").find("i").unbind().css("opacity", ".7");
		defaultInputSize();
	});

	$(".input-area .second-level li").click(function() {
		$(".input-area .third-level").fadeIn();
		$(this).parents(".dropdown-data").find("input").attr('disabled', true).css("opacity", ".7");
		$(this).parents(".dropdown-data").find("i").unbind().css("opacity", ".7");
		defaultInputSize();
	});

	$(".input-area .third-level li").click(function() {
		$(".input-area .fourth-level").fadeIn();
		$(this).parents(".dropdown-data").find("input").attr('disabled', true).css("opacity", ".7");
		$(this).parents(".dropdown-data").find("i").unbind().css("opacity", ".7");
		defaultInputSize();
	});
	
	// Modal for newsletter
	$('.modal').modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		inDuration: 300, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '20%', // Ending top style attribute
		ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
			console.log(modal, trigger);
		},
		complete: function() { } // Callback for Modal close
	});

	$("#faqs-area").on("click", "li[data-hasdropdown='true']", function() {
		var anchor = $(this).attr("data-id");

		$(".pc-details .list-info").hide();
		$(".pc-details").find("#"+anchor).fadeIn(600);
		$(".car-loan-list li a").removeClass("active");
		$(this).addClass("active");

		return false;
	});
});
