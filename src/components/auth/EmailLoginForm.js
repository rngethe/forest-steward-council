import React from 'react'

import styled from 'styled-components'
import { withFormik } from 'formik'
import api from 'api'
import { Submit } from 'components/Forms'
import * as yup from 'yup'
import { Label, button, Input, Text, cx } from '@hackclub/design-system'
import storage from 'storage'



const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  userType,
  color,
  bg,
  status,
  inputProps = {},
  textProps = {}
}) => (
  <form onSubmit={handleSubmit}>
    <Label className="email" id="email" mb={0} {...textProps}>
      <Text mb={2} color={color}>
        Enter your email
      </Text>
      <StyledInput
        name="email"
        placeholder="Email address"
        color={color}
        bg={bg}
        value={values.email}
        onChange={e => {
          e.target.value = e.target.value.trim()
          handleChange(e)
        }}
        onBlur={handleBlur}
        disabled={isSubmitting}
        autoComplete="off"
        autoFocus
        {...inputProps}
      />
    </Label>
    {errors.email && (
      <Text
        fontSize={1}
        mt={2}
        align={textProps.align || 'center'}
        children={errors.email || ''}
      />
    )}
    <Submit
      my={3}
      value="Get Started »"
      color={color}
      bg={bg}
      mx={inputProps.mx || '0'}
      style={{ display: 'block' }}
      onClick={handleSubmit}
      inverted
    />
    <Text>Due to Covid-19 health measures, applications will be processed in the order they were received.
    <br />
     <a href="https://fsc.org/en/newsfeed/covid-19-update-for-cbs" target="_blank" rel="noopener noreferrer">
         Learn More
      </a>
     </Text>
  </form>


)


const EmailLoginForm = withFormik({
  mapPropsToValues: ({ email }) => ({ email: email || '' }),
  enableReinitialize: true,
  validateOnChange: false,
  validationSchema: yup.object().shape({
    email: yup.string().email('Please enter a valid email address.')
  }),
  handleSubmit: (data, { props, setSubmitting }) => {
    if (!data.email) {
      setSubmitting(false)
      return null
    }
    api
      .post('v2/users/auth', { data })
      .then(user => {
        storage.set('userId', user.id)
        storage.set('userEmail', user.email)
        setSubmitting(false)
        props.submitCallback({ userId: user.id, email: user.email })
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
      })
  },
  displayName: 'EmailLoginForm'
})(InnerForm)

export default EmailLoginForm
