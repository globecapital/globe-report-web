(function ($) {
	$(document).ready(function () {
		// Textarea Auto Resize
		var hiddenDiv = $('.hiddendiv').first();
		if (!hiddenDiv.length) {
			hiddenDiv = $('<div class="hiddendiv nodisplay common"></div>');
			$('body').append(hiddenDiv);
		}
		var text_area_selector = '.resize-textarea';

		function textareaAutoResize($textarea) {
			// Set font properties of hiddenDiv

			var fontFamily = $textarea.css('font-family');
			var fontSize = $textarea.css('font-size');
			var lineHeight = $textarea.css('line-height');

			if (fontSize) {
				hiddenDiv.css('font-size', fontSize);
			}
			if (fontFamily) {
				hiddenDiv.css('font-family', fontFamily);
			}
			if (lineHeight) {
				hiddenDiv.css('line-height', lineHeight);
			}

			if ($textarea.attr('wrap') === 'off') {
				hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
			}

			hiddenDiv.text($textarea.val() + '\n');
			var content = hiddenDiv.html().replace(/\n/g, '<br>');
			hiddenDiv.html(content);

			// When textarea is hidden, width goes crazy.
			// Approximate with half of window size

			if ($textarea.is(':visible')) {
				hiddenDiv.css('width', $textarea.width());
			} else {
				hiddenDiv.css('width', $(window).width() / 2);
			}

			$textarea.css('height', hiddenDiv.height());
		}

		$(text_area_selector).each(function () {
			var $textarea = $(this);
			if ($textarea.val().length) {
				textareaAutoResize($textarea);
			}
		});

		$('body').on('keyup keydown autoresize', text_area_selector, function () {
			textareaAutoResize($(this));
		});
	});
})(jQuery);