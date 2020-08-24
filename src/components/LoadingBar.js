import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Box, Loading } from '@hackclub/design-system'


const Base = styled(Box)`
  position: relative;
  ${props => props.fill && { height: '100vh' }};
  div {
    border-radius: 50%;
  }
`

const LoadingBar = props => (
  <Base py={5} {...props}>
    <Loading />
  </Base>
)

LoadingBar.propTypes = {
  fill: PropTypes.bool
}

export default LoadingBar
