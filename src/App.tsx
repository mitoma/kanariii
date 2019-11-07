import { BlocklyUi } from "./BlocklyUi";
import * as React from "react";
import { Field } from "./schema/Field";
import { Button } from "@material-ui/core";
import BuildIcon from '@material-ui/icons/Build';
import styles from './App.css';

type AppProps = {
    sourceXml: string;
    fields: Field[];
}

type AppState = {
    sourceXml: string;
    showBlocklyEditor: boolean;
}

export class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = { showBlocklyEditor: false, sourceXml: props.sourceXml };

        this.handleOpenEditor = this.handleOpenEditor.bind(this);
        this.handleCloseEditor = this.handleCloseEditor.bind(this);
        this.handleUpdateSourceXml = this.handleUpdateSourceXml.bind(this);
    }

    handleOpenEditor() {
        this.setState({ showBlocklyEditor: true });
    }

    handleCloseEditor() {
        this.setState({ showBlocklyEditor: false });
    }

    handleUpdateSourceXml(sourceXml: string) {
        this.setState({ sourceXml: sourceXml });
    }

    render() {
        return (
            <React.Fragment>
                <Button startIcon={<BuildIcon />} color="inherit" onClick={this.handleOpenEditor} aria-label="open blockly">
                    open blockly
                </Button>
                <div className={this.state.showBlocklyEditor ? styles['showMordalBackground'] : styles['hideMordalBackground']} onClick={this.handleCloseEditor}></div>
                <div className={this.state.showBlocklyEditor ? styles['showBlocklyUi'] : styles['hideBlocklyUi']}>
                    <BlocklyUi
                        visible={true}
                        handleCloseEditor={this.handleCloseEditor}
                        handleUpdateSourceXml={this.handleUpdateSourceXml}
                        sourceXml={this.state.sourceXml}
                        fields={this.props.fields}
                    />
                </div>
            </React.Fragment>
        );
    }
}
