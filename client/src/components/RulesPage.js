import React from 'react';
import {Link} from 'react-router-dom';

export default function RulesPage(props) {
  return (
    <div>
      {props.rules.map(rule=>{
        return (
          <h1 key={rule._id}>{rule.name}</h1>
        )
      })}
    </div>
  )
}


