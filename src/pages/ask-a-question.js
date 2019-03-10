import React from 'react';
import { Typography } from '@material-ui/core';
import FormContainer from '../components/FormContainer';
import withRoot from '../withRoot';

const AskAQuestion = ({ headerColor = 'primary' }) => {
  return (
    <FormContainer>
      <Typography color={headerColor} variant="h4" gutterBottom>
        Ask A Question
      </Typography>
    </FormContainer>
  );
};

export default withRoot(AskAQuestion);
