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
  console.log('currently logged in user: ',user)
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
})
.catch(err=>{
  console.log(err)
})

reportWebVitals();
