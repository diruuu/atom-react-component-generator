'use babel';
import { Component, ReduxAction, Style, Reducer, JSStyle } from '../templates';

export const Routes = (baseName, env) => (
  [{
    name: 'Component',
    ext: {JS: 'jsx', TS: 'tsx'},
    template: Component(baseName, env)
  }, {
    name: 'Redux Actions',
    ext: {JS: 'act.js', TS: 'act.ts'},
    template: ReduxAction(baseName, env)
  }, {
    name: 'Style CSS',
    ext: 'css',
    exclude: ['Native'],
    template: Style(baseName, env)
  }, {
    name: 'Style SCSS',
    ext: 'style.scss',
    unique: ['Native'],
    template: Style(baseName, env)
  }, {
    name: 'Style JS',
    ext: 'style.js',
    unique: ['Native'],
    template: JSStyle(baseName, env)
  }, {
    name: 'Reducer',
    ext: {JS: 'red.js', TS: 'red.ts'},
    template: Reducer(baseName, env)
  }]
);
