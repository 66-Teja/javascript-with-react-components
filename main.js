const timerStyles = {
  margin: 0,
  padding: 20,
  backgroundColor: 'tomato',
  color: 'white'
};

const timerButtonsContainerStyle = {
  overflow: 'hidden'
};
const timerButtonStyle = {
  float: 'right'
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      seconds: 0
    };
  }
  
  startTimer() {
    const self = this;
    this.interval = setInterval(function() {
      var seconds = self.state.seconds;
      self.setState({
        seconds: seconds+1
      })
    }, 500);    
  }
  
  stopTimer() {
    clearInterval(this.interval);
  }
  
  resetTimer() {
    this.setState({
      seconds: 0
    });
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div className="timer" style={timerStyles}>
        <div className="elapsed clearfix">
          <h4 className="pull-left">Elapsed: {this.state.seconds}</h4>
          <div className="btn-group pull-right">
            <button className="btn btn-default" style={timerButtonStyle} type="button" onClick={this.startTimer.bind(this)}>Start</button>
            <button className="btn btn-default"  style={timerButtonStyle} type="button" onClick={this.stopTimer.bind(this)}>Stop</button>
            <button className="btn btn-default" style={timerButtonStyle} type="button" onClick={this.resetTimer.bind(this)}>Reset</button>
          </div>
        </div>
      </div>
    )
  }
}

function App(props) {
  return (
    <div className="app">
      <div className="container-fluid">
        {props.children}
      </div>
    </div>
  );
}

function renderNavLinks(link) {
  const { text, active } = link;
  return (
    <li className={active ? 'active' : null}><a href="#">{text}</a></li>
  );
}

function Nav(props) {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand">{props.brand}</a>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            {props.links.map(renderNavLinks)}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Salute(props) {
  return (
    <h1>Hello, {props.name}</h1>
  );
}

function Hello(props) {
  return (
    <div className="hello">
      {props.children}
      <p>Good to see you...!</p>
    </div>
  );
}

const links = [
  {
    text: 'Home',
  },
  {
    text: 'About',
    active: true
  },
  {
    text: 'Portfolio'
  },
  {
    text: 'Contact'
  }
]
const myApp = (
  <App>
    <Nav brand="Logo" links={links} />
    <Hello>
      <Timer />
      <Salute name="there" />
      <Timer />
    </Hello>
  </App>
);

ReactDOM.render(
  myApp,
  document.getElementById('container')
);
