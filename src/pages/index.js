import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import storage from 'storage'
import { Flex, Heading, Button, LargeButton, Text } from '@hackclub/design-system'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Pulse from 'pulse'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import ApplyNav from 'components/apply/ApplyNav'
import Sheet from 'components/Sheet'
import Main from 'components/apply/Main'
import api from 'api'
//import EmailLoginForm from 'components/auth/EmailLoginForm'
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
//start

export default class extends Component {
  state = {
    status: 'loading',
    app: undefined,
    userId: undefined
  }

  export default function Home() {

  let [loggedIn, setLoggedIn] = useState(api.isAuthenticated)

  useEffect(() => {
    let isCurrent = true
    api.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(!!user)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [])

  let login = () => {
    api.authenticate((user) => {
      setLoggedIn(!!user)
    })
  }
  
  }

//end



  content() {    
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
        {loggedIn ? (
          <div>
            <Button.link to="/apply/main" align="center" onClick={login} children="Start Application" />
          </div>
        ) : (
          <Button.link onclick={login} children="Get Started >>" />
        )}
    
            <br />
          
              <Text fontSize={4} mt={2} mb={3}>
              Due to Covid-19 health measures, applications will be processed in the order they were received.
              <br />
              <a href="https://fsc.org/en/newsfeed/covid-19-update-for-cbs" target="_blank" rel="noopener noreferrer">
              Learn More
              </a>
              </Text>
            </Sheet>
          </Full>
        )
   
    }
  //}

  render() {
    return (
      <Layout>
        <Helmet title="Forest Steward Council" />
        {this.content()}
      </Layout>
    )
  }
}
