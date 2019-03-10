import React from 'react';
import { Typography } from '@material-ui/core';
import EmailAddressSubmissionForm from './EmailAddressSubmissionForm';
import FormContainer from './FormContainer';

function CallToAction({ headerColor = 'primary' }) {
  return (
    <FormContainer>
      <Typography color={headerColor} variant="h4" gutterBottom>
        Join My Mailing List
      </Typography>
      <Typography gutterBottom>
        I'm currently working on a <strong>Web Development Starter Kit</strong>. It will be a pack of content that'll
        set you on the right path to leave that 💩 job and learn the foundational concepts needed to be a web developer.
      </Typography>
      <Typography gutterBottom>For an email on when that's released, join my mailing list!</Typography>
      <EmailAddressSubmissionForm />
    </FormContainer>
  );
}

export default CallToAction;
