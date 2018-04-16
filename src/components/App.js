import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Org from './org';
import Home from './home';
import SearchForm from './searchForm';
import SearchButton from './searchButton';

let countGlobal = 0;
var count = 0;
var homeCount = 0;
var since = 0;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function isInteger(x) {
    return x % 1 === 0;
}

class App extends Component {
  state = {
    orgs: [],
    count: -1,
    error: ''
  }

  componentDidMount(){
    since = getRandomArbitrary(1, 1000000);

    fetch('https://api.github.com/organizations?since=' + since)
    .then(res => res.json())
    .then(res => {
      this.setState({
        orgs: res
      });
      console.log(this.state.orgs);
    });
  }

  onUpdate = (val) => {
    since = val;
  };

  searchClick(){
    if (isInteger(since)){
      if(since < 38400000){
        fetch('https://api.github.com/organizations?since=' + since)
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
          <div className="main container animated fadeInUp">
          <Link to={'/'} onClick={() => { homeCount = getRandomArbitrary(1, 100)}} className="btn btn-light">Home</Link>
          <br />
          <br />
            <div className="row">
              <div className="col-lg-5 col-sm-5">
                <ul className="list-group list-of-orgs list-group-flush">
                  {
                    this.state.orgs.map(function(org, index) {
                      return(
                        <a onClick={() => { count = getRandomArbitrary(1, 100)}}><Link to={`/org/${org.login}`} key={index} className="listLink">
                          <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                            {org.login}
                            <span className="badge badge-secondary badge-pill">{org.id}</span>
                          </li>
                          <br />
                        </Link></a>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="col-lg-7 col-sm-7">
                <Route path="/" exact={true} render={() => (
                  <div>
                    <Home count={homeCount}/>
                    <div className="alert">
                      <p className="red">{this.state.error}</p>
                      <SearchForm onUpdate={this.onUpdate} count={homeCount}/>
                      <br />
                      <SearchButton clickFunc={this.searchClick.bind(this)} count={homeCount}/>
                      <br />
                    </div>
                  </div>
                )}/>
              {this.state.orgs && (
                <Route path="/org/:orgLogin" render={({ match }) => {
                  return(
                    <Org selectedOrg={this.state.orgs.find(o => o.login == match.params.orgLogin )} count={count} login={match.params.orgLogin}/>
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
