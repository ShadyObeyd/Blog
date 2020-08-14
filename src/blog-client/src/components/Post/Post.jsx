import React, { Fragment } from 'react';

function Post({ id, title, content, createdOn, author, comments }) {
    return (
        <Fragment>
            <h1>{title}</h1>
            <p>{content}</p>
            <footer>
                <p>{author}</p>
                <p>{createdOn}</p>
            </footer>
        </Fragment>
    )
}

export default Post;