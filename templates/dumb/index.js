import React, { PropTypes } from 'react';
import style from './style.css';

export default class {{name.capital}} extends React.Component {
  render() {
    return (
      <div className={style.{{name.camelCase}}}></div>
    );
  }
}

{{name.capital}}.propTypes = {};
{{name.capital}}.defaultProps = {};
