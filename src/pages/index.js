import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'

import storage from 'storage'
import { Flex, Heading, LargeButton, Text } from '@hackclub/design-system'
import styled from 'styled-components'

import Pulse from 'pulse'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import ApplyNav from 'components/apply/ApplyNav'
import Sheet from 'components/Sheet'
import Main from 'components/apply/Main'
import LoginForm from 'components/auth/EmailLoginForm'
import LoadingBar from 'components/LoadingBar'

LargeButton.link = LargeButton.withComponent(Link)

const Full = styled(Flex).attrs({
  flexDirection: 'column',
  align: 'center',
  justify: 'center',
  p: 3
})`
  width: 100vw;
  height: 100vh;
`

export default class extends Component {
  state = {
    status: 'loading',
    app: undefined,
    userId: undefined
  }


  content() {
    const { app, status, userId } = this.state
    switch (status) {
      case 'needsToAuth':
        return (
          <Full>
            <Pulse />
            <Sheet
              maxWidth={36}
              bg="black"
              color="white"
              align="left"
              style={{ mixBlendMode: 'multiply' }}
            >
              <Heading.h1 fontSize={6} style={{ lineHeight: '1.125' }}>
                Forest Steward Council
              </Heading.h1>
              <Text fontSize={4} mt={2} mb={3}>
                Use this tool to assess if your qualification meet our requirements for certification.
              </Text>
              <LoginForm
                bg="black"
                color="white"
                textProps={{ color: 'black', align: 'left', fontSize: 3 }}
              />
            </Sheet>
          </Full>
        )
      case 'loading':
        return <LoadingBar fill />
      case 'finished':
        return (
          <Fragment>
            <ApplyNav breadcrumb={false} />
            <Pulse />
            <Main
              app={app}
              userId={userId}
              callback={this.populateApplications}
              resetCallback={this.resetApplication}
            />
          </Fragment>
        )
      default:
        return (
          <Text color="error" py={4}>
            Something terrible has happened.
          </Text>
        )
    }
  }

  render() {
    return (
      <Layout>
        <Helmet title="Forest Steward Council" />
        {this.content()}
      </Layout>
    )
  }
}
