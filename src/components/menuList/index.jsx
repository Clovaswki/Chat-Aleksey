import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//contexts
  //context auth
    import ContextAuth from '../../contexts/provider/auth';
  //context chat
    import { ContextChat } from '../../contexts/chat/chatContext';

    
    const ITEM_HEIGHT = 38;
    
    
    
export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const { logout } = ContextAuth()
  const { setActiveChangeProfile } = ContextChat()
  
  //function active change profile card
  const changeProfileActive = () => {
    setActiveChangeProfile(true)
  }

  const options = [
    {
      label: 'sair',
      methodOfOption: logout
    },
    {
      label: 'meu perfil',
      methodOfOption: changeProfileActive
    }
  ];

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => {
            option.methodOfOption()
            handleClose()
          }} sx={{height: '50px'}}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

