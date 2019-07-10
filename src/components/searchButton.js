import React, { useState, useEffect } from 'react'

export default (props) => {
  const [anim, setAnim] = useState('btn btn-light animated fadeIn')

  useEffect(() => {
    setAnim('btn btn-light')
    setTimeout(() => setAnim('btn btn-light animated fadeIn'), 0)
  }, [props.count])

  return <button className={anim} onClick={props.clickFunc}>Search</button>
}
