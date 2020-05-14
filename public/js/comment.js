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
		let commentID = this.parentElement.dataset.commentid;
		parentInput.value = commentID;
		commentBox.action = `/post/${post.dataset.postid}/${commentID}`;
		moveCommentBox(this.parentElement);
	}
}

commentBtn.onclick = function() {
	parentInput.value = '';
	commentBox.action = `/post/${post.dataset.postid}/`;
	moveCommentBox(this.parentElement.parentElement);
};