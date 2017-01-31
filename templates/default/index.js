import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { load{{name.capital}} } from './actions';
import styles from './style.css';

const redial = {
  fetch: ({ dispatch }) => dispatch(load{{name.capital}}()),
};

const mapStateToProps = (state) => ({
  {{name.camelCase}}State: state.{{name.camelCase}}State,
});

const {{name.capital}} = ({ {{name.camelCase}}State: { isLoading, error } }) => {
  if (!error) {
    return (
      <div>
        <Helmet title="" />
        {isLoading ? (
          <div>
            <h2 className={styles.loading}>Loading....</h2>
          </div>
        ) : (
          <div>
            {/* Content here */}
          </div>
        )}
      </div>
    );
  }
  // When error occured
  return (
    <div className={styles.error}>
      Shit happened!
    </div>
  );
};

{{name.capital}}.propTypes = {
  {{name.camelCase}}State: PropTypes.object,
};

export default provideHooks(redial)(connect(mapStateToProps)({{name.capital}}));
