/* eslint-disable no-underscore-dangle */
import {
  IconButton,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdArrowForwardIos, MdDelete } from 'react-icons/md';
import axios from '../../Axios/axios';

function ReportPost() {
  const [post, setPosts] = useState([]);
  const [deletepost, setDeletepost] = useState(false);
  useEffect(() => {
    axios.get('/admin/reported-post').then((response) => {
      setPosts(response.data);
    });
  }, []);
  const handleDelete = (postid) => {
    axios.delete(`/post/delete-post/${postid}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      setDeletepost(!deletepost);
    }).catch((err) => console.log(err));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="left">User Name</TableCell>
            <TableCell align="left">Caption</TableCell>
            <TableCell align="left">Reports</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post?.map((row, i) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="left">{row.user}</TableCell>
              <TableCell align="left">{row.caption}</TableCell>
              <TableCell align="left">{row.report}</TableCell>
              <TableCell align="left">
                <Tooltip title="Delete" sx={{ padding: '5px' }} onClick={() => handleDelete(row._id)}>
                  <IconButton>
                    <MdDelete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Post" sx={{ padding: '5px', marginX: '2px' }}>
                  <IconButton>
                    <MdArrowForwardIos />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReportPost;
