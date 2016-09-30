# Atom ReactJS Component Generator
Atom plugin to generate template for ReactJS component, Redux action, reducer, CSS and other file needed to build a ReactJS component, all at once. Template can be customized based on the environment (Client side, server side, native, or typescript)

![react-generator](https://cloud.githubusercontent.com/assets/6884679/18984065/94386abc-871a-11e6-85fc-ab53316027df.gif)

## Instalation
1. Download this repo
2. Unzip & cut to Atom plugins directory (~/.atom/packages)

## Usage
1. Make sure the project is loaded on project folder treeview
2. Create folder for the ReactJS component. This folder will be the name of ReactJS component
3. Right click on the folder from project folder treeview
4. You will see options available based on enviroment you working on (JS, typescript, native, and server-side)

## How to add environment & customize template

### Add environment
* Open the plugin directory
* Open `/menus/react-generator.json`
* Add new object containing `label` and `command`
* `command` should follow name conversion `react-generator:<Environment Name>`

### Customize template
* Open `/lib/react-generator-route.js`
* Add new object containing object key like below:

Key | Type | Description
--- | --- | ---
name | String | The name of template
ext | String or object containing environment name as object key and the file extension as object value. Eg: `{JS: 'act.js', TS: 'act.ts'}` | The extension of file that will be generated. If the extension will be the same on all environment, just pass string on this option. If you pass an object, and the plugin cannot find matching ext for an environment, it will use the first extension of the object
exclude | Array \<Environment name\> | prevent file to be generated on some environment
unique | Array \<Environment name\> | only generate file on some environment
template | String (template string) | The initial template to be generated on the file. To pass the component name and enviroment name to the template, you can make it as a function and get the variable from `Routes` constant (Open `/lib/react-generator-route.js` and you will understand)
