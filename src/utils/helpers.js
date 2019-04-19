import React from 'react';
import Typography from '@material-ui/core/Typography';
import tokenize from 'hyntax/lib/tokenize';
import constructTree from 'hyntax/lib/construct-tree';

export const htmlToMaterialUiTypography = content => {
  const html = typeof content === 'string' ? constructTree(tokenize(content).tokens).ast.content : content;

  const children = html.children || html;
  return Object.values(children).map(attr => {
    const { content, nodeType } = attr;
    const { children, name: contentName, value } = content;
    const props = attr.content.attributes
      ? attr.content.attributes.reduce((prev, curr) => {
          if (curr.key.content === 'class') {
            prev.className = curr.value.content;
          } else {
            prev[curr.key.content] = curr.value.content;
          }
          return prev;
        }, {})
      : {};

    if (nodeType === 'text') {
      return value.content;
    }
    if (
      contentName === 'div' ||
      contentName === 'ul' ||
      contentName === 'ol' ||
      contentName === 'li' ||
      contentName === 'code' ||
      contentName === 'pre' ||
      contentName === 'strong' ||
      contentName === 'em'
    ) {
      const Tag = contentName;
      return <Tag {...props}>{htmlToMaterialUiTypography(children)}</Tag>;
    }
    if (contentName === 'h1' || contentName === 'h2') {
      const variant = contentName === 'h1' ? 'h4' : 'h5';
      return (
        <Typography variant={variant} color="secondary" gutterBottom>
          {htmlToMaterialUiTypography(children)}
        </Typography>
      );
    }
    if (contentName === 'p') {
      const hasImgChild = attr.children && attr.children[0].name === 'img';
      return (
        <Typography variant="body1" align={hasImgChild ? 'center' : 'left'} gutterBottom>
          {htmlToMaterialUiTypography(children)}
        </Typography>
      );
    }
    if (contentName === 'a') {
      return (
        <a {...props} target="_blank" rel="noopener noreferrer">
          {htmlToMaterialUiTypography(children)}
        </a>
      );
    }
    if (contentName === 'span') {
      const props = attr.content.attributes.reduce((prev, curr) => {
        if (curr.key.content === 'class') {
          prev.className = curr.value.content;
        } else {
          prev[curr.key.content] = curr.value.content;
        }
        return prev;
      }, {});
      return <span {...props}>{htmlToMaterialUiTypography(children)}</span>;
    }
    if (contentName === 'img') {
      return <img {...props} />;
    }
    return null;
  });
};
