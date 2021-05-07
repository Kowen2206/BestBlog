import React from 'react';

const BlogContent = ({children}) =>{
    return(
        <div className="blogContent__Container">
            {children}
        </div>
    );
}

export default BlogContent;