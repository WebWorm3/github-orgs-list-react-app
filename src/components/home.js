import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  const [searchOne, setSearchOne] = useState('')
  const [anim1, setAnim1] = useState('alert animated fadeIn')
  const [anim2, setAnim2] = useState('form-control animated fadeIn')

  useEffect(() => {
    setAnim1('alert')
    setAnim2('form-control')

    setTimeout(() => {
      setAnim1('alert animated fadeIn')
      setAnim2('form-control animated fadeIn')
    }, 0)
  }, [props.count])

  const update = (e) => setSearchOne(e.target.value)

  return(
    <div>
      <div className={anim1} role="alert">
        <h4 className="alert-heading">Welcome!</h4>
        <p>Here you can check information of github organizations!</p>
        <hr />
        <p className="mb-0">All you need to do is just click on organization in the list.</p>
        <hr />
        <input className={anim2} type="text" placeholder="You can find your org by login here." onChange={update} value={searchOne} />
        <br />
        <Link to={`/org/${searchOne}`} className="btn btn-light">Search</Link>
      </div>
    </div>
  )

}