import { render } from '@testing-library/react';
import { DeployDialog } from './DeployDialog';
import * as React from 'react';

test('close dialog test', () => {
  const { queryByText, getByLabelText, getByText } = render(
    <DeployDialog
      open={false}
      deploying={false}
      handleDeploy={deployMessage => {}}
      handleCloseDialog={() => {}}
    />,
  );
});
