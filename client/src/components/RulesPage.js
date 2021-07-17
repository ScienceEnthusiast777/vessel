import React from 'react';
import {Link} from 'react-router-dom';

export default function RulesPage(props) {
  
  return (
    <div>
      {props.rules.map(rule=>{
        return (
          <div className="border border-black p-3 m-3" key={rule._id}>
          <h1><Link to={`/rule/${rule._id}`} >{rule.name}</Link></h1>
          {rule.extensions.length>0?<p>This ruleset has been extended: {rule.extensions.length} time(s)</p>:<></>}
          <p>created by : {rule.createdBy.username}</p>
          </div>
        )
      })}
    </div>
  )
}


