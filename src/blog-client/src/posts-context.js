import React from 'react';

const PostContext = React.createContext({
    posts: [],
    getPosts: () => {}
});

export default PostContext;