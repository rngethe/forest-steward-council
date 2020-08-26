import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
//import api from 'api'
import styled, { css } from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Heading,
  Link as DSLink,
  Text,
  Icon,
  theme
} from '@hackclub/design-system'
import LeaderInvite from 'components/apply/LeaderInvite'
import { clubApplicationSchema } from 'components/apply/ClubApplicationForm'
import { Headline } from 'components/Content'
import Sheet from 'components/Sheet'
import SubmitButton from 'components/apply/SubmitButton'
import Status from 'components/apply/Status'
import storage from 'storage'

 const user = netlifyIdentity.currentUser();
 console.log({ user });

//const authToken = storage.get('authToken')

const P = props => <Text my={3} {...props} />

const A = styled(DSLink)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const Rejected = ({ resetCallback }) => (
  <Box mb={4}>
    <Heading.h3 color="error" mb={3}>
      Unfortunately, you’ve been rejected
    </Heading.h3>
    <P>
      You can start a new application by clicking{' '}
      <A onClick={resetCallback}>here</A>.
    </P>
  </Box>
)
const ContactBase = styled(Container).attrs({
  mt: [3, 4],
  px: [3, 4],
  py: 3,
  bg: 'blue.0'
})`
  border-radius: ${theme.radii[2]};
  display: flex;
  ${theme.mediaQueries.md} {
    align-items: center;
  }
`

const ContactInfo = () => (
  <ContactBase>
    <Icon glyph="announcement" size={36} mr={[2, 3]} color="info" />
    <Box color="info" fontSize={2} align="left">
      <Text>
        PleaseIf you want to contact us regarding certification. We're
        available to email at{' '}
        <a href="mailto:info@fsc.org">
          <strong>info@fsc.org</strong>
        </a>{' '}
        and over text / phone at{' '}
        <a href="tel:49-228-367-660">
          <strong>49-228-367-660</strong>
        </a>
        .
      </Text>
    </Box>
  </ContactBase>
)

const SectionBase = styled(Flex).attrs({
  py: 4,
  px: [3, 0],
  mx: [-3, 0],
  align: 'center'
})`
  border-top: 1px solid ${theme.colors.smoke};
  min-height: ${props => (props.sm ? 6 : 10)}rem;
`
const SectionHeading = styled(Heading.h2).attrs({
  fontSize: props => (props.sm ? [3, 4] : [4, 5]),
  regular: true,
  align: 'left'
})`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1.25;
  max-width: 32rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`
const SectionIcon = styled(Icon).attrs({
  color: props => (props.open ? 'gray.5' : 'gray.4'),
  size: 32,
  mr: 1,
  ml: 'auto'
})`
  transition: ${theme.transition} all;
  transform: rotate(${props => (props.open ? 90 : 0)}deg);
  user-select: none;
  ${props =>
    props.glyph === 'member-remove' &&
    css`
      cursor: pointer;
      &:hover {
        color: ${theme.colors.red[4]};
      }
    `};
`

class Section extends Component {
  state = { open: false }

  toggle = () =>
    this.setState(({ open }) => ({ open: this.props.to ? open : !open }))

  render() {
    const { open } = this.state
    const { name, openContent, to, sm, ...props } = this.props
    const Element = to ? Link : Fragment
    return (
      <Element to={to}>
        <SectionBase
          {...props}
          onClick={this.toggle}
          sm={sm}
          aria-expanded={open}
        >
          <SectionHeading sm={sm} children={name} />
          <SectionIcon open={open} glyph={to ? 'view-forward' : 'options'} />
        </SectionBase>
      </Element>
    )
  }
}

const SubmitStatus = styled(Text.withComponent('mark'))`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.75rem;
  padding-bottom: 0.125rem;
`

const profileStatus = profile =>
  profile.completed_at !== null
    ? 'complete'
    : profile.created_at === profile.updated_at
    ? 'unopened'
    : 'incomplete'

