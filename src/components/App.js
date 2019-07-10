import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Org from './org'
import Home from './home'
import SearchForm from './searchForm'
import SearchButton from './searchButton'
import access_token from '../github-api-token'
import axios from 'axios'

var homeCount, count

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min
const isInteger = (x) => x % 1 === 0

export default () => {
  const [orgs, setOrgs] = useState([])
  const [error, setError] = useState('')
  const [since, setSince] = useState(0)

  useEffect(() => {
    getOrgs(getRandomArbitrary(1, 1000000))
  }, [])

  const getOrgs = async (since) => {
    const response = await axios.get(`https://api.github.com/organizations?since=${since}?access_token=${access_token}`)
    setOrgs(response.data)
  }

  const onUpdateSearchArray = (val) => setSince(val)

  const searchClick = () => {
    if (isInteger(since)){
      if (since < 38400000){
        getOrgs(since)
        setError('')
      } else setError('Too high!')
    } else setError('This is not an integer!')
  }

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
                  orgs.map((org, index) => {
                    return(
                      <Link to={`/org/${org.login}`} key={index} className="listLink" onClick={() => {count = getRandomArbitrary(1, 100)}}>
                        <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                          {org.login}
                          <span className="badge badge-secondary badge-pill">{org.id}</span>
                        </li>
                        <br />
                      </Link>
                    )
                  })
                }
              </ul>
            </div>
            <div className="col-lg-6 col-sm-6">
              <Route path="/" exact={true} render={() => (
                <div>
                  <Home count={homeCount}/>
                  <div className="alert">
                    <p className="red">{error}</p>
                    <SearchForm onUpdate={onUpdateSearchArray} count={homeCount}/>
                    <br />
                    <SearchButton clickFunc={searchClick} count={homeCount}/>
                  </div>
                </div>
              )}/>
              {orgs && (
                <Route path="/org/:orgLogin" render={({ match }) => (
                  <Org count={count} login={match.params.orgLogin} />
                )} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}