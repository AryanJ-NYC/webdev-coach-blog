import React from 'react'
import PropTypes from 'prop-types'
import { htmlToMaterialUiTypography } from '../utils/helpers';

export const HTMLContent = ({ content, className }) => (
  <div className={className}>{htmlToMaterialUiTypography(content)}</div>
)

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
