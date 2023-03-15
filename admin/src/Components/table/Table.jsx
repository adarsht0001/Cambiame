/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BiBlock } from 'react-icons/bi';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import axios from '../../Axios/Axios';

export default function AccessibleTable(props) {
  const { data } = props;
  const head = Object.keys(data[0]);
  const block = (email) => {
    axios.put('/block', { data: { email } });
  };
  return (
    <TableContainer component={Paper} sx={{ marginLeft: '20%' }}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            {head.map((elem) => (
              <TableCell align="right">{elem}</TableCell>
            ))}
            <TableCell align="right"><BiBlock /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((element, i) => (
            <TableRow key={element.name}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{element._id}</TableCell>
              <TableCell align="right">{element.username}</TableCell>
              <TableCell align="right">{element.email}</TableCell>
              <Switch onClick={block(element.email)} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
