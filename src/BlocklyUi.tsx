import Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import JA from 'blockly/msg/ja.js';
import styles from './BlocklyUi.css';
import { buildKintone } from './kintone-block';
import categoryXml from './category.xml';
import * as React from 'react';

type BlocklyUiProps = {
    visible: boolean;
    handleToggleEditor: () => void;
};

type BlocklyUiState = {
    workspace: Blockly.Workspace;
}

export class BlocklyUi extends React.Component<BlocklyUiProps, BlocklyUiState>  {
    importFile: React.RefObject<HTMLInputElement>;
    blocklyDiv: React.RefObject<HTMLDivElement>;

    constructor(props: BlocklyUiProps) {
        super(props);
        this.importFile = React.createRef();
        this.blocklyDiv = React.createRef();

        // binds
        this.handleImportXml = this.handleImportXml.bind(this);
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

        const workspace = Blockly.inject(
            this.blocklyDiv.current,
            {
                toolbox: toolbox,
                trashcan: true,
                zoom: zoom,
            },
        );
        this.setState({ workspace: workspace });
    }

    handleImportXml() {
        if (this.importFile.current.files[0] != null) {
            const file = this.importFile.current.files[0];
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            // よくわからないが ProgressEvent から target.result が取れないのじゃよ。
            // https://github.com/microsoft/TypeScript/issues/4163#issuecomment-321942932
            reader.onload = (event: ProgressEvent) => {
                const xmlString = reader.result;
                this.state.workspace.clear();
                Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlString), this.state.workspace);
            };
        }
    }

    handleExportXml() {
        const filename = 'kintone-blockly.xml';
        const xmlData = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace));
        const blob = new Blob([xmlData], { "type": "application/xml" });
        const link = document.createElement('a');
        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }

    handleToJavaScript() {
        // TODO JavaScript を kintone にアップロードする。
        console.log(Blockly.JavaScript.workspaceToCode(this.state.workspace));
    }

    componentDidUpdate() {
        Blockly.svgResize(this.state.workspace);
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles[this.props.visible ? 'mordalBackground' : 'hide']}
                    onClick={this.props.handleToggleEditor} />
                <div className={styles[this.props.visible ? 'showBlocklyUi' : 'hide']}>
                    <input ref={this.importFile} type="file" />
                    <input type="button" value="importXML" onClick={this.handleImportXml} />
                    <input type="button" value="exportXML" onClick={this.handleExportXml} />
                    <input type="button" value="to JavaScript" onClick={this.handleToJavaScript} />
                    <div ref={this.blocklyDiv} className={styles['blocklyDiv']} />
                </div>
            </React.Fragment >
        );
    }
}
