import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import storage from 'storage'
//import LoginButton from 'components/auth/LoginButton'
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
import { useAuth0 } from '@auth0/auth0-react';
//import EmailLoginForm from 'components/auth/EmailLoginForm'
import LoadingBar from 'components/LoadingBar'

LargeButton.link = LargeButton.withComponent(Link)

const IndexPage = () => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ApplyNav />

      <Router>
        <ProtectedRoute path="/components/apply/Main" component={Main} />
      </Router>
    </>
  );
};

export default IndexPage;

