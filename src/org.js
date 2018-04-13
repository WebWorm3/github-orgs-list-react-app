import React, { Component } from 'react';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
let classes = 'org-avatar ';

  class Org extends Component {

    render(){
      var copy = Object.assign({}, this.props.selectedOrg);
      return(
        <div>
          <h1>{copy.login}</h1>
          <img className={classes} src={copy.avatar_url}></img>
        </div>
      );
    }
  }

export default Org;
