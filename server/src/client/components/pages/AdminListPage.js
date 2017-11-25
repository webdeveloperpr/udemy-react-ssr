import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from "../../actions/index";
import requireAuth from '../hoc/requireAuth';
import { Helmet } from 'react-helmet';
class AdminListPage extends Component {

  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map(admin => {
      return <li key={admin.id}>{admin.name}</li>
    });
  };

  head() {
    return (
      <Helmet>
        <title>{`${this.props.admins.length} Admins Loaded`}</title>
        <meta property="og:title" content="Users App"/>
      </Helmet>
    )
  }

  render() {
    return (
      <div>
        {this.head()}
        <h3>Protected list of admins</h3>
        <ul>
          {this.renderAdmins()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ admins }) => ({
  admins,
});

// this is the server side store, we make the api call to retrieve it
const loadData = ssrStore => {
  return ssrStore.dispatch(fetchAdmins())
};

export default {
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminListPage)),
  loadData,
}