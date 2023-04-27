import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import axios from '../../Axios/axios';

export default function UserTables() {
  const [user, setUsers] = useState([]);
  useEffect(() => {
    axios.get('/admin/users').then((res) => {
      setUsers(res.data);
    }).catch((err) => {
      alert(err.msg);
    });
  }, []);

  const blockUser = (email) => {
    axios.put('/block-user', { email }).then(() => {
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Blocked</TableCell>
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
                <Switch defaultChecked={row.status} onChange={() => blockUser(row.email)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
