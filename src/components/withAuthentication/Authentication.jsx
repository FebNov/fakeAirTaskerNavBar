import React from 'react';
import PropTypes from 'prop-types';
import withFetch from '../withFetch';
import AuthenticationContext from './AuthenticationContext';
import compose from '../../utils/compose';
import getAuth from '../../apis/getAuth';

class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    this.getAuth();
  }

  getAuth() {
    const { fetch } = this.props;

    fetch(getAuth).then(this.setUser);
  }

  setUser(target) {
    if (!target) {
      localStorage.removeItem('AUTH_TOKEN');
    }

    this.setState({
      user: target,
    });
  }

  render() {
    const { user } = this.state;
    const { children, error, loading } = this.props;

    const value = {
      user,
      setUser: this.setUser,
      error,
      loading,
    };

    return (
      <AuthenticationContext.Provider value={value}>
        {children}
      </AuthenticationContext.Provider>
    );
  }
}

Authentication.defaultProps = {
  error: undefined,
  loading: false,
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  fetch: PropTypes.func.isRequired,
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
  loading: PropTypes.bool,
};

const EnhancedAuthentication = compose(
  withFetch,
)(Authentication);

export default EnhancedAuthentication;