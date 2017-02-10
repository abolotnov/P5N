import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import NavigationComponent from './components/Navigation';

function getTableProjectData() {
    var cols = [
        {
            key: "id",
            label: "ID"
        },
        {
            key: "name",
            label: "name"
        }
    ];

    var data = [
        {id: 1, name: "Some project huh?"},
        {id: 50, name: "another project, easy?"},
        {id:666, name: "Bad project, always red!"}
    ];

    return {columns: cols, data: data};
}

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <div>
                <NavigationComponent/>
            </div>
        </MuiThemeProvider>
    );
  }



}

export default App;