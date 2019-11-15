import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
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
      <Dialog
        open={props.open}
        onClose={props.handleCloseDialog}
        fullWidth={true}
        maxWidth={'md'}>
        <DialogTitle>Deploy</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Deploy Message"
            margin="normal"
            variant="outlined"
            defaultValue="empty message"
            onChange={handleMessageChange}
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CloseIcon />} onClick={props.handleCloseDialog}>
            Cancel
          </Button>
          <Button
            startIcon={<FlightTakeoffIcon />}
            onClick={handleDeploy}
            color="primary"
            autoFocus>
            Deploy It!
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={props.deploying}>
        <DialogTitle>Deploying</DialogTitle>
      </Dialog>
    </React.Fragment>
  );
}
