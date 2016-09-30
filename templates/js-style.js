'use babel';

import {toCamelCase} from '../helpers';

export const JSStyle = (name, env) => {
  return(
`import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "${toCamelCase(name)}": {
        "display": "relative"
    }
});`
);
}
