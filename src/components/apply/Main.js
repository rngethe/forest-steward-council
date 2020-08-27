import React from 'react'
import { AutoSaver, Fieldset, Field, Form } from 'components/Forms'
import { withFormik } from 'formik'
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import api from 'api'

export default function Protected() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
  let [user, setUser] = useState(null)

  useEffect(() => {
    let isCurrent = true
    netlifyAuth.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(!!user)
        setUser(user)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [])

  return (
   <div>
     <h1>Any place in your app!</h1>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="email" name="email" />
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" />
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
   </div>
 );
 
 export default main
