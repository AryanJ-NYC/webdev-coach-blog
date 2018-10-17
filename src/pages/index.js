import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid';
import Card from '../components/Card';
import Layout from '../components/Layout'
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    marginTop: '2vh',
  },
};

class IndexPage extends React.Component {
  render() {
    const { classes, data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <Grid className={classes.root} container spacing={16} justify="center">
          {posts.map(({ node: post }) => (
            <Grid item xs={12} sm={10}>
              <Card post={post} />
            </Grid>
          ))}
        </Grid>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default withStyles(styles)(IndexPage);

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
