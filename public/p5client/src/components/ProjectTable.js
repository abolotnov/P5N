import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const ProjectTable = ({ data }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Active?</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                data.map(({id, name, isActive}) => (
                    <TableRow>
                        <TableRowColumn>{id}</TableRowColumn>
                        <TableRowColumn>{name}</TableRowColumn>
                        <TableRowColumn>{isActive}</TableRowColumn>
                    </TableRow>        
                ))
            }
        </TableBody>
    </Table>    
);
export default ProjectTable;


