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

// const showCommentBox = (event) => {
// 	commentBtn.parentElement.parentElement.appendChild(commentBox);
// 	toggleVisibility(null, commentBox);
// }

newPostBtn.onclick = toggleVisibility;
fadedBackground.onclick = toggleVisibility;