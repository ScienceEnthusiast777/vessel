import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

axios.get('/api/auth/loggedin')
.then(response=>{
  const user = response.data;
  ReactDOM.render(
    <BrowserRouter>
      <App user={user}/>
    </BrowserRouter>,
    document.getElementById('root')
  );
})
.catch(err=>{
  console.log(err)
})

reportWebVitals();
