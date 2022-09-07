import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';

export default function ButtonAddFriends() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="delete">
        <img src="/img/addFriends.png" alt="addFriends" style={{width: "25px", height: "25px"}}/>
      </IconButton>
    </Stack>
  );
}
