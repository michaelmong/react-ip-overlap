import React from 'react';
import logo from './logo.svg';
import './App.css';

const GetInput = (input, handle) => {
//  this.props.input;
//  this.props.handle;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = { ip: "10.10.10.10", ipdec: 10 };
  }

  handleOnChange(event){
    this.setState({
       ip: event.target.value,
    });
    let ip1 = this.state.ip.split(".");
    this.setState({
      ipdec: ip1,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>IP Address:</div><input value={this.state.ip} onChange={this.handleOnChange} />
          <div style={{fontSize:14}}>Searching {this.state.ip} ... found in {this.state.ipdec}</div>
        </header>
        <article className="App-article">
          <div>Hello {this.props.para1}</div>
        </article>
        <footer className="App-footer">
          <div>Script by Mongkol Thamwongskul. Powered by React.</div>
        </footer>
      </div>
    )
  };
}

export default App;
