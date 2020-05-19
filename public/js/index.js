let newPostBtn = document.getElementById('newPost');
let fadedBackground = document.getElementById('fadedBackground');
let postForm = document.getElementById('postForm');
let menus = document.getElementsByClassName('optionMenu');
let menuContainers = document.getElementsByClassName('menuContainer')
let editBtns = document.getElementsByClassName('edit');
let form = document.getElementById('form');
let titleInput = document.querySelector('input[name="title"]');
let contentInput = document.querySelector('input[name="content"]');

const toggleVisibility = () => {
	form.action = '/post/create';

	fadedBackground.classList.toggle('hidden');
	postForm.classList.toggle('hidden');
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

const showEditBox = function() {
	let postContent = this.closest('div.post').firstElementChild.children;
	toggleVisibility();

	this.parentElement.parentElement.classList.add('hidden');
	form.action = `/post/update/${this.closest('div.post').dataset.postid}`
	postForm.firstElementChild.textContent = 'Edit Post';
	titleInput.value = postContent[0].textContent;
	contentInput.value = postContent[1].textContent;
}

newPostBtn.onclick = toggleVisibility;
fadedBackground.onclick = toggleVisibility;

for (const menu of menus) {
	menu.onclick = showMenu;
}

for (const editBtn of editBtns) {
	editBtn.onclick = showEditBox;
}