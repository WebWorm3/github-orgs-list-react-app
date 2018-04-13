import React, { Component } from 'react';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
let classes = 'org-avatar ';

class Org extends Component{
  state = {
    isLoaded: false
  }

  handleLoaded(){

  }

  handleChange(){

  }

  render(){
    return(
      <ThisOrg handleLoaded={this.handleLoaded.bind(this)} handleChange={this.handleChange.bind(this)} selectedOrg={this.props.selectedOrg} />
    );
  }
}

const ThisOrg = ({ selectedOrg, handleLoaded, handleChange}) => {
  var copy = Object.assign({}, selectedOrg);

  return (
    <div>
      <h1>{copy.login}</h1>
      <img className={classes} src={copy.avatar_url}></img>
    </div>
  );
}

export default Org;
