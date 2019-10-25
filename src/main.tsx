import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BlocklyUi } from './ui';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>Kintone with Blockly</div>
        <BlocklyUi />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
/*
モーダルのCSSメモ
mordalElementFg.style.cssText = `display: on;
                                     width: 90%;
                                     height: 90%;
                                     margin: 0;
                                     padding: 0;
                                     background-color: #ffffff;
                                     color: #666666;
                                     position:fixed;
                                     top: 5%;
                                     left: 5%;
                                     z-index: 101;`;
mordalElementBg.style.cssText = `display:on;
                                     width:100%;
                                     height:100%;
                                     background-color: rgba(0,0,0,0.5);
                                     position:fixed;
                                     top:0;
                                     left:0;
                                     z-index: 100;`;
*/