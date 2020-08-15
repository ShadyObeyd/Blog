import React from 'react';

function Comments(props) {
    const postId = Number(props.match.params.id);

    return (
        <h1>{postId}</h1>
    )
}

export default Comments;