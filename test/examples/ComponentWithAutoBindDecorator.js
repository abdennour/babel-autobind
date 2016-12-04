import React from 'react';
import autobind  from 'autobind-decorator';

@autobind
class ComponentWithAutoBindDecorator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick(event) {
    this.setState({now: new Date().toString()});
  }

  render() {
    return (
       <div>
         <button onClick={this.handleClick}>Refresh time</button>
         <span>{this.state.now}</span>
       </div>
    )
  }
}

export default ComponentWithAutoBindDecorator;
