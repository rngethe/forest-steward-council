import React from 'react'
import { AutoSaver, Fieldset, Field, Form } from 'components/Forms'
import { withFormik } from 'formik'
import * as yup from 'yup'

export const AssessmentSchema = yup.object().shape({
  your_name: yup.string().required(),
  your_company: yup.string().required(),
  organization_name: yup.string().required(),
  organization_type: yup
    .string()
    .matches(/(private_organization|government_organization|non_profit)/)
    .required(),
  organization_address: yup.string().required(),
  organization_certificate: yup.string().required(),
  organization_: yup.string().required(),
  progress_student_interest: yup.string().required(),
  progress_meeting_yet: yup.string().required(),
  idea_why: yup.string().required(),
  idea_other_coding_clubs: yup.string().required(),
  idea_other_general_clubs: yup.string().required(),
  formation_registered: yup.string().required(),
  other_surprising_or_amusing_discovery: yup.string().required(),
  point_of_contact_id: yup.number().required()
})

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  const field = name => ({
    name,
    value: values[name] === null ? '' : values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && errors[name],
    disabled: values.submitted_at !== null
  })
  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset section="personal">
        <Field {...field('your_name')} label="Please enter your Full names" />
        <Field
          {...field('your_company')}
          label="Name of the organization"
          type="url"
          optional
        />
        <Field
          {...field('fsc_cborganization')}
          label="Type of the organization"
          type="select"
        >
          <option disabled value="">
            Select One
          </option>
          <option value="private_organization">Public Organization</option>
          <option value="government_organization">Govvernment Organization</option>
          <option value="non_profit">Not for Profit</option>
        </Field>
        <Field
          {...field('organization_address')}
          label="Please enter full address of the organization"
          hint="Please include city, state / province, country, and postal code."
          type="textarea"
          rows="3"
        />


      </Fieldset>
      <Fieldset section="Assessment">
        <Field
          {...field('fsc_certificate')}
          label="Type of Certification you are applying for"
          type="select"
        >
          <option disabled value="">
            Select One
          </option>
          <option value="certificate_one">certificate one</option>
          <option value="certificate_two">certificate two</option>
          <option value="certificate_three">certificate three</option>
        </Field>
        <Field
          {...field('point_of_contact_id')}
          label="President / equivalent position"
          type="select"
        >
          <option disabled value="">
            Select One
          </option>
          {values.leader_profiles
            .filter(profile => profile.user != null)
            .map(profile => (
              <option value={profile.user.id} key={profile.user.id}>
                {profile.user.email}
              </option>
            ))}
        </Field>
        <Field
          {...field('leaders_team_origin_story')}
          label="How long have you known your other club leaders and how did you meet?"
          type="textarea"
          min="350"
          max="600"
        />
      </Fieldset>
      <Fieldset section="progress">
        <Field
          {...field('progress_general')}
          label="How far along are you in starting your club?"
          type="textarea"
        />
        <Field
          {...field('progress_student_interest')}
          label="Have you already polled for interest at your school? Are students interested? If you’ve already had meetings, how many people came?"
          type="textarea"
        />
        <Field
          {...field('progress_meeting_yet')}
          label="Have you begun meeting yet?"
          type="textarea"
        />
      </Fieldset>
      <Fieldset section="idea">
        <Field
          {...field('idea_why')}
          label="Why are you planning to start a Hack Club? Have you run anything like a Hack Club before? Why do you think the club is going to work?"
          type="textarea"
          min="350"
          max="600"
        />
        <Field
          {...field('idea_other_coding_clubs')}
          label="Has your school had coding clubs before? What’s going to be new about your Hack Club?"
          type="textarea"
          min="350"
          max="600"
        />
        <Field
          {...field('idea_other_general_clubs')}
          label="What successful clubs exist at your school? What makes them successful? Why will you be just as successful, if not more, than them?"
          type="textarea"
          min="350"
          max="600"
        />
      </Fieldset>
      <Fieldset section="formation">
        <Field
          {...field('formation_registered')}
          label="Have you already registered your club with your school?"
        />
        <Field
          {...field('formation_misc')}
          label="Please provide any other relevant information about your relationship with the school. For example, do you already have a teacher sponsor?"
          type="textarea"
          optional
        />
      </Fieldset>
      <Fieldset section="other">
        <Field
          {...field('other_surprising_or_amusing_discovery')}
          label="What is something surprising or amusing you learned recently?"
          hint="Doesn’t have to be about Hack Club or coding."
          type="textarea"
          min="50"
          max="400"
        />
      </Fieldset>
      <Fieldset section="curious">
        <Field
          {...field('curious_what_convinced')}
          label="What do you hope to get out of Hack Club?"
          type="textarea"
          optional
        />
        <Field
          {...field('curious_how_did_hear')}
          label="How did you hear about Hack Club? If you heard about us at an event or on a website, mention it here."
          type="textarea"
          optional
        />
      </Fieldset>
      <AutoSaver
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        values={values}
      />
    </Form>
  )
}


export default Certification
