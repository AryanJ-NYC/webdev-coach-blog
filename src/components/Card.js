import React from 'react';
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  titleLink: {
    textDecoration: 'none',
  }
};

const CardComponent = ({ post }) => (
  <Card>
    <CardContent>
      <Link style={styles.titleLink} to={post.fields.slug}>
        <Typography
          variant="h5"
          component="h2"
          color="secondary"
          gutterBottom
        >
          {post.frontmatter.title}
        </Typography>
      </Link>
      <Typography component="p" color="textPrimary">
        {post.excerpt}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" component={Link} to={post.fields.slug} color="secondary" disableRipple>
        Keep Reading →
      </Button>
    </CardActions>
  </Card>
);

export default CardComponent;
