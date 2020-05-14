let post = document.querySelector('[data-postid]');
let comments = document.querySelectorAll('[data-commentid]')
let commentBox = document.getElementById('commentBox');
let commentForm = document.getElementById('commentForm');
let commentBtn = document.getElementById('comment');

const moveCommentBox = (parent) => {
	parent.appendChild(commentBox);
	commentBox.classList.toggle('hidden');
}

for (const comment of comments) {
	comment.onclick = function () {
		moveCommentBox(this);
		commentBox.action = `/post/${post.dataset.postid}/${this.dataset.commentid}`;
	}
}

commentBtn.onclick = function() {
	moveCommentBox(this.parentElement.parentElement);
	commentBox.action = `/post/${post.dataset.postid}/`;
};