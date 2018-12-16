import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostID: null,
        error: false
    }

    componentDidMount() {
        //get returns a promise
        axios.get('/posts')
        .then((response) => {
            const posts = response.data.slice(0, 4); //force only 4 posts
            const updatedPosts = posts.map((post) =>{
                return { // use spread operator to munge in a new property
                    ...post,
                    author: 'Dan'
                }
            })
            this.setState({posts: updatedPosts});
        }) //chain a catch to handle errors
        .catch((error) => {
            this.setState({
                error: true
            })
        }) 
    }

    articleClickedHandler = (id) => {
        this.setState({
            selectedPostID: id
        })
    }


    render () {
        let posts = <p style={{textAlign:'center'}}>Oops!  Something went wrong.</p>
        if(!this.state.error) {
            posts = this.state.posts.map((post)=>{
                return <Post 
                key={post.id}
                title={post.title} 
                author={post.author}
                clicked={() => this.articleClickedHandler(post.id)}
                 />
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostID}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;