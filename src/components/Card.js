import React from 'react';
import { Link } from 'gatsby'
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const CardComponent = ({ post }) => (
  <Card
    key={post.id}
  >
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2" color="secondary">
        {post.frontmatter.title}
      </Typography>
      <Typography component="p" color="textPrimary">
        {post.excerpt}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" component={Link} to={post.fields.slug} color="secondary">
        Keep Reading →
      </Button>
    </CardActions>
  </Card>
);

export default withStyles()(CardComponent);
