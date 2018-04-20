import React, { Component } from 'react';
import Img from 'react-image';
import ErrorImage from '../images/error.png';
import access_token from '../github-api-token';

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
      anim: "card bg-light animated fadeIn",
      loader: false,
    }

    componentDidMount(){
      this.setState({loader: true});
      fetch('https://api.github.com/orgs/' + this.props.login + '?access_token=' + access_token)
      .then(res => res.json())
      .then(res => {
        this.setState({ org: res, loader: false });
        console.log(this.state.org);
      });
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.count !== this.props.count) {
        this.setState({ anim: "card bg-ligh " }, () => {
          setTimeout(() => this.setState({ anim: "card bg-light animated fadeIn", loader: true }), 0)
        })
        fetch('https://api.github.com/orgs/' + nextProps.login + '?access_token=' + access_token)
        .then(res => res.json())
        .then(res => {
          this.setState({ org: res, loader: false });
          console.log(this.state.org);
        });
      }
    }
    render(){
      if (this.state.loader){
        return null;
      }
      else{
        return(
          <div>
            <div className={this.state.anim} ref="box" style={{width: '18rem'}}>
                <Img className='card-img-top' src={this.state.org.avatar_url} loader={spinner} unloader={Fail}/>
                <div className="card-body">
                  <p className="card-text"><b><a href={this.state.org.html_url} target="_blank">{this.state.org.name ? this.state.org.name : this.state.org.login}</a></b></p>
                  {this.state.org.email ? (
                    <p className="card-text">{this.state.org.email}</p>
                  ) : null}
                  {this.state.org.blog ? (
                    <p className="card-text"><a href={this.state.org.blog} target="_blank">[Blog]</a></p>
                  ) : null}
                  {this.state.org.location ? (
                    <p className="card-text">{this.state.org.location}</p>
                  ) : null}
                  {this.state.org.description ? (
                    <p className="card-text">{this.state.org.description}</p>
                  ) : null}
                </div>
            </div>
          </div>
        );
      }
    }
  }


export default Org;
