exports.nestObject = (commentArr, id=null) => {
	return commentArr
	  .filter(comment => comment['parentID'] == id)
	  .map(comment => ({...comment, replies: this.nestObject(commentArr, comment.id)
	}));
}