import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class ProjectTable extends React.Component {
    constructor(props) {
        super(props);
        this.data = props.data;

    }

    render() {

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Active?</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {
                            this.data.map((id, name, isActive)=>
                            <TableRowColumn>{id}</TableRowColumn>
                            <TableRowColumn>{name}</TableRowColumn>
                            <TableRowColumn>{isActive}</TableRowColumn>)
                        }
                    </TableRow>
                </TableBody>
            </Table>
        )
    }


}


