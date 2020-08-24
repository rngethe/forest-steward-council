import React from 'react'
import { Link } from 'gatsby'
import storage from 'storage'
import { Button } from '@hackclub/design-system'

export const destroySession = () => {
  storage.remove('authToken')
  storage.remove('userId')
  window.reload()
}

Button.link = Button.withComponent(Link)

export default props => (
  <Button.link to="/" onClick={destroySession} children="Logout" {...props} />
)
