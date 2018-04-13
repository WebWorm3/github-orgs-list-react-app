import React, { Component } from 'react';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
let classes = 'org-avatar avatar-none';
class Org extends Component{
  state = {
    isLoaded: false
  }

  handleLoaded(){
    classes = 'org-avatar avatar-none';
  }

  handleChange(){
    setInterval(this.setState({isLoaded: true}), 2000);
  }

  render(){
    return(
      <ThisOrg loadfunc={this.handleLoaded.bind(this)} changefunc={this.handleChange.bind(this)} selectedOrg={this.props.selectedOrg} />
    );
  }
}

const ThisOrg = ({ selectedOrg, loadfunc, changefunc}) => {
  var copy = Object.assign({}, selectedOrg);

  return (
    <div onLoad={changefunc}>
      <h1>{copy.login}</h1>
      <img className={classes} src={copy.avatar_url}></img>
    </div>
  );
}

export default Org;
