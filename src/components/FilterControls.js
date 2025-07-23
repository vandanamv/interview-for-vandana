import React from 'react';
import { IconButton, Typography, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FilterControls = ({ setFilter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFilterLabel, setSelectedFilterLabel] = React.useState('All Launches'); // NEW
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (filter) => {
    setFilter(filter);
    // Update label
    if (filter === 'All') setSelectedFilterLabel('All Launches');
    else if (filter === 'Upcoming') setSelectedFilterLabel('Upcoming Launches');
    else if (filter === 'Success') setSelectedFilterLabel('Successful Launches');
    else if (filter === 'Failed') setSelectedFilterLabel('Failed Launches');

    handleClose();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      <IconButton
        aria-label="filter"
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterListIcon />
      </IconButton>
      <Typography
        variant="subtitle1"
        component="span"
        onClick={handleClick}
        style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        {selectedFilterLabel}
      </Typography>
      <IconButton
        aria-label="open filter menu"
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('All')}>All Launches</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Upcoming')}>Upcoming Launches</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Success')}>Successful Launches</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Failed')}>Failed Launches</MenuItem>
      </Menu>
    </div>
  );
};

export default FilterControls;
