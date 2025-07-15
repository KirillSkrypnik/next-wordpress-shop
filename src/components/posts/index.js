/**
 * External Dependencies.
 */
import PropTypes from 'prop-types';
import { isEmpty, isArray } from 'lodash';

/**
 * Internal Dependency.
 */
import Post from './post';


const Posts = ( { posts } ) => {
	
	if ( isEmpty( posts ) && ! isArray( posts ) ) {
		return null;
	}
	
	return (
            <div className="flex-wrap-blog">
                {
                    posts.map( ( post, index ) => {
                        return (
                            <div
                                key={ `${ post?.id ?? '' }-${ index }` ?? '' }
                                className="post-item"
                            >
                                <Post post={ post }/>
                            </div>
                        );
                    } )
                }
            </div>
	);
};

Posts.propTypes = {
	posts: PropTypes.array,
};

Posts.defaultProps = {
	posts: [],
};

export default Posts;