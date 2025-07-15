/**
 * External Dependencies.
 */
import { useEffect, useState } from 'react';
import cx from 'classnames';

/**
 * Internal Dependencies.
 */
import validateAndSanitizeCommentsForm from '@/validator/comments';
import TextArea from '../form-elements/text-area';
import Input from '../form-elements/input';
import { postComment } from '../utils/blog';
import { sanitize } from '../utils/miscellaneous';
import Loading from '../loading';

const CommentForm = ( { postId, replyCommentID } ) => {
	
	/**
	 * Initialize Input State.
	 *
	 * @type {{date: Date, postId: number, wp_comment_cookies_consent: boolean}}
	 */
	const initialInputState = {
		postId: postId || 0,
		date: new Date(),
		parent: replyCommentID || 0,
	}
	
	const [ input, setInput ] = useState( initialInputState );
	const [ commentPostSuccess, setCommentPostSuccess ] = useState( false );
	const [ commentPostError, setCommentPostError ] = useState( '' );
	const [ clearFormValues, setClearFormValues ] = useState( false );
	const [ loading, setLoading ] = useState( false );
	const submitBtnClasses = cx(
		'comment-form-loading',
		{
			'cursor-pointer bg-blue-700': ! loading,
			'bg-blue-400 dark:bg-blue-500 cursor-not-allowed': loading,
		},
	);
	
	/**
	 * When the reply Comment id gets updated
	 * then update the input.
	 */
	useEffect( () => {
		setInput( {
			...input,
			parent: replyCommentID || 0,
		} );
	}, [ replyCommentID ] );
	
	/**
	 * If 'clearFormValues' becomes true,
	 * reset the input value to initialInputState
	 */
	useEffect( () => {
		if ( clearFormValues ) {
			setInput( initialInputState );
		}
	}, [ clearFormValues ] );
	
	/**
	 * If 'commentPostSuccess' is set to true, set to false after
	 * few seconds so the message disappears.
	 */
	useEffect( () => {
		if ( commentPostSuccess ) {
			const intervalId = setTimeout( () => {
				setCommentPostSuccess( false )
			}, 10000 )
			
			// Unsubscribe from the interval.
			return () => {
				clearInterval( intervalId );
			};
		}
	}, [ commentPostSuccess ] )
	
	/**
	 * Handle form submit.
	 *
	 * @param {Event} event Event.
	 *
	 * @return {null}
	 */
	const handleFormSubmit = ( event ) => {
		event.preventDefault();
		
		const commentFormValidationResult = validateAndSanitizeCommentsForm( input );
		
		setInput( {
			...input,
			errors: commentFormValidationResult.errors,
		} );
		
		// If there are any errors, return.
		if ( ! commentFormValidationResult.isValid ) {
			return null;
		}
		
		// Set loading to true.
		setLoading( true );
		
		// Make a POST request to post comment.
		const response = postComment( input.postId, input );
		
		/**
		 * The postComment() returns a promise,
		 * When the promise gets resolved, i.e. request is complete,
		 * then handle the success or error messages.
		 */
		response.then(( res ) => {
			setLoading( false );
			if ( res.success ) {
				setCommentPostSuccess( true );
				setClearFormValues( true );
			} else {
				setCommentPostError( res.error ?? 'Something went wrong. Please try again' );
			}
		})
	}
	
	/*
	 * Handle onchange input.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return {void}
	 */
	const handleOnChange = ( event ) => {
		
		// Reset the comment post success and error messages, first.
		if ( commentPostSuccess ) {
			setCommentPostSuccess( false );
		}
		if ( commentPostError ) {
			setCommentPostError( '' );
		}
		
		const { target } = event || {};
		const newState = { ...input, [ target.name ]: target.value };
		setInput( newState );
	};
	
	return (
		<form action="/" noValidate onSubmit={ handleFormSubmit } id="comment-form">
			<h2>Оставить комментарий</h2>
			<p className="comment-notes">
				<span id="email-notes">Ваш адрес электронной почты не будет опубликован.</span>
				<span className="required-field-message">Обязательные поля отмечены <span className="required">*</span></span>
			</p>
			<TextArea
				id="comment"
				containerClassNames="comment-form-comment mb-2"
				name="comment"
				label="Комментарий"
				cols="45"
				rows="5"
				required
				textAreaValue={ input?.comment ?? '' }
				handleOnChange={ handleOnChange }
				errors={ input?.errors ?? {} }
			/>
			<div className="comment-form-input-wrapper">
				<Input
					name="author"
					inputValue={ input?.author }
					required
					handleOnChange={ handleOnChange }
					label="Имя"
					errors={ input?.errors ?? {} }
					containerClassNames="comment-form-author"
				/>
				<Input
					name="email"
					inputValue={ input?.email }
					required
					handleOnChange={ handleOnChange }
					label="Email"
					errors={ input?.errors ?? {} }
					containerClassNames="comment-form-email"
				/>
			</div>
			<Input
				name="url"
				inputValue={ input?.url ?? '' }
				handleOnChange={ handleOnChange }
				label="Сайт"
				errors={ input?.errors ?? {} }
				containerClassNames="comment-form-url"
			/>
			<div className="form-submit">
				<input
					name="submit"
					type="submit"
					id="submit"
					className={ submitBtnClasses }
					value="Оставить комментарий"
					disabled={ loading }
				/>
			</div>
			{
				commentPostSuccess && ! loading ?
					(
						<div
							className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
							role="alert">
							<span className="font-medium">Успешно!</span> Ваш комментарий отправлен на одобрение.
							Он будет опубликован после одобрения администратором.
						</div>
					) : null
			}
			{
				commentPostError && ! loading ?
					(
						<div
							className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
							role="alert">
							<span className="font-medium">Ошибка! </span>
							<div className="inline-block" dangerouslySetInnerHTML={ { __html: sanitize( commentPostError ) } } />
						</div>
					) : null
			}
			{
				loading ? <Loading  text="Отправка..."/>: null
			}
		</form>
	)
}

export default CommentForm;