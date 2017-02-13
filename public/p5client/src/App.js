import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import NavigationComponent from './components/Navigation';
import ProjectTable from './components/ProjectTable';


var projects = [
        {id: 1, name: "Some project huh?", isActive: true},
        {id: 50, name: "another project, easy?", isActive: true},
        {id:666, name: "Bad project, always red!", isActive: false}
    ];


class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <div>
                <NavigationComponent/>
                <ProjectTable data={projects}/>
            </div>
        </MuiThemeProvider>
    );
  }



}

export default App;