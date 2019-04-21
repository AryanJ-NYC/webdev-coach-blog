import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import withRoot from '../withRoot';
import CallToAction from '../components/CallToAction';
import Content, { HTMLContent } from '../components/Content';

export const BlogPostTemplate = ({ content, contentComponent, tags, title, helmet }) => {
  const PostContent = contentComponent || Content;
  return (
    <article>
      {helmet || ''}
      <Grid spacing={16} justify="center" container>
        <Grid xs={12} sm={11} item>
          <Typography variant="h3" align="center">
            {title}
          </Typography>
        </Grid>
        <Grid xs={11} md={10} lg={9} item>
          <PostContent content={content} />
          <CallToAction />
          {tags && tags.length ? (
            <div style={{ marginTop: `2rem` }}>
              <Typography variant="h5">Tags</Typography>
              <List>
                {tags.map(tag => (
                  <ListItem key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>
                      <ListItemText color="secondary" primary={tag} />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </article>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const { description, title, tags, twitterCardPicture } = post.frontmatter;
  const helmet = (
    <Helmet title={`${title} | The WebDev Coach`}>
      <meta name="Description" content={description} />
      <meta name="og:image" content={twitterCardPicture} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@aryanjabbari" />
      <meta name="twitter:site" content="@aryanjabbari" />
    </Helmet>
  );

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={description}
      helmet={helmet}
      tags={tags}
      title={title}
    />
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default withRoot(BlogPost);

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        title
        twitterCardPicture
      }
    }
  }
`;
