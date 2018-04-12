import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import Org from './org';


class App extends Component {
  state = {
    orgs: []
  }

  componentDidMount(){
    fetch('https://api.github.com/organizations?since=34234')
    .then(res => res.json())
    .then(res => {
      this.setState({
        orgs: res
      });
      console.log(this.state.orgs);
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="main container row">
            <div className="col-lg-5 col-sm-5">
              <ul className="list-group list-of-orgs">
                {
                  this.state.orgs.map(function(org, index) {
                    return(
                      <Link to={`/org/${org.id}`} key={index}>
                        <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                          {org.login}
                          <span className="badge badge-primary badge-pill">{org.id}</span>
                        </li>
                      </Link>
                    );
                  })
                }
              </ul>
            </div>
            <div className="col-lg-7 col-sm-7">
            {this.state.orgs && (
              <Route path="/org/:orgId" render={({ match }) => (
                <Org selectedOrg={this.state.orgs.find(o => o.id == match.params.orgId )} />
              )} />
            )}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
