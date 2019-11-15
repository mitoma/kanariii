import * as React from 'react';
import {
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  List,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
      <Dialog
        open={props.open}
        onClose={props.handleCloseDialog}
        fullWidth={true}
        maxWidth={'md'}>
        <DialogTitle>History</DialogTitle>
        <DialogContent>
          <List component="nav">{revisionList}</List>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CloseIcon />} onClick={props.handleCloseDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
