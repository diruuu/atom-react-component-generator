'use babel';
import { CompositeDisposable, File, Directory } from 'atom';
import { arrayContain, toCamelCase, toCapital, toDash, toUpperCase } from '../helpers';
import { render } from 'mustache';
import path from 'path';

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

  generateReactComponent(env = 'default', callback) {
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
            const folderName = path.basename(packageObj.selectedPath);
            // Get all associated file on template folder
            const templateFolder = new Directory(path.join(__dirname, "..", "templates", env));
            const templateFiles = templateFolder.getEntriesSync().map((file) => file.path);

            // Loops the file, render the mustache template, and create file
            templateFiles.map((filePath) => {
              const file = new File(filePath);
              file.read()
                .then((text) => {
                  const name = {
                    camelCase: toCamelCase(folderName),
                    capital: toCapital(folderName),
                    dash: toDash(folderName),
                    uppercase: toUpperCase(folderName)
                  };
                  console.log(name, 'name');
                  const rendered = render(text, {
                    name
                  });
                  return rendered;
                })
                .then((result) => {
                  const newFile = new File(`${packageObj.selectedPath}/${file.getBaseName()}`);
                  // Create new file!
                  newFile.create().then((created) => {
                    if (created) {
                      newFile.write(result).then(() => {
                        callback("File created!");
                      })
                        .catch(() => {
                          callback("Error writing file");
                        })
                    } else {
                      callback("File exist!");
                    }
                  });
                });
            });
          }
      }
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle(env) {
    return this.generateReactComponent(env, (info) => {
      console.log(info, "info");
    });
  }

};
