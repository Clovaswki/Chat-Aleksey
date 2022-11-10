import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({width, dataUsers, setAllUsers}) {

  const [option, setOption] = React.useState('all')

  const handleOption = (e) => {

    var value = e.target.value

    setOption(value)

    if(value === 'admin'){
      var users = dataUsers.filter( user => user.admin)
      setAllUsers([...users])
    }else if(value === 'user'){
      var users = dataUsers.filter( user => !user.admin)
      setAllUsers([...users])
    }else{
      setAllUsers([...dataUsers])
    }

  }

  const heightOption = '40px'

  return (
    <Box sx={{ 
        minWidth: 30, 
        width: width, 
        height: '30px', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
        }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="option"
          sx={{height: '45px'}}
          value={option}
          onChange={handleOption}
        >
          <MenuItem sx={{height: heightOption}} value={'all'}>Todos</MenuItem>
          <MenuItem sx={{height: heightOption}} value={'user'}>Usuário</MenuItem>
          <MenuItem sx={{height: heightOption}} value={'admin'}>Administrador</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
