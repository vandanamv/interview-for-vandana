import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import { format } from 'date-fns';
import './LaunchModal.css';

const LabelValue = ({ label, value }) => (
  <React.Fragment>
    <Typography variant="body2" fontWeight="bold">
      {label}
    </Typography>
    <Typography variant="body2">{value}</Typography>
  </React.Fragment>
);

const LaunchModal = ({ open, handleClose, launch, launchpadMap, rocketMap, payloadMap }) => {
  if (!launch) return null;

  const statusLabel = launch.upcoming ? 'Upcoming' : launch.success ? 'Success' : 'Failed';

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modalBox">
        <Card>
          <CardContent>
            {/* Top section: Patch + Info + Close Button */}
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              {launch.links.patch.small && (
                <img
                  src={launch.links.patch.small}
                  alt="Patch"
                  className="patchImage"
                />
              )}
              {/* Middle: Info section */}
              <Box flex={1}>
                {/* Mission name + status chip */}
                <Box className="missionInfo">
                  <Typography variant="h6">{launch.name}</Typography>
                  <span className={`statusChip ${launch.upcoming ? 'statusChipUpcoming' : launch.success ? 'statusChipSuccess' : 'statusChipFailed'}`}>
                    {statusLabel}
                  </span>
                </Box>
                {/* Rocket name */}
                <Typography variant="body2" className="rocketName">
                  {rocketMap[launch.rocket] || 'Unknown Rocket'}
                </Typography>
                {/* Icon links */}
                <Box className="iconLinks">
                  {launch.links.article && (
                    <Tooltip title="NASA Article">
                      <a
                        href={launch.links.article}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="iconLink"
                      >
                        <LanguageIcon fontSize="small" />
                      </a>
                    </Tooltip>
                  )}
                  {launch.links.wikipedia && (
                    <Tooltip title="Wikipedia">
                      <a
                        href={launch.links.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="iconLink"
                      >
                        <PublicIcon fontSize="small" />
                      </a>
                    </Tooltip>
                  )}
                  {launch.links.webcast && (
                    <Tooltip title="Watch on YouTube">
                      <a
                        href={launch.links.webcast}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="iconLink"
                      >
                        <YouTubeIcon fontSize="small" />
                      </a>
                    </Tooltip>
                  )}
                </Box>
              </Box>
              {/* Right: Close Button aligned to top */}
              <IconButton onClick={handleClose} className="closeButton">
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="launchDetails" />
            {/* Launch details text */}
            <Typography variant="body2" className="rocketName" sx={{ marginBottom: 2 }}>
              {launch.details || 'No details available'}
              {launch.links.wikipedia && (
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wikiLink"
                >
                  Wikipedia
                </a>
              )}
            </Typography>
            {/* Metadata grid */}
            <Box className="metadataGrid">
              <LabelValue label="Flight Number" value={launch.flight_number || 'N/A'} />
              <LabelValue label="Mission Name" value={launch.name || 'N/A'} />
              <LabelValue label="Rocket Type" value={rocketMap[launch.rocket] || 'Unknown Rocket'} />
              <LabelValue label="Rocket Name" value={rocketMap[launch.rocket] || 'Unknown Rocket'} />
              <LabelValue label="Manufacturer" value="SpaceX" />
              <LabelValue label="Nationality" value="SpaceX" />
              <LabelValue
                label="Launch Date"
                value={launch.date_utc ? format(new Date(launch.date_utc), 'dd MMMM yyyy HH:mm') : 'N/A'}
              />
              <LabelValue
                label="Payload Type"
                value={payloadMap?.[launch.payloads?.[0]]?.type || 'N/A'}
              />
              <LabelValue
                label="Orbit"
                value={payloadMap?.[launch.payloads?.[0]]?.orbit || 'N/A'}
              />
              <LabelValue
                label="Launch Site"
                value={launchpadMap[launch.launchpad] || 'Unknown Location'}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default LaunchModal;
