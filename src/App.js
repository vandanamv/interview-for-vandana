import React, { useState, useEffect } from 'react';
import { fetchLaunches, fetchLaunchpads, fetchRockets } from './services/api';
import LaunchList from './components/LaunchList';
import LaunchModal from './components/LaunchModal';
import { Box, Divider } from '@mui/material';
import spaceXImage from './images/spacex.png';

function App() {
  const [launches, setLaunches] = useState([]);
  const [launchpads, setLaunchpads] = useState([]);
  const [rockets, setRockets] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [filter, setFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    const getData = async () => {
      const launchesData = await fetchLaunches();
      const launchpadsData = await fetchLaunchpads();
      const rocketsData = await fetchRockets();

      setLaunches(launchesData);
      setLaunchpads(launchpadsData);
      setRockets(rocketsData);
    };

    getData();
  }, []);

  const launchpadMap = launchpads.reduce((map, launchpad) => {
    map[launchpad.id] = launchpad.name;
    return map;
  }, {});

  const rocketMap = rockets.reduce((map, rocket) => {
    map[rocket.id] = rocket.name;
    return map;
  }, {});

  const handleRowClick = (launch) => {
    setSelectedLaunch(launch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (range) => {
    setDateRange(range);
  };

  const filteredLaunches = launches
    .filter((launch) => {
      if (filter === 'All') return true;
      if (filter === 'Success' && launch.success) return true;
      if (filter === 'Failed' && !launch.success && !launch.upcoming) return true;
      if (filter === 'Upcoming' && launch.upcoming) return true;
      return false;
    })
    .filter((launch) => {
      if (!dateRange.startDate || !dateRange.endDate) return true;
      const launchDate = new Date(launch.date_utc);
      return launchDate >= dateRange.startDate && launchDate <= dateRange.endDate;
    });

  return (
    <div className="App">
      <Box textAlign="center" my={2}>
        <img src={spaceXImage} alt="SpaceX" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
      <Box sx={{ boxShadow: 3, width: '100%', my: 2 }}>
        <Divider />
      </Box>
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
        <LaunchList
          launches={filteredLaunches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          launchpadMap={launchpadMap}
          rocketMap={rocketMap}
          rockets={rockets}
          onRowClick={handleRowClick}
          page={page}
          rowsPerPage={rowsPerPage}
          totalLaunches={filteredLaunches.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onFilterChange={handleFilterChange}
          setFilter={setFilter}
        />
      </Box>
      <LaunchModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        launch={selectedLaunch}
        launchpadMap={launchpadMap}
        rocketMap={rocketMap}
      />
    </div>
  );
}

export default App;
