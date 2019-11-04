import Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import JA from 'blockly/msg/ja.js';
import styles from './BlocklyUi.css';
import { buildKintone } from './kintone-block';
import categoryXml from './category.xml';
import * as React from 'react';
import { CustomizeJsUpdater } from './CustomizeJsUpdater';
import { Field } from './schema/Field';
import { Box, AppBar, Toolbar, IconButton, Typography, Input, Button, Menu, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { WorkspaceLoader } from './usecase/WorkspaceLoader';
import { WorkspaceExporter } from './usecase/WorkspaceExporter';

Blockly.setLocale(JA);

type BlocklyUiProps = {
    visible: boolean;
    sourceXml: string;
    handleCloseEditor: () => void;
    fields: Field[];
};

type BlocklyUiState = {
    workspace: Blockly.Workspace;
    menuElement: null | HTMLElement;
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
        this.handleExportJavaScript = this.handleExportJavaScript.bind(this);
        this.handleOpenExportMenu = this.handleOpenExportMenu.bind(this);
        this.handleCloseExportMenu = this.handleCloseExportMenu.bind(this);
        this.handleToJavaScript = this.handleToJavaScript.bind(this);

        this.state = { workspace: null, menuElement: null };
    }

    handleOpenExportMenu(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({ menuElement: event.currentTarget });
    }

    handleCloseExportMenu() {
        this.setState({ menuElement: null });
    }

    componentDidMount() {
        const toolbox: Element = Blockly.Xml.textToDom(categoryXml);
        const kintoneCategory: Element = toolbox.querySelector('[name=Kintone]');

        buildKintone(Blockly.Blocks, Blockly.JavaScript, kintoneCategory, this.props.fields);

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
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(this.props.sourceXml), workspace);
        this.setState({ workspace: workspace, menuElement: null });
    }

    handleImportXml() {
        const file = this.importFile.current.files[0];
        if (file != null) {
            new WorkspaceLoader().load(this.state.workspace, file);
        }
    }

    handleExportXml() {
        new WorkspaceExporter().exportXml(this.state.workspace);
        this.handleCloseExportMenu();
    }

    handleExportJavaScript() {
        new WorkspaceExporter().exportJavaScript(this.state.workspace);
        this.handleCloseExportMenu();
    }

    handleToJavaScript() {
        new CustomizeJsUpdater().uploadCustomizeCode(
            Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace)),
            Blockly.JavaScript.workspaceToCode(this.state.workspace)
        ).then(() => {
            location.reload();
        });
    }

    componentDidUpdate() {
        Blockly.svgResize(this.state.workspace);
    }

    render() {
        return (
            <React.Fragment>
                <AppBar style={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.props.handleCloseEditor} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Box flex={1} marginLeft={4}>
                            <Typography variant="h6">KintoneBlockly</Typography>
                        </Box>
                        <Button color="inherit" aria-label="upload code" component="label" startIcon={<ArrowUpwardIcon />} >
                            Import
                            <input ref={this.importFile} type="file" style={{ display: "none" }} onChange={this.handleImportXml} />
                        </Button>
                        <Button color="inherit" aria-label="download code" onClick={this.handleOpenExportMenu} startIcon={<ArrowDownwardIcon />}>
                            Export
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.menuElement}
                            keepMounted
                            open={Boolean(this.state.menuElement)}
                            onClose={this.handleCloseExportMenu} >
                            <MenuItem onClick={this.handleExportXml}>XML</MenuItem>
                            <MenuItem onClick={this.handleExportJavaScript}>JavaScript</MenuItem>
                        </Menu>
                        <Button color="inherit" aria-label="deploy code" onClick={this.handleToJavaScript} startIcon={<SaveAltIcon />}>
                            Deploy
                        </Button>
                    </Toolbar>
                </AppBar>
                <div ref={this.blocklyDiv} className={styles['blocklyDiv']} />
            </React.Fragment >
        );
    }
}
