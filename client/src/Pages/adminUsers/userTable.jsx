import React, { useEffect, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import {
  IconButton, Pagination, Stack, Tooltip, Typography,
} from '@mui/material';
import { GoVerified, GoX } from 'react-icons/go';
import { MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';

export default function UserTables() {
  const [paginate, setPaginate] = useState(true);
  const [user, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const socket = useRef();
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    socket.current = io('https://cambiame.site', { path: '/api/socket.io/' });
  }, []);
  useEffect(() => {
    axios.get(`/admin/users?page=${page}`, {
      headers: {
        Authorization: `Bearer ${admin.access_Token}`,
      },
    }).then((res) => {
      setUsers(res.data.results);
      setPageInfo({ count: res.data.totalPages });
    }).catch((err) => {
      alert(err.msg);
    });
  }, [paginate]);

  const blockUser = (email, id) => {
    axios.put('/admin/block-user', { email }, {
      headers: {
        Authorization: `Bearer ${admin.access_Token}`,
      },
    }).then((res) => {
      if (res.data.msg === 'blocked user') {
        alert('blocked');
        socket.current.emit('blockUser', {
          user: id,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleChange = (event, value) => {
    setPage(value);
    setPaginate(!paginate);
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ m: '20' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Blocked</TableCell>
              <TableCell align="left">Verified</TableCell>
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
                  <Switch
                    defaultChecked={row.status}
                    onChange={() => {
                      blockUser(row.email, row.id);
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  {row.verified ? <GoVerified /> : <GoX />}
                </TableCell>
                <TableCell align="left">
                  <Tooltip title="View Profile" sx={{ padding: '5px', marginX: '2px' }} onClick={() => navigate(`/profile/${row.name}`)}>
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
      <Stack spacing={2} alignItems="center" p={2}>
        <Typography>
          Page:
          {page}
        </Typography>
        <Pagination count={pageInfo.count} page={page} onChange={handleChange} color="primary" />
      </Stack>

    </>
  );
}
