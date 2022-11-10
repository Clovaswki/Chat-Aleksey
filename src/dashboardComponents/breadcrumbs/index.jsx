import { Breadcrumbs, Typography, Link } from '@mui/material'
import './styles.css'

export default function BreadcrumbsAdmin({children}) {

    const stylesText = {
        fontSize: '14px',
        fontWeight: '400',
        fontStyle: 'normal',
        color: '#344767'
    }

    return (
        <div style={{height: '80px', padding: '20px', display: 'flex'}}>
            <div className='breadcrumbsAdmin'>
                <div>
                    <Breadcrumbs aria-label="breadcrumb" sx={stylesText}>
                        <Link underline="hover" color="inherit" href="/">
                            Admin
                        </Link>
                        <Typography sx={stylesText}>
                            {children.component}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <span>
                    <Typography sx={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontSize: '16px',
                        color: '#344767',
                        lineHeight: '26px',
                        fontWeight: '700'
                    }}>{children.component}</Typography>
                </span>
            </div>
        </div>
    )

}