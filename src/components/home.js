import React, { Component } from 'react';

class Home extends Component{
  state ={
    anim: "alert animated fadeIn"
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.count !== this.props.count) {
      this.setState({ anim: "alert" }, () => {
        setTimeout(() => this.setState({ anim: "alert animated fadeIn" }), 0)
      })
    }
  }

  render(){
    return(
      <div>
        <div className={this.state.anim} role="alert">
          <h4 className="alert-heading">Welcome!</h4>
          <p>Here you can check information of github organizations!</p>
          <hr />
          <p className="mb-0">All you need to do is just click on organization in the list.</p>
        </div>
      </div>
    );
  }
}

export default Home;
