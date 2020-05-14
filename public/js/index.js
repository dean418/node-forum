let newPostBtn = document.getElementById('newPost');
let fadedBackground = document.getElementById('fadedBackground');
let postForm = document.getElementById('postForm');

const toggleVisibility = (event, element) => {
	if (element) {
		element.classList.toggle('hidden');
	} else {
		fadedBackground.classList.toggle('hidden');
		postForm.classList.toggle('hidden');
	}
}

newPostBtn.onclick = toggleVisibility;
fadedBackground.onclick = toggleVisibility;