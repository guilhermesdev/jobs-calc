const form = document.querySelector('form');

form.addEventListener('submit', event => {
	if (password1.value !== password2.value) {
		event.preventDefault();
		const errorBox = document.querySelector('.message.message-error');
		
		if (!errorBox) {
			const messageBox = document.createElement('div');
			messageBox.classList.add('message', 'message-error', 'fullwidth', 'animate-pop');
			messageBox.innerText = 'As senhas informadas são diferentes';
			form.prepend(messageBox);
		} else {
			errorBox.innerText = 'As senhas informadas são diferentes';
		}
	}
});