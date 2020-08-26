import fetch from 'isomorphic-fetch'
import storage from 'storage'

import netlifyIdentity from 'netlify-identity-widget';

window.netlifyIdentity = netlifyIdentity;
// You must run this once before trying to interact with the widget
netlifyIdentity.init();

export default api
