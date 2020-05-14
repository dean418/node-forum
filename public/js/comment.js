let post = document.querySelector('[data-postid]');
let comments = document.querySelectorAll('[data-commentid]')
let commentBox = document.getElementById('commentBox');
let commentForm = document.getElementById('commentForm');
let commentBtn = document.getElementById('comment');
let parentInput = document.getElementById('parentInput');

const moveCommentBox = (parent) => {
	parent.appendChild(commentBox);
	commentBox.classList.toggle('hidden');
}

for (const comment of comments) {
	comment.lastElementChild.onclick = function () {
		moveCommentBox(this.parentElement);
		parentInput.value = post.dataset.postid;
		commentBox.action = `/post/${post.dataset.postid}/${this.parentElement.dataset.commentid}`;
	}
}

commentBtn.onclick = function() {
	moveCommentBox(this.parentElement.parentElement);
	parentInput.value = '';
	commentBox.action = `/post/${post.dataset.postid}/`;
};