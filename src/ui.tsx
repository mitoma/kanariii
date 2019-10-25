import Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import * as JA from 'blockly/msg/ja.js';
import styles from './ui.css';
import { buildKintone } from './kintone-block';
import categoryXml from './category.xml';
import * as React from 'react';


type BlocklyUiProps = {
};

type BlocklyUiState = {
    workspace: Blockly.Workspace;
}

export class BlocklyUi extends React.Component<BlocklyUiProps, BlocklyUiState>  {
    blocklyDiv: React.RefObject<HTMLDivElement>;

    constructor(props: BlocklyUiProps) {
        super(props);
        this.blocklyDiv = React.createRef();

        // binds
        this.handleExportXml = this.handleExportXml.bind(this);
        this.handleToJavaScript = this.handleToJavaScript.bind(this);
    }

    componentDidMount() {
        const kintoneCategory = buildKintone(Blockly.Blocks, Blockly.JavaScript);

        Blockly.setLocale(JA);

        const toolbox = Blockly.Xml.textToDom(categoryXml);

        toolbox.appendChild(kintoneCategory);

        const zoom = {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
        };

        let workspace = Blockly.inject(
            this.blocklyDiv.current,
            {
                toolbox: toolbox,
                media: 'media/',
                trashcan: true,
                zoom: zoom,
            },
        );
        this.setState({ workspace: workspace });
    }

    handleExportXml() {
        console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace)));
    }

    handleToJavaScript() {
        console.log(Blockly.JavaScript.workspaceToCode(this.state.workspace));
    }

    render() {
        return (
            <React.Fragment>
                <input type="button" value="importXML"></input>
                <input type="button" value="exportXML" onClick={this.handleExportXml}></input>
                <input type="button" value="to JavaScript" onClick={this.handleToJavaScript}></input>
                <div ref={this.blocklyDiv} id='blocklyDiv' className={styles['blocklyDiv']}></div>
            </React.Fragment>
        );
    }
}