const Main = props => {
  const { id, leader_profiles, updated_at, created_at } = props.app
  const { callback, app, resetCallback } = props

  const leaderProfile = leader_profiles.find(
    profile => profile.user && profile.user.id === props.userId
  )
  const coLeaderProfiles = leader_profiles.filter(
    profile => profile.user && profile.user.id !== props.userId
  )

  const completeProfiles = leader_profiles.every(
    profile => profile.completed_at
  )
  const completeApplication = clubApplicationSchema.isValidSync(app)
  let submitButtonStatus
  if (app.submitted_at) {
    submitButtonStatus = 'submitted'
  } else if (completeApplication && completeProfiles) {
    submitButtonStatus = 'complete'
  } else {
    submitButtonStatus = 'incomplete'
  }
  const applicationStatus = profile =>
    completeApplication
      ? 'complete'
      : created_at === updated_at
      ? 'unopened'
      : 'incomplete'

  const submitStatusProps = {
    unopened: { color: 'primary', children: 'ready for you!' },
    incomplete: { color: 'warning', children: 'in progress.' },
    complete: { bg: 'info', children: 'completed!' },
    submitted: { bg: 'success', children: 'submitted!' }
  }[submitButtonStatus]

  return (
    <Container maxWidth={52} my={4}>
      <Sheet p={[3, 4, 5]}>
        <Heading.h3 fontSize={[4, 5]} mb={2}>
          FSC Certification
        </Heading.h3>
        <P fontSize={3}>
          If you are interested in becoming FSC certified, you are required to follow these steps:
        </P>
        <ul>
          <li>
            Submit a certification application to the FSC certification body of your choice.
          </li>
          <li>
            Meet all requirements of the FSC Forest Management and/or Chain of Custody Standards.
          </li>
          <li>
            Undergo an on-site audit by your chosen certification body.
          </li>
        </ul>
        <ContactInfo />
      </Sheet>
      <Sheet p={[3, 4, 5]}>
        <Headline mb={4} style={{ position: 'relative' }}>
          <Text.span style={{ display: 'block' }}>
            Your certification  application to FSC is
          </Text.span>
          <SubmitStatus {...submitStatusProps} />{' '}
        </Headline>
        <Text bold fontSize={[3, 4]}>
          Due to Covid-19 health measures, only applications submitted through our new self assessment portal are accepted.
        </Text>
        <LeaderInvite id={id} callback={callback} />
        {coLeaderProfiles.length === 0 && (
          <Text py={3} color="muted" align="center" fontSize={3}>
            <Text.span bold>No co-leaders yet!</Text.span>
            <br />
            Tap the green button to add them.
          </Text>
        )}
        {coLeaderProfiles.map(profile => (
          <SectionBase sm key={profile.id}>
            <SectionHeading sm>
              <Box>
                <Status type={profileStatus(profile)} actionable={false} />
                <Text>{profile.user.name || profile.user.email}</Text>
              </Box>
            </SectionHeading>
            <SectionIcon
              glyph="member-remove"
              onClick={e => {
                if (
                  // eslint-disable-next-line
                  confirm(
                    `Are you sure you want to remove ${profile.user.email} as a team member?`
                  )
                ) {
                  api
                    .delete(`v2/new_club_applications/${id}/remove_user`, {
                      authToken,
                      data: { user_id: profile.user.id }
                    })
                    .then(json => {
                      callback()
                    })
                }
              }}
              aria-label="Remove team member"
            />
          </SectionBase>
        ))}
        <Section
          to={`/club?id=${id}`}
          name={
            <Box>
              <Status type={applicationStatus()} />
              <Text>{app.high_school_name || 'Club application'}</Text>
            </Box>
          }
        />
        <Section
          to={`/leader?id=${leaderProfile.id}`}
          name={
            <Box>
              <Status type={profileStatus(leaderProfile)} />
              <Text>My personal profile</Text>
            </Box>
          }
        />
        <Box mt={4}>
          {app.rejected_at ? (
            <Rejected resetCallback={resetCallback} />
          ) : (
            <SubmitButton
              applicationId={app.id}
              status={submitButtonStatus}
              callback={callback}
            />
          )}
        </Box>
      </Sheet>
    </Container>
  )
}

export default Main
