import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const Org = ({ selectedOrg }) => {
  var copy = Object.assign({}, selectedOrg);

  return (
    <div>
      <h1>{copy.login}</h1>
      <img className="org-avatar" src={copy.avatar_url}></img>
    </div>
  );
}

export default Org;
