import React, { useState, useEffect, Fragment } from 'react'
import Img from 'react-image'
import access_token from '../github-api-token'
import axios from 'axios'

const spinner = (
  <div className="sk-fading-circle">
    <div className="sk-circle1 sk-circle" />
    <div className="sk-circle2 sk-circle" />
    <div className="sk-circle3 sk-circle" />
    <div className="sk-circle4 sk-circle" />
    <div className="sk-circle5 sk-circle" />
    <div className="sk-circle6 sk-circle" />
    <div className="sk-circle7 sk-circle" />
    <div className="sk-circle8 sk-circle" />
    <div className="sk-circle9 sk-circle" />
    <div className="sk-circle10 sk-circle" />
    <div className="sk-circle11 sk-circle" />
    <div className="sk-circle12 sk-circle" />
  </div>
)

export default (props) => {
  const [org, setOrg] = useState(null)
  const [anim, setAnim] = useState('card bg-light animated fadeIn')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getOrg()
  }, [])

  useEffect(() => {
    setAnim('card bg-ligh ')
    setTimeout(() => {
      setAnim('card bg-light animated fadeIn')
      setLoader(true)
    }, 0)
    getOrg()
  }, [props.count])

  const getOrg = async () => {
    setLoader(true)
    try{
      const response = await axios.get(`https://api.github.com/orgs/${props.login}?access_token=${access_token}`)
      setOrg(response.data)
    }
    catch (e) {
      setOrg("Error")
    }
    setLoader(false)
  }
  
  if (loader) return null
  else {
    return (
      <div>
        <div className={anim} style={{width: '18rem'}}>
          {(org && org !== "Error") ? (
            <Fragment>
              <Img className='card-img-top' src={org.avatar_url} loader={spinner} />
              <div className="card-body">
                <p className="card-text"><b><a href={org.html_url} target="_blank">{org.name ? org.name : org.login}</a></b></p>
                {org.email && (
                  <p className="card-text">{org.email}</p>
                )}
                {org.blog && (
                  <p className="card-text"><a href={org.blog} target="_blank">[Blog]</a></p>
                )}
                {org.location && (
                  <p className="card-text">{org.location}</p>
                )}
                {org.description && (
                  <p className="card-text">{org.description}</p>
                )}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p className="text-danger text-center mt-3"><b>Org is not found!</b></p>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}
