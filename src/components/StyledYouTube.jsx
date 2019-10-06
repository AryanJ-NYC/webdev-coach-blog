import React from 'react'
import YouTube from 'react-youtube';

const StyledYouTube = (props) => {
  return (
    <div style={{alignSelf: 'center'}}>
      <YouTube {...props} />
    </div>
  )
}

export default StyledYouTube
