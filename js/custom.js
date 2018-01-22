// page load entry point
jQuery(document).ready(function($) {
    console.log("Hello")
    fix_img();
    fix_title_height();
    badge_drop_down();
    //$('.intro-header').height($(window).height() + 1);
});

// page resize listener
$(window).resize(function(){
	fix_img();
    fix_title_height();
    fox_badge_width();
})

// page intro screen image height adjust
function fix_img(){
	var screen_width = $(document).width();
	var center_element_width = $('.center').width();
	var left_edge = (center_element_width-screen_width)/2;

	$(".backim").each(function(selector){
		var img_width = $(this).width();
		var img_height = $(this).height();
		var new_width = screen_width;
		var new_height = $(this).parent().parent().height();
		var wrapper_height = $(this).parent().height();
		// set this width to full screen width, shift left to edge of screen
		$(this).width(new_width + 'px');
		//$(this).css('left', left_edge + 'px');
		// set wrapper div image width and left and height, set overflow to hidden
		$(this).parent().width(new_width + 1 + 'px');
		$(this).parent().css('left', left_edge + 'px');
		
		})
}

// page intro screen title height adjust
function fix_title_height(){
	var title_height = $('.site-heading-inner').height();
	var title_margin = parseInt($('.site-heading').css('marginBottom'),10);
	$('.site-heading').height(title_height+15);
	console.log((-1)*(title_height+title_margin) + 'px');
	$('.site-heading-inner').css('margin-top',(-1)*(title_height+title_margin) - 15 + 'px');

}

// badge drop down event listener
function badge_drop_down(){
	$('.collapseable').click(function(e){
		console.log('hit')
		$(this).parent().find('.text').toggle()
	})
}

// make badge/text width responsive
function fox_badge_width(){
	mid_width = $('.mid_width').width();
	$('.text').width(mid_width);
}
