import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Org from './org';
import Home from './home';
import SearchForm from './searchForm';
import SearchButton from './searchButton';
import access_token from '../github-api-token';

var homeCount;
var count;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function isInteger(x) {
    return x % 1 === 0;
}

class App extends Component {
  state = {
    orgs: [],
    error: '',
    since: 0,
  }

  componentDidMount(){
    fetch('https://api.github.com/organizations?since=' + getRandomArbitrary(1, 1000000) + '?access_token=' + access_token)
    .then(res => res.json())
    .then(res => {
      this.setState({
        orgs: res
      });
      console.log(this.state.orgs);
    });
  }

  onUpdateSearchArray = (val) => {
    this.setState({since: val});
  };

  searchClick(){
    if (isInteger(this.state.since)){
      if(this.state.since < 38400000){
        fetch('https://api.github.com/organizations?since=' + this.state.since)
        .then(res => res.json())
        .then(res => {
          this.setState({
            orgs: res
          });
        });
        this.setState({error: ''});
      }else{
        this.setState({error: 'Too high!'});
      }
    }else{
      this.setState({error: 'This is not an integer!'});
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="main container animated fadeIn">
          <Link to={'/'} onClick={() => { homeCount = getRandomArbitrary(1, 100)}} className="btn btn-light">Home</Link>
          <br />
          <br />
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                <ul className="list-group list-of-orgs list-group-flush">
                  {
                    this.state.orgs.map(function(org, index) {
                      return(
                        <Link to={`/org/${org.login}`} key={index} className="listLink" onClick={() => {count = getRandomArbitrary(1, 100)}}>
                          <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                            {org.login}
                            <span className="badge badge-secondary badge-pill">{org.id}</span>
                          </li>
                          <br />
                        </Link>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="col-lg-6 col-sm-6">
                <Route path="/" exact={true} render={() => (
                  <div>
                    <Home count={homeCount}/>
                    <div className="alert">
                      <p className="red">{this.state.error}</p>
                      <SearchForm onUpdate={this.onUpdateSearchArray} count={homeCount}/>
                      <br />
                      <SearchButton clickFunc={this.searchClick.bind(this)} count={homeCount}/>
                      <br />
                    </div>
                  </div>
                )}/>
              {this.state.orgs && (
                <Route path="/org/:orgLogin" render={({ match }) => {
                  return(
                    <Org count={count} login={match.params.orgLogin}/>
                  );
                }} />
              )}
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
