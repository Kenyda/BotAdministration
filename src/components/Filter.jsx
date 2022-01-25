import React from 'react';
import {Grid, Input, InputLabel, MenuItem, Select} from "@mui/material";

const Filter = ({filter, setFilter}) => {
    const cacheSelectOptions = ['original', 'buffer', 'no_cache'];
    const statusSelectOptions = ['pending', 'approved', 'blocked'];

    return (
        <Grid container spacing={2}>
            <Grid item>
                <InputLabel>User</InputLabel>
                <Input
                    value={filter.query.user}
                    onChange={e => setFilter({...filter, query: {...filter.query, user: e.target.value}})}
                    placeholder="user"
                />
            </Grid>
            <Grid item>
                <InputLabel>Status</InputLabel>
                <Select
                    size="small"
                    displayEmpty
                    value={filter.query.status}
                    onChange={(e) => setFilter({...filter, query: {...filter.query, status: e.target.value}})}
                >
                    { statusSelectOptions.map(item =>
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    )}
                    <MenuItem value=''>Не выбран</MenuItem>
                </Select>
            </Grid>
            <Grid item>
                <InputLabel>Cache</InputLabel>
                <Select
                    size="small"
                    displayEmpty
                    value={filter.query.cache}
                    onChange={(e) => setFilter({...filter, query: {...filter.query, cache: e.target.value}})}
                >
                    { cacheSelectOptions.map(item =>
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    )}
                    <MenuItem value=''>Не выбран</MenuItem>
                </Select>
            </Grid>
        </Grid>
    );
};

export default Filter;