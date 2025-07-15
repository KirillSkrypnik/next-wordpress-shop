
import Link from 'next/link';

import Image from '../image';
import { sanitize } from '../utils/miscellaneous';
import PostMeta from '../post-meta';

const Post = ({ post }) => {
	return (
		<Link legacyBehavior href={`/blog/${post?.slug}/`}>
			<div class="post-item-child">
				<Image
					sourceUrl={post?.attachment_image?.img_src?.[0] ?? ''}
					title={post?.title ?? ''}
					width="400"
					height="225"
					alt={post?.title ?? ''}
				/>
				<PostMeta date={post?.date ?? ''} authorName={post?.meta?.author_name ?? ''} />
				<h2
					className="font-bold mb-3 text-lg text-brand-gun-powder font-bold uppercase hover:text-blue-500"
					dangerouslySetInnerHTML={{ __html: sanitize(post?.title ?? '') }}
				/>
					<div
					className="text-content"
					dangerouslySetInnerHTML={{
						__html: sanitize(
						post?.excerpt
							? post.excerpt.length > 80
							? post.excerpt.slice(0, 80) + '...'
							: post.excerpt
							: ''
						),
					}}
					/>

				
			</div>
		</Link>
	);
};

export default Post;