import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = "http://jsonplaceholder.typicode.com";
axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN" //if you have one you can set it here
axios.defaults.headers.post['Content-Type'] = 'application/json' //this is the default anyway but just to show it

axios.interceptors.request.use((requestConfig) => {
    console.log(requestConfig);
    return requestConfig;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use((response)=>{
    console.log(response);
    return response;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
})
//you can remove interceptors like this
//var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
//axios.interceptors.request.eject(myInterceptor)

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
