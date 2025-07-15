const PostMeta = ({ date, authorName }) => {
	return (
		<div className="post-meta">
			<time className="post-meta-time" dateTime={ date || '' }>{ date || '' }</time>
			<span className="post-meta-autor"><span className="italic mr-2">by</span>{ authorName || '' }</span>
		</div>
	);
}

export default PostMeta;