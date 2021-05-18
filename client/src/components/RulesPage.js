import React from 'react';
import {Link} from 'react-router-dom';

export default function RulesPage(props) {
  return (
    <div>
      {props.rules.map(rule=>{
        return (
          <div key={rule._id}>
          <h1><Link to={`/rules/${rule._id}`} className="RuleLink">{rule.name}</Link></h1>
          <p>created by : {rule.createdBy.username}</p>
          </div>
        )
      })}
    </div>
  )
}


