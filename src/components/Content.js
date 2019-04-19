import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  htmlContent: {
    'h1, h2': {
      color: 'orange',
    },
  },
});

export const HTMLContent = withStyles(styles)(({ content, classes }) => (
  <div className={classes.root} dangerouslySetInnerHTML={{ __html: content }} />
));

const Content = ({ content, className }) => <div className={className}>{content}</div>;

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
