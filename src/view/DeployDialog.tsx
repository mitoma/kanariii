import { Dialog, DialogTitle, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import * as React from 'react';

type DeployDialogProps = {
  open: boolean;
  deploying: boolean;
  handleDeploy: (deployMessage: string) => void;
  handleCloseDialog: () => void;
};

export function DeployDialog(props: DeployDialogProps) {
  const [deployMessage, setDeployMessage] = React.useState('empty message');

  function handleMessageChange(event: object) {
    // @ts-ignore
    setDeployMessage(event.target.value);
  }

  function handleDeploy() {
    props.handleDeploy(deployMessage);
    props.handleCloseDialog();
  }

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleCloseDialog}>
        <DialogTitle>Deploy</DialogTitle>
        <TextField
          id="outlined-basic"
          label="Deploy Message"
          margin="normal"
          variant="outlined"
          defaultValue="empty message"
          onChange={handleMessageChange}
        />
        <Button
          aria-label="ship it"
          onClick={handleDeploy}
          startIcon={<FlightTakeoffIcon />}>
          Deploy It!
        </Button>
        <Button
          aria-label="cancel"
          onClick={props.handleCloseDialog}
          startIcon={<CloseIcon />}>
          Cancel
        </Button>
      </Dialog>
      <Dialog open={props.deploying}>
        <DialogTitle>Deploying</DialogTitle>
      </Dialog>
    </React.Fragment>
  );
}
