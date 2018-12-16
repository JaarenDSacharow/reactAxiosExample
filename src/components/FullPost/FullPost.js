import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

    state = {
        fetchedPost : null
    }

    //componentDidUpdate() is invoked immediately after updating occurs. 
    //This method is not called for the initial render.
    //Use this as an opportunity to operate on the DOM when the component has been updated. 
    //This is also a good place to do network requests as long as you compare the current 
    //props to previous props (e.g. a network request may not be necessary if the props have not changed).

    componentDidUpdate () {
        //you cannot update state in this method
        //without creating an infinte loop of render/updates!
        // to solve this, we need to check for three things:
        //since fetchedPosts is NULL initially nothning will happen
        //so you need to check for:
        //if this.state.fetchedPost doesn't exist OR 
        //
        // if this.state.fetchedPost exists AND this.state.fetchedPost.id is not equal to props.id 
        //only then should you make a request
        if(this.props.id) {
            if(!this.state.fetchedPost || (this.state.fetchedPost && this.state.fetchedPost.id !== this.props.id)) {
                axios.get(`/posts/${this.props.id}`)
                .then((response) => {
                    console.log(response);
                     this.setState({
                        fetchedPost: response.data
                     })
                })      
            }

        }

    }

    deletePostHandler = () => {
        axios.delete(`/posts/${this.props.id}`)
            .then((response) => {
                console.log(response);
            })
    }


    render () {

        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
 
       //it has received a prop but the fetch is not yet complete
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>Fetching...</p>;
        }
        //it has received a post
        if (this.state.fetchedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.fetchedPost.title}</h1>
                    <p>{this.state.fetchedPost.body}}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler}className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;
    }
}

export default FullPost;