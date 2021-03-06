import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import signIn from '../../../../apis/signIn';
import compose from '../../../../utils/compose';
import Alert from '../../../Alert';
import Button from '../../../Button';
import FormItem from '../../../FormItem';
import Input from '../../../Input';
import Modal from '../../../Modal';
import NakedButton from '../../../NakedButton';
import { withRouter } from '../../../Router';
import withAuthentication from '../../../withAuthentication';
import withFetch from '../../../withFetch';
import withForm from '../../../withForm';
import form from './form'
const Form = styled.form`
  padding: 16px 0;
`;


const ERROR = {
  404: "Invalid Email or Password",
  409:"Invalid Email or Password",
  500: "Something unexpect happen, try again later",
};


const SignInModal = (
{  onClose,
  onSignUp,
  authentication,
  formData,
  getData,
  getErrorMessage,
  handleFormDataChange,
  isFormValid,
  router,
  fetch,
  error,
  loading}
) =>  (
    <Modal onClose={onClose}>
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            if (!isFormValid()) {
              return;
            }
            const data = getData();
            fetch(() => signIn(data))
            .then((user) => {
            onClose();
            authentication.setUser(user);
            router.push('/dashboard');
          });
      }}
        >
          {error && (
            <FormItem>
              <Alert>{ERROR[error.status]}</Alert>
            </FormItem>
          )}
          {Object.keys(form).map((key) => {
          const { label, type } = form[key];
          const { value, touched } = formData[key];

          const errorMessage = touched ? getErrorMessage(key) : '';

          return (
              <FormItem
                key={key}
                htmlFor={key}
                label={label}
                errorMessage={errorMessage}
              >
                <Input
                  id={key}
                  type={type}
                  error={errorMessage}
                  value={value}
                  onChange={handleFormDataChange(key)}
                />
              </FormItem>
            );
          })}
          <FormItem>
          <Button
            disabled={!isFormValid() || loading}
            width="100%"
            variant="success"
          >
            Sign in
          </Button>
        </FormItem>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      Not a member yet?&nbsp;
      <NakedButton variant="link" onClick={onSignUp}>Sign up now</NakedButton>
    </Modal.Footer>
  </Modal>
);


SignInModal.defaultProps = {
  error: undefined,
  loading: false,
};


SignInModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  authentication: PropTypes.shape({
    setUser: PropTypes.func,
  }).isRequired,
  onSignUp: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  formData: PropTypes.objectOf(PropTypes.shape({
    value: PropTypes.string,
    touched: PropTypes.bool,
  })).isRequired,
  getData: PropTypes.func.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
  handleFormDataChange: PropTypes.func.isRequired,
  isFormValid: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
  loading: PropTypes.bool,
};
const EnhancedSignInModal = compose(
  withForm(form),
  withRouter,
  withFetch,withAuthentication,
)(SignInModal);
export default EnhancedSignInModal;
