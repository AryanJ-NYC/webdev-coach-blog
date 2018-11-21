import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid';
import withRoot from '../../withRoot';
import Card from '../../components/Card';

class IndexPage extends React.Component {
  render() {
    const { data: { allMarkdownRemark: { edges: posts }}} = this.props

    return (
      <Grid spacing={16} justify="center" container>
        {posts.map(({ node: post }) => (
          <Grid item xs={11} sm={10} key={post.id}>
            <Card post={post} />
          </Grid>
        ))}
      </Grid>
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

export default withRoot(IndexPage);

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
