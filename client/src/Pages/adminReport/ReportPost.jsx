import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import axios from '../../Axios/axios';

function ReportPost() {
  useEffect(() => {
    axios.get('/reported-post').then((post) => {
      console.log(post);
    });
  }, []);
  const user = [{ hjsgdh: 'smnd' }, { dshf: 'dsjhj' }];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="left">User Name</TableCell>
            <TableCell align="left">Caption</TableCell>
            <TableCell align="left">Reports</TableCell>
            <TableCell align="left">Delete</TableCell>
            <TableCell align="left">View Post</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row, i) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                abjd
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReportPost;
