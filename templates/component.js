'use babel';

import {toCamelCase, toCapital, toDash} from '../helpers';

export const Component = (name, env) => {
  return(
`${env === "Native" ? `/* @flow */` : ""}

${env === "Native"
  ? `import React, { Component } from "react";`
  : `import * as React from "react";`
}
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as ${toCapital(toCamelCase(name))}Actions from "./${toDash(name)}.act";
${env === "Native"
  ? `import { Text, View, TouchableHighlight } from 'react-native';`
  : ``
}
${env === "Native"
  ? `import style from "./${toDash(name)}.style";`
  : `const style = require("./${toDash(name)}.css");`
}

class ${toCapital(toCamelCase(name))} extends React.Component${env === "TS" ? "<any, any>" : ""} {
    render()${env === "TS" ? ": React.ReactElement<{}>" : ""} {
        const {${toCamelCase(name)}State} = this.props;
        return(
          ${env === "Native"
            ? "<View style={style.center}></View>"
            : "<div className={style.${toCamelCase(name)}}></div>"
          }
        );
    }
}

export default connect((state) => ({
  ${toCamelCase(name)}State: state.${toCamelCase(name)}Reducer
}), (dispatch) => bindActionCreators(${toCapital(toCamelCase(name))}Actions, dispatch))(${toCapital(toCamelCase(name))});`
  );
}
