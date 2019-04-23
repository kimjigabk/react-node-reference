import React from "react";
import { reduxForm, Field } from "redux-form";
import _ from "lodash";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";

import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

const FIELDS = formFields;

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(FIELDS, field => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
          autoComplete="off"
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="btn-flat left red white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
const validate = values => {
  const errors = {};
  errors.recipients = validateEmails(values.recipients);
  _.each(FIELDS, ({ label, name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${_.lowerCase(label)}`;
    }
  });

  return errors;
};
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
