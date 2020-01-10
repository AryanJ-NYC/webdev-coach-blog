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
        name: `devto`,
        url: `https://dev.to/aryanjnyc`,
      },
      {
        name: `github`,
        url: `https://github.com/AryanJ-NYC`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/aryanjabbari`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/thewebdevcoach/`,
      },
    ],
  },
  plugins: [
    {
      resolve: '@narative/gatsby-theme-novela',
      options: {
        mailchimp: true,
        sources: { local: true },
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://gmail.us3.list-manage.com/subscribe/post?u=7d1500e47fd7aa0bd674cab1e&amp;id=85ef56880a',
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
