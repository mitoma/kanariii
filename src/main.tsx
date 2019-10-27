import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BlocklyUi } from './ui';

type AppProps = {}

type AppState = {
  showBlocklyEditor: boolean;
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = { showBlocklyEditor: false };

    this.handleToggleEditor = this.handleToggleEditor.bind(this);
  }

  handleToggleEditor() {
    this.setState({ showBlocklyEditor: !this.state.showBlocklyEditor });
  }

  render() {
    return (
      <React.Fragment>
        <div>Kintone with Blockly</div>
        <input type="button" value="Toggle Blockly Editor" onClick={this.handleToggleEditor}></input>
        <BlocklyUi visible={this.state.showBlocklyEditor} handleToggleEditor={this.handleToggleEditor} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
