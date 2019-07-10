import React, { useState, useEffect } from 'react'

export default (props) => {
  const [input, setInput] = useState('')
  const [anim, setAnim] = useState('form-control animated fadeIn')

  useEffect(() => {
    setAnim('form-control')
    setTimeout(() => setAnim('form-control animated fadeIn'), 0)
  }, [props.count])

  const update = (e) => {
    props.onUpdate(e.target.value)
    setInput(e.target.value)
  }

  return <input className={anim} type="text" placeholder="You can also find an array of 30 orgs here by id." onChange={update} value={input} />
}
