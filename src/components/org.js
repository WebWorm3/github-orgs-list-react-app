import React, { Component } from 'react';
import { render, findDOMNode, ReactDOM } from "react-dom";
import Img from 'react-image';
import {Animated} from "react-animated-css";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

  const Fail = () => (
    <p>Fail</p>
  );

  class Org extends Component {
    state = {
      anim: "card animated zoomIn"
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.count !== this.props.count) {
        this.setState({ anim: "card" }, () => {
          setTimeout(() => this.setState({ anim: "card animated zoomIn" }), 0)
        })
      }
  }

    render(){
      var copy = Object.assign({}, this.props.selectedOrg);
      return(
        <div>
          <div className={this.state.anim} ref="box" style={{width: '18rem'}}>
              <Img className='card-img-top' src={copy.avatar_url} loader={spinner} unLoader={Fail}/>
              <div className="card-body">
                <p className="card-text">{copy.login}</p>
                <p className="card-text">{copy.description ? copy.description : "No description"}</p>
              </div>
          </div>
        </div>
      );
    }
  }


export default Org;
