import { isArray, isEmpty } from 'lodash';
import Comment from './comment';
import CommentForm from './comment-form';
import { useRef, useState } from 'react';
import { smoothScroll } from '../utils/miscellaneous';

const Comments = ( { comments, postId } ) => {

	/*
	 * Инициализация.
	 */
	const commentFormEl = useRef( null );
	const [ replyCommentID, setReplyCommentID ] = useState( 0 );
	
	if ( isEmpty( comments ) || ! isArray( comments ) ) {
		return null;
	}
	
	/**
	 * Handle Reply Button Click.
	 *
	 * @param {Event} event Event.
	 * @param {number} commentId Comment Id.
	 */
	const handleReplyButtonClick = ( event, commentId ) => {
		setReplyCommentID( commentId );
		smoothScroll( commentFormEl.current, 20 );
	}

	return (
		<div className="comment-wrap">
			<h2>{ comments.length } Комментарии</h2>
			{
				comments.map( ( comment, index ) => {
					return (
						<div
							key={ `${ comment?.id ?? '' }-${ index }` ?? '' }
							className="comment"
						>
							<Comment comment={ comment } handleReplyButtonClick={ handleReplyButtonClick }/>
						</div>
					);
				} )
			}
			<div class="comment-wrap-form" ref={ commentFormEl }>
				<CommentForm postId={ postId } replyCommentID={ replyCommentID } />
			</div>
		</div>
	)
}

export default Comments;