import React, { useState } from 'react';
import {
  Typography,
  Menu,
  MenuItem,
  Box,
  Modal,
  Divider,
  IconButton,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { subMonths } from 'date-fns';

const CalendarFilter = ({ onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(subMonths(new Date(), 1));
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [filterText, setFilterText] = useState('Last 6 months');
  const [showCalendar, setShowCalendar] = useState(false);

  const open = Boolean(anchorEl);


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (text) => {
    setFilterText(text);
    handleClose();
    setShowCalendar(false);

    let endDate = new Date();
    let startDate = new Date();
    switch (text) {
      case 'Past week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'Past month':
        startDate = subMonths(endDate, 1);
        break;
      case 'Past 3 months':
        startDate = subMonths(endDate, 3);
        break;
      case 'Last 6 months':
        startDate = subMonths(endDate, 6);
        break;
      case 'Past year':
        startDate = subMonths(endDate, 12);
        break;
      case 'Past 2 years':
        startDate = subMonths(endDate, 24);
        break;
      default:
        startDate = null;
        endDate = null;
    }
    if (onFilterChange) {
      onFilterChange({ startDate, endDate });
    }
  };

  const handleDateChange1 = (newDate) => {
    setSelectedDate1(newDate);
    setFilterText(`From ${newDate.toLocaleDateString()}`);
    if (onFilterChange) {
      onFilterChange({ startDate: newDate, endDate: selectedDate2 });
    }
  };

  const handleDateChange2 = (newDate) => {
    setSelectedDate2(newDate);
    setFilterText(`To ${newDate.toLocaleDateString()}`);
    if (onFilterChange) {
      onFilterChange({ startDate: selectedDate1, endDate: newDate });
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const filterOptions = [
    'Past week',
    'Past month',
    'Past 3 months',
    'Last 6 months',
    'Past year',
    'Past 2 years',
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
  <IconButton
    aria-label="calendar filter"
    aria-controls="calendar-filter"
    aria-haspopup="true"
    onClick={toggleCalendar}
    size="small"
  >
    <CalendarTodayIcon />
  </IconButton>

  <Typography
    variant="subtitle1"
    component="span"
    onClick={toggleCalendar}
    sx={{ cursor: 'pointer', color: 'black', whiteSpace: 'nowrap' }}
  >
    {filterText}
  </Typography>

  <IconButton
    aria-label="open calendar menu"
    aria-controls="calendar-filter"
    aria-haspopup="true"
    onClick={toggleCalendar}
    size="small"
  >
    <ArrowDropDownIcon />
  </IconButton>
</Box>


      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {filterOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>

      <Modal
        open={showCalendar}
        onClose={toggleCalendar}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            display: 'flex',
            outline: 'none',
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <IconButton
            aria-label="close calendar"
            onClick={toggleCalendar}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mr: 2 }}>
              {filterOptions.map((option) => (
                <Box
                  key={option}
                  onClick={() => handleMenuItemClick(option)}
                  sx={{
                    p: 1,
                    mb: 1,
                    cursor: 'pointer',
                    borderRadius: 1,
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: '#F0F0F0',
                      color: 'text.primary',
                    },
                  }}
                >
                  <Typography variant="body2">{option}</Typography>
                </Box>
              ))}
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={selectedDate1}
                  onChange={handleDateChange1}
                  slotProps={{
                    actionBar: { actions: [] },
                  }}
                  defaultCalendarMonth={subMonths(new Date(), 1)}
                />
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={selectedDate2}
                  onChange={handleDateChange2}
                  slotProps={{
                    actionBar: { actions: [] },
                  }}
                  defaultCalendarMonth={new Date()}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CalendarFilter;
