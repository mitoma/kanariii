import * as React from 'react';
import {
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  List,
} from '@material-ui/core';
import { WorkspaceLoader } from '../usecase/WorkspaceLoader';
import { Revision } from '../history/Revision';
import * as Blockly from 'blockly';

type HistoryDialogProps = {
  revisions: Revision[];
  workspace: Blockly.Workspace;
  open: boolean;
  handleCloseDialog: () => void;
};

export function HistoryDialog(props: HistoryDialogProps) {
  const workspaceLoader = new WorkspaceLoader();

  const revisionList = props.revisions
    .slice()
    .reverse()
    .map(revision => {
      const title = `${revision.message}`;
      const message = `Revision: ${
        revision.revisionId
      }, DeployDate: ${revision.deployDate.toLocaleString()}`;
      function rollbackWorkspace() {
        workspaceLoader.loadByString(props.workspace, revision.source);
        props.handleCloseDialog();
      }
      return (
        <ListItem key={revision.revisionId} button>
          <ListItemText
            primary={title}
            secondary={message}
            onClick={rollbackWorkspace}
          />
        </ListItem>
      );
    });
  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleCloseDialog}>
        <DialogTitle>History</DialogTitle>
        <List component="nav">{revisionList}</List>
      </Dialog>
    </React.Fragment>
  );
}
