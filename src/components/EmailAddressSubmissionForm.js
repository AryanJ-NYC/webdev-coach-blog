import React, { Component } from 'react';
import { TextField, Button, Typography, withStyles } from '@material-ui/core';

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 'min-content',
  },
  textField: {
    width: 200,
  },
};

class EmailAddressSubmissionForm extends Component {
  state = {
    email: '',
    isValid: true,
    success: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const emails = [{ email: this.state.email }];
    const response = await fetch('https://api.sendgrid.com/v3/contactdb/recipients', {
      body: JSON.stringify(emails),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer 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',
      },
      method: 'post',
    });
    const body = await response.json();
    if (body.error_count) {
      this.setState({ isValid: false });
    } else {
      this.setState({ email: '', success: true });
      setTimeout(() => this.setState({ success: false }), 4000);
    }
  };

  validate = event => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({
      isValid: re.test(String(event.target.value).toLowerCase()),
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.formContainer} onSubmit={this.handleSubmit}>
        <div>
          <TextField
            id="email-address"
            className={classes.textField}
            label="Email Address"
            onChange={this.handleChange('email')}
            margin="normal"
            type="email"
            onBlur={this.validate}
            value={this.state.email}
            error={!this.state.isValid}
            required
          />
          <Button color="primary" className={classes.button} variant="contained" type="submit">
            Submit
          </Button>
          {this.state.success && <Typography>Thank you for joining my mailing list!</Typography>}
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(EmailAddressSubmissionForm);
