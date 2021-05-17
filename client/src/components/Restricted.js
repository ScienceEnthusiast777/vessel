import React from 'react'
import {Route, Redirect} from 'react-router-dom';

const Restricted = ({
  component : Component,
  user,
  path,
  redirect = '/',
  ...rest
})=>{
  return(
    <Route
      exact path={path}
      render={props => {
        return user? (
          <Component {...props} {...rest} user={user}/>
        ) : (
          <Redirect to={redirect}/>
        )
      }}
    />
  )
}

export default Restricted;
