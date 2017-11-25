import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/index';
import { Helmet } from 'react-helmet';

class UserListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App"/>
      </Helmet>
    )
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>
    })
  };

  render() {
    return (
      <div style={{ padding: '0 10px' }}>
        {this.head()}
        List of users:
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

// this is the server side store, we make the api call to retrieve it
const loadData = ssrStore => {
  return ssrStore.dispatch(fetchUsers())
};

export default {
  component: connect(mapStateToProps, { fetchUsers })(UserListPage),
  loadData,
}