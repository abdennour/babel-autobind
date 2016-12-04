import React from 'react';

class ComponentWithoutBinding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(event) {
    this.setState({now: new Date().toString()})
    this.refs.span.innerHTML;
  }

  render(){
    return (
      <div>
        <button onClick={this.handleClick}>Refresh time</button>
        <span ref="span">{this.state.now}</span>
      </div>
     )
  }
}

export default ComponentWithoutBinding;
