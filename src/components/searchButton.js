import React, {Component} from 'react';

class SearchButton extends Component{

  state = {
    anim: "btn btn-light animated fadeIn"
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.count !== this.props.count) {
      this.setState({ anim: "btn btn-light" }, () => {
        setTimeout(() => this.setState({ anim: "btn btn-light animated fadeIn" }), 0)
      })
    }
  }

  render(){
    return(
      <button className={this.state.anim} onClick={this.props.clickFunc}>Search</button>
    );
  }
}

export default SearchButton;
