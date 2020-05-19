let newPostBtn = document.getElementById('newPost');
let fadedBackground = document.getElementById('fadedBackground');
let postForm = document.getElementById('postForm');

let menus = document.getElementsByClassName('optionMenu');
let menuContainers = document.getElementsByClassName('menuContainer')

const toggleVisibility = (event, element) => {
	if (element) {
		element.classList.toggle('hidden');
	} else {
		fadedBackground.classList.toggle('hidden');
		postForm.classList.toggle('hidden');
	}
}

const showMenu = function() {
	for (const menu of menus) {
		if (menu.previousElementSibling === this.previousElementSibling) {
			continue;
		}
		menu.previousElementSibling.classList.add('hidden');
	}
	this.previousElementSibling.classList.toggle('hidden')
}

newPostBtn.onclick = toggleVisibility;
fadedBackground.onclick = toggleVisibility;

for (const menu of menus) {
	menu.onclick = showMenu
}