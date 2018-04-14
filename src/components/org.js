import React, { Component } from 'react';
import Img from 'react-image';
import Error from './error';

  const spinner = (
    <div className="sk-fading-circle">
      <div className="sk-circle1 sk-circle"></div>
      <div className="sk-circle2 sk-circle"></div>
      <div className="sk-circle3 sk-circle"></div>
      <div className="sk-circle4 sk-circle"></div>
      <div className="sk-circle5 sk-circle"></div>
      <div className="sk-circle6 sk-circle"></div>
      <div className="sk-circle7 sk-circle"></div>
      <div className="sk-circle8 sk-circle"></div>
      <div className="sk-circle9 sk-circle"></div>
      <div className="sk-circle10 sk-circle"></div>
      <div className="sk-circle11 sk-circle"></div>
      <div className="sk-circle12 sk-circle"></div>
    </div>
  );

  class Org extends Component {
    render(){
      var copy = Object.assign({}, this.props.selectedOrg);
      return(
        <div className="card" style={{width: '18rem'}}>
          <Img className='card-img-top' src={copy.avatar_url} loader={spinner} unloader={Error}/>
          <div className="card-body">
            <p className="card-text">{copy.login}</p>
            <p className="card-text">{copy.description}</p>
          </div>
        </div>
      );
    }
  }

export default Org;
