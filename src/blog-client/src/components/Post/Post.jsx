import React, { Fragment } from 'react';

function Post(props) {
    const id = props.match.params.id;
    console.log(id);
    
    return (
        <Fragment>
            <h1>Hello from Post</h1>
        </Fragment>
    )
}

export default Post;