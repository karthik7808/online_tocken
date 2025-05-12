// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, statsRes] = await Promise.all([
          axios.get('/api/admin/bookings'),
          axios.get('/api/admin/stats')
        ]);
        setBookings(bookingsRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>Active Tokens</h3>
          <p>{stats.activeTokens}</p>
        </div>
      </div>

      <BarChart width={600} height={300} data={stats.dailyBookings}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      <table className="booking-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Token ID</th>
            <th>Booking Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.user.email}</td>
              <td>{booking.tokenId}</td>
              <td>{new Date(booking.bookingTime).toLocaleString()}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};