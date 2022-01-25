import React, {useState} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {MenuItem, Select} from "@mui/material";

export const InfoTable = (props) => {
    const cacheSelectOptions = ['original', 'buffer', 'no_cache'];
    const statusSelectOptions = ['pending', 'approved', 'blocked'];

    if (!props.data.length) {
        return (<h1 style={{textAlign: 'center'}}>no data</h1>)
    }

    return (
        props.data && <TableContainer>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">token</TableCell>
                        <TableCell align="right">user</TableCell>
                        <TableCell align="right">status</TableCell>
                        <TableCell align="right">cache</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.token}</TableCell>
                            <TableCell align="right">{row.user}</TableCell>
                            <TableCell align="right">
                                <Select
                                    size="small"
                                    value={row.status}
                                    onChange={(e) => {
                                        props.onUpdate({id: row.id, value: e.target.value, type: 'status'})
                                    }}
                                >
                                    { statusSelectOptions.map(item =>
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    )}
                                </Select>
                            </TableCell>
                            <TableCell align="right">
                                <Select
                                    size="small"
                                    value={row.cache}
                                    onChange={(e) => {
                                        props.onUpdate({id: row.id, value: e.target.value, type: 'cache'})
                                    }}
                                >
                                    { cacheSelectOptions.map(item =>
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    )}
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};