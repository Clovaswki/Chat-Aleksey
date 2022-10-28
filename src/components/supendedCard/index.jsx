import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme, height, border_radius, background_color }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: height,
    lineHeight: '60px',
    borderRadius: border_radius,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '10px',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    backgroundColor: background_color
}));

export default function ElevationCard({ children, height, elevation, border_radius, background_color }) {
    return (

        <Item 
            elevation={elevation || 5} 
            height={height} 
            border_radius={border_radius || '10px'}
            background_color={background_color || '#ffff'}
        >
            {children}
        </Item>

    );
}
