import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ComponentClass => {
  class RequireAuth extends Component {
    render() {
      console.log('this.props.auth :\n', this.props.auth);
      switch (this.props.auth) {
        case false: {
          return <Redirect to="/"/>;
        }

        case null: {
          return <div>Loading...</div>;
        }

        default:
          return <ComponentClass {...this.props}/>;
      }
    }
  }

  const mapStateToProps = ({ auth }) => ({
    auth,
  });

  return connect(mapStateToProps)(RequireAuth);
}

