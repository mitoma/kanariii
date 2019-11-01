import { BlocklyUi } from "./BlocklyUi";
import * as React from "react";
import { Field } from "./schema/Field";
import { Typography, Dialog, IconButton, AppBar, Toolbar, Box } from "@material-ui/core";
import BuildIcon from '@material-ui/icons/Build';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SaveAltIcon from '@material-ui/icons/SaveAlt';


type AppProps = {
    sourceXml: string;
    fields: Field[];
}

type AppState = {
    showBlocklyEditor: boolean;
}

export class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = { showBlocklyEditor: false };

        this.handleToggleEditor = this.handleToggleEditor.bind(this);
        this.handleOpenEditor = this.handleOpenEditor.bind(this);
        this.handleCloseEditor = this.handleCloseEditor.bind(this);
    }

    handleToggleEditor() {
        this.setState({ showBlocklyEditor: !this.state.showBlocklyEditor });
    }

    handleOpenEditor() {
        this.setState({ showBlocklyEditor: true });
    }

    handleCloseEditor() {
        this.setState({ showBlocklyEditor: false });
    }

    render() {
        return (
            <React.Fragment>
                <IconButton edge="start" color="inherit" onClick={this.handleOpenEditor} aria-label="open blockly">
                    <BuildIcon >open blockly</BuildIcon>
                </IconButton>
                <Dialog maxWidth={'xl'} open={this.state.showBlocklyEditor} onClose={this.handleCloseEditor} style={{ zIndex: 200 }}>
                    <AppBar style={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleCloseEditor} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Box flex={1} marginLeft={4}>
                                <Typography variant="h6">KintoneBlockly</Typography>
                            </Box>
                            <IconButton color="inherit" aria-label="upload code">
                                <ArrowUpwardIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="download code">
                                <ArrowDownwardIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="deploy code">
                                <SaveAltIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <BlocklyUi
                        visible={true}
                        handleToggleEditor={this.handleToggleEditor}
                        sourceXml={this.props.sourceXml}
                        fields={this.props.fields}
                    />
                </Dialog>
            </React.Fragment>
        );
    }
}
