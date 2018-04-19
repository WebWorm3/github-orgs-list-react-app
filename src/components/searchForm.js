import React, {Component} from 'react';


class SearchForm extends Component{

  state = {
    input: '',
    anim: "form-control animated fadeIn"
  }

  update = (e) => {
    this.props.onUpdate(e.target.value);
    this.setState({input: e.target.value});
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.count !== this.props.count) {
      this.setState({ anim: "form-control" }, () => {
        setTimeout(() => this.setState({ anim: "form-control animated fadeIn" }), 0)
      })
    }
  }

  render() {
    return (
        <input className={this.state.anim} type="text" placeholder="You can also find an array of 30 orgs here by id." onChange={this.update} value={this.state.fieldVal} />
    )
  }
}

export default SearchForm;
