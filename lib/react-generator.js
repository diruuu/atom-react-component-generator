'use babel';
import { CompositeDisposable, File } from 'atom';
import { Routes } from './react-generator-route';
import { arrayContain } from '../helpers';

export default {
  subscriptions: null,
  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Dinamically register command
    const menus = require('../menus/react-generator.json');
    const envs = menus["context-menu"][".tree-view.full-menu .header.list-item"];

    envs.filter((env, key) => {
      const {command, label} = env;
      if (command !== undefined && label !== undefined) {
        return true;
      }
      return false
    }).map((env, key) => {
      const {command, label} = env;
      const regEx = /(?:[a-zA-Z\-]+)\:([a-zA-Z]+)/g;
      const match = regEx.exec(command)[1];
      // Register command that toggles this view
      this.subscriptions.add(atom.commands.add('atom-workspace', `react-generator:${match}`, () => this.toggle(match)));
    });
  },

  generateReactComponent(callback, env = "JS") {
      let packageObj;

      // Require package to get path from
      if (atom.packages.isPackageLoaded('tree-view') === true) {
          let treeView = atom.packages.getLoadedPackage('tree-view');
          treeView = require(treeView.mainModulePath);
          packageObj = treeView.serialize();
      } else if (atom.packages.isPackageLoaded('sublime-tabs') === true) {
          let sublimeTabs = atom.packages.getLoadedPackage('sublime-tabs');
          sublimeTabs = require(sublimeTabs.mainModulePath);
          packageObj = sublimeTabs.serialize();
      } else {
          console.warn(`copy-filename: no tree-view or sublime-tabs package loaded, copy-filename isn't loaded`);
          return;
      }
      // Extract and copy path
      if (typeof packageObj !== 'undefined' && packageObj !== null) {
          if (packageObj.selectedPath) {
            var remote = require('remote');
            var dialog = remote.require('dialog');

            // Create File
            const baseName = path.basename(packageObj.selectedPath);

            Routes(baseName, env).map((seed, key) => {
              const {template, name, ext, unique, exclude} = seed;
              const fileExt = (typeof ext === "string" ? ext : (ext[env] === undefined ? ext[Object.keys(ext)[0]] : ext[env]));
              const file = new File(`${packageObj.selectedPath}/${baseName}.${fileExt}`);

              if (exclude !== undefined && arrayContain(exclude, env)) {
                return;
              }

              if (unique !== undefined && !arrayContain(unique, env)) {
                return;
              }

              file.create().then((created) => {
                if (created) {
                  file.write(template).then(() => {
                    callback("File created!");
                  }).catch(() => {
                    callback("Error writing file");
                  })
                } else {
                  callback("File exist!");
                }
              });
            });
          }
      }
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle(env) {
    return this.generateReactComponent((info) => {
      console.log(info, "info");
    }, env);
  }

};
