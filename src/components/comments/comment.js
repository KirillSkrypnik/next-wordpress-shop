import { isEmpty } from 'lodash';
import { getFormattedDate, sanitize } from '../utils/miscellaneous';
import Image from '../image';

const Comment = ( { comment, handleReplyButtonClick } ) => {
	
	if ( isEmpty( comment ) ) {
		return null;
	}
	
	return (
		<article className="comment-article">
			<div className="comment-autor-wrapper">
				<Image
					sourceUrl={ comment?.author_avatar_urls?.['48'] ?? '' }
					title={ comment?.author_name ?? '' }
					width="24"
					height="24"
					layout="fill"
					containerClassNames="comment-autor"
					style={{borderRadius: '50%', overflow: 'hidden'}}
				/>
				<div>{ comment?.author_name ?? '' }</div>
				
				<time dateTime={ comment?.date ?? '' } title={ comment?.date ?? '' } >{ getFormattedDate( comment?.date ?? '' ) }</time>
			</div>
			<div
				className="comment-message"
				dangerouslySetInnerHTML={ { __html: sanitize( comment?.content?.rendered ?? '' ) } }
			/>

				<button
					type="button"
				    className="comment-reply btn-general"
					onClick={ ( event ) => handleReplyButtonClick( event, comment.id ) }
				>
					<svg aria-hidden="true" className="comment-reply-svg" fill="none" stroke="currentColor"
					     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
						</path>
					</svg>
					Ответить
				</button>
		</article>
	)
}

export default Comment;