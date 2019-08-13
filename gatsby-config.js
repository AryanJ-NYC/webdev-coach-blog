module.exports = {
  siteMetadata: {
    title: 'The WebDev Coach',
    name: 'The WebDev Coach',
    siteUrl: 'https://www.thewebdevcoach.com/',
    description: 'Learn web development with The WebDev Coach.',
    hero: {
      heading: 'Random ramblings about learning web development.',
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/aryanjabbari`,
      },
      {
        name: `youtube`,
        url: `https://www.youtube.com/c/thewebdevcoach`,
      },
      {
        name: `github`,
        url: `https://github.com/AryanJ-NYC`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/aryanjabbari`,
      },
    ],
  },
  plugins: [
    '@narative/gatsby-theme-novela',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-128084522-1',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        siteSpeedSampleRate: 10,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};
