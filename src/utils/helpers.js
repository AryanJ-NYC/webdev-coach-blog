import React from 'react';
import Typography from '@material-ui/core/Typography';
import HTML from 'html-parse-stringify';

export const htmlToMaterialUiTypography = content => {
  const html = typeof content === 'string' ? HTML.parse(content) : content;
  return Object.values(html).map(attr => {
    if (attr.type === 'text') {
      return attr.content;
    }
    if (attr.name === 'h1') {
      return (
        <Typography variant="h4" color="secondary" gutterBottom>{attr.children[0].content}</Typography>
      )
    }
    if (attr.name === 'p') {
      const hasImgChild = attr.children && attr.children[0].name === 'img';
      return (
        <Typography variant="body1" align={hasImgChild ? 'center' : 'left'} gutterBottom>
          {htmlToMaterialUiTypography(attr.children)}
        </Typography>
      );
    }
    if (attr.name === 'strong') {
      return <strong>{htmlToMaterialUiTypography(attr.children)}</strong>
    }
    if (attr.name === 'em') {
      return <em>{htmlToMaterialUiTypography(attr.children)}</em>
    }
    if (attr.name === 'a') {
      return (
        <a href={attr.attrs.href} target="_blank" rel="noopener noreferrer">
          {htmlToMaterialUiTypography(attr.children)}
        </a>
      );
    }
    if (attr.name === 'code') {
      return (
        <code>{htmlToMaterialUiTypography(attr.children)}</code>
      );
    }
    if (attr.name === 'img') {
      return <img src={attr.attrs.src} alt={attr.attrs.alt} />;
    }
    return null;
  })
}

