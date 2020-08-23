module.exports = {
  siteMetadata: {
    title: 'Forest Steward Council',
    siteUrl: 'https://friendly-lamarr-26de6e.netlify.app'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Forest Steward Council',
        short_name: 'Forest Steward Council',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#e42d42',
        display: 'minimal-ui'
      }
    },
    {
      resolve: 'gatsby-plugin-segment',
      options: {
        writeKey: '35oTlU4UqlhIN8VGYmBxAzyDdfzhcscw'
      }
    }
  ]
}
