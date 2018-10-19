import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <article>
      {helmet || ''}
      <Grid spacing={16} justify="center" container>
        <Grid xs={11} item>
          <Typography variant="h3" align="center">
            {title}
          </Typography>
        </Grid>
        <Grid xs={11} md={10} lg={9} item>
          <Typography variant="body1" gutterBottom>{description}</Typography>
          <PostContent content={content} />
          {tags && tags.length ? (
            <div style={{ marginTop: `2rem` }}>
              <Typography variant="h5">Tags</Typography>
              <List>
                {tags.map(tag => (
                  <ListItem button component={Link} to={`/tags/${kebabCase(tag)}/`} key={tag + `tag`}>
                    <ListItemText color="secondary" primary={tag} />
                  </ListItem>
                ))}
              </List>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </article>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={<Helmet title={`${post.frontmatter.title} | The WebDev Coach`} />}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
