import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaUserAlt, FaRegChartBar } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
import { CgLogOut } from 'react-icons/cg';
import './sidebar.css';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../Redux';

function SidebarAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      name: 'Dashboard',
      icon: <RxDashboard />,
      action: () => {
        navigate('/admin/dashboard');
      },
    },
    {
      name: 'Users',
      icon: <FaUserAlt />,
      action: () => {
        navigate('/admin/user');
      },
    },
    {
      name: 'Bookings',
      icon: <FaRegChartBar />,
      action: () => {
        navigate('/admin/dashboard');
      },
    },
    {
      name: 'Logout',
      icon: <CgLogOut />,
      action: () => {
        dispatch(adminLogout());
      },
    },

  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? '250px' : '70px' }} className="sidebar">
        <div className="top_section">
          <h5 style={{ display: isOpen ? 'block' : 'none' }} className="logo">Admin Panel</h5>
          <div style={{ marginLeft: isOpen ? '10px' : '0px' }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
            menuItem.map((item) => (
              <Grid type="button" key={item} className="link" onClick={() => item.action()}>
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">{item.name}</div>
              </Grid>
            ))
        }
      </div>
      <main><Outlet /></main>
    </div>

  );
}

export default SidebarAdmin;
