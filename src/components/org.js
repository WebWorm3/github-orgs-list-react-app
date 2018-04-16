import React, { Component } from 'react';
import Img from 'react-image';
import ErrorImage from '../images/error.png';

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

  const Fail = (
    <img className="card-img-top" src={ErrorImage} />
  );

  class Org extends Component {
    state = {
      org: [],
      anim: "card bg-light animated zoomIn"
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.count !== this.props.count) {
        this.setState({ anim: "card bg-ligh " }, () => {
          setTimeout(() => this.setState({ anim: "card bg-light animated zoomIn" }), 0)
        })
        fetch('https://api.github.com/orgs/' + nextProps.login)
        .then(res => res.json())
        .then(res => {
          this.setState({org: res});
          console.log(this.state.org);
        });
      }
    }

    render(){
      return(
        <div>
          <div className={this.state.anim} ref="box" style={{width: '18rem'}}>
              <Img className='card-img-top' src={this.state.org.avatar_url} loader={spinner} unloader={Fail}/>
              <div className="card-body">
                <p className="card-text">{this.state.org.name ? this.state.org.name : this.state.org.login}</p>
                <p className="card-text">{this.state.org.location ? this.state.org.location : "No location..."}</p>
                <p className="card-text">{this.state.org.description ? this.state.org.description : "No description..."}</p>
              </div>
          </div>
        </div>
      );
    }
  }


export default Org;
