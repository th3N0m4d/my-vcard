
$(function() {

	var contactForm = $('#contact-form');

	contactForm.submit(function(e) {
		e.preventDefault();

		if (!contactForm.valid()) return;

		var form = contactForm[0];
		var submitBtn = contactForm.find('.btn-send');

		submitBtn.prop('disabled', true).text('SENDING...');

		fetch(contactForm.attr('action'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(new FormData(form)).toString()
		})
		.then(function(res) {
			if (!res.ok) throw new Error('Network response was not ok');
			contactForm.clearForm();
			showToast('Message sent! I\'ll get back to you soon.', 'success');
		})
		.catch(function() {
			showToast('Something went wrong. Please try again.', 'error');
		})
		.finally(function() {
			submitBtn.prop('disabled', false).text('SEND');
		});
	});

});


$.fn.clearForm = function() {
	return this.each(function() {
		var type = this.type, tag = this.tagName.toLowerCase();
		if (tag == 'form')
			return $(':input', this).clearForm();
		if (type == 'text' || type == 'email' || type == 'password' || tag == 'textarea')
			this.value = '';
		else if (type == 'checkbox' || type == 'radio')
			this.checked = false;
		else if (tag == 'select')
			this.selectedIndex = -1;
	});
};


function showToast(message, type) {
	var existing = $('#toast');
	if (existing.length) existing.remove();

	var toast = $('<div id="toast"></div>').text(message).addClass(type);
	$('body').append(toast);

	setTimeout(function() { toast.addClass('visible'); }, 10);
	setTimeout(function() {
		toast.removeClass('visible');
		setTimeout(function() { toast.remove(); }, 300);
	}, 4000);
}
