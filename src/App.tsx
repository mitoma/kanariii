import { BlocklyUi } from "./BlocklyUi";
import * as React from "react";
import { Field } from "./schema/Field";

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
    }

    handleToggleEditor() {
        this.setState({ showBlocklyEditor: !this.state.showBlocklyEditor });
    }

    render() {
        return (
            <React.Fragment>
                <a onClick={this.handleToggleEditor} >アプリをカスタマイズ</a>
                <BlocklyUi
                    visible={this.state.showBlocklyEditor}
                    handleToggleEditor={this.handleToggleEditor}
                    sourceXml={this.props.sourceXml}
                    fields={this.props.fields}
                />
            </React.Fragment>
        );
    }
}
