import React, { useEffect, useState } from 'react';
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
import { MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from '../../Axios/axios';

export default function UserTables() {
  const [paginate, setPaginate] = useState(true);
  const [user, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/admin/users?page=${page}`).then((res) => {
      setUsers(res.data.results);
      setPageInfo({ count: res.data.totalPages });
    }).catch((err) => {
      alert(err.msg);
    });
  }, [paginate]);

  const blockUser = (email) => {
    axios.put('/admin/block-user', { email }).then(() => {
      alert('blocked');
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
                <TableCell align="left">
                  <Tooltip title="View Profile" sx={{ padding: '5px', marginX: '2px' }} onClick={() => navigate(`/${row.name}`)}>
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