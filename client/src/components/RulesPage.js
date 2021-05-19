import React from 'react';
import {Link} from 'react-router-dom';

export default function RulesPage(props) {
  
  return (
    <div>
      {props.rules.map(rule=>{
        return (
          <div className="RuleLink" key={rule._id}>
          <h1><Link to={`/rule/${rule._id}`} >{rule.name}</Link></h1>
          {rule.extensions.length>0?<p>This ruleset has been extended: {rule.extensions.length} time(s)</p>:<></>}
          
          <p>created by : {rule.createdBy.username}</p>
          </div>
        )
      })}
    </div>
  )
}


