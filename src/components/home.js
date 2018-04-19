import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{
  state ={
    searchOne: '',
    anim1: "alert animated fadeIn",
    anim2: "form-control animated fadeIn",
  }

  update = (e) => {
    this.setState({searchOne: e.target.value});
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.count !== this.props.count) {
      this.setState({ anim1: "alert", anim2: "form-control" }, () => {
        setTimeout(() => this.setState({ anim1: "alert animated fadeIn", anim2: "form-control animated fadeIn" }), 0)
      })
    }
  }

  render(){
    return(
      <div>
        <div className={this.state.anim1} role="alert">
          <h4 className="alert-heading">Welcome!</h4>
          <p>Here you can check information of github organizations!</p>
          <hr />
          <p className="mb-0">All you need to do is just click on organization in the list.</p>
          <hr />
          <input className={this.state.anim2} type="text" placeholder="You can find your org by login here." onChange={this.update} value={this.state.searchOne} />
          <br />
          <Link to={'/org/' + this.state.searchOne} className="btn btn-light">Search</Link>
        </div>
      </div>
    );
  }
}

export default Home;
