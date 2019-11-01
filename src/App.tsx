import { BlocklyUi } from "./BlocklyUi";
import * as React from "react";
import { Field } from "./schema/Field";
import { Dialog, Button } from "@material-ui/core";
import BuildIcon from '@material-ui/icons/Build';

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

        this.handleOpenEditor = this.handleOpenEditor.bind(this);
        this.handleCloseEditor = this.handleCloseEditor.bind(this);
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
                <Button startIcon={<BuildIcon />} color="inherit" onClick={this.handleOpenEditor} aria-label="open blockly">
                    open blockly
                </Button>
                <Dialog
                    maxWidth={'xl'}
                    open={this.state.showBlocklyEditor}
                    onClose={this.handleCloseEditor}
                    style={{ zIndex: 200 }}>
                    <BlocklyUi
                        visible={true}
                        handleCloseEditor={this.handleCloseEditor}
                        sourceXml={this.props.sourceXml}
                        fields={this.props.fields}
                    />
                </Dialog>
            </React.Fragment>
        );
    }
}
