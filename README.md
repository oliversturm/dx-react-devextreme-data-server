## Remote Data Loading for the DevExtreme React Grid

This project implements a plugin for the [DevExtreme React Grid](https://github.com/DevExpress/devextreme-reactive) that provides remote data loading functionality. 

The backend for the plugin should support the parameter structure documented in [the wiki of my *devextreme-query-mongodb* project](https://github.com/oliversturm/devextreme-query-mongodb/wiki). This parameter structure is compatible with the [DevExtreme data layer](https://js.devexpress.com/Documentation/17_1/Guide/Data_Layer/Data_Layer/).

### Installing **dx-react-devextreme-data-server**

The library is available through npm:

`npm install dx-react-devextreme-data-server`

### Using the plugin

Import the plugin type:

```js
import { DevExtremeDataServer } from 'dx-react-devextreme-data-server';
```

Render the plugin as part of the React Grid:

```js
<Grid rows={...} columns={...}>
  { 
    // state plugins go here 
  }
  
  <DevExtremeDataServer url="//dataserver/baseurl" />
  
  { 
    // visual plugins follow
  }
</Grid>
```

#### Properties

The plugin supports the following properties:

`url`: This defines the base URL for data access. The plugin passes query parameters automatically depending on user interaction with the React Grid.

`reloadState`: This property can be bound to a state field that will be changed when a data reload is required. 

`loadingIndicator`: A function that renders a loading indicator if necessary (see below). The default function shows a Bootstrap compatible indicator.

`useLoadingIndicator`: Whether or not to show a loading indicator. Default `true`.

`loadingIndicatorThreshold`: The number of milliseconds to wait during a loading operation before a loading indicator is shown. Default 500.

### Examples

A simple example can be found in [this JSFiddle](https://jsfiddle.net/oliversturm/5b4du9mg/).

A complex example can be found in [this file](https://github.com/oliversturm/cqrs-grid-demo/blob/react-external-plugin/webapp/src/Grid.js) of my [DevExtreme - Real World Patterns](https://community.devexpress.com/blogs/oliver/archive/2017/03/24/devextreme-real-world-patterns.aspx) demo project. This shows the use of the `reloadState` and `loadingIndicator` properties.
