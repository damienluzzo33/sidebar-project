import * as React from 'react';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EventIcon from '@mui/icons-material/Event';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GrassIcon from '@mui/icons-material/Grass';

const threads = [
    { icon: <GrassIcon/>, label: "Jedi Council"}, 
    { icon: <GrassIcon/>, label: "DS+A Bootcamp"}, 
    { icon: <GrassIcon/>, label: "Job Search"}, 
    { icon: <GrassIcon/>, label: "Halo Forum"}
];
const events = [
    { title: "Demo Day", date: "01/26"},
    { title: "Camping Trip", date: "01/28" }, 
    { title: "UTA Reunion", date: "02/05"} 
];
const chats = [
    { icon: <AccountCircleIcon/>, label: "bykersnob"},
    { icon: <AccountCircleIcon/>, label: "cool_guy_fox"},
    { icon: <AccountCircleIcon/>, label: "ethan_cho"}
];

const CactusNav = styled(List)({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

export default function CustomizedList() {

    const [open, setOpen] = React.useState({
        openThreads: false,
        openEvents: false,
        openChats: false
    });

    const handleDropdown = (event) => {
        console.log(event.target.id);
        if (event.target.id === "Logout") {
            return alert("you've been logged out")
        } else if (event.target.id === "Threads") {
            setOpen({
                ...open,
                openThreads: !open.openThreads
            })
        } else if (event.target.id === "Events") {
            setOpen({
                ...open,
                openEvents: !open.openEvents
            })
        } else if (event.target.id === "Chats") {
            setOpen({
                ...open,
                openChats: !open.openChats
            })
        }
    }

    const data = [
        { icon: <LogoutIcon/>, label: 'Logout', onClick: handleDropdown, open: null },
        { icon: <LibraryBooksIcon/>, label: 'Threads', onClick: handleDropdown, openThreads: open.openThreads },
        { icon: <EventIcon/>, label: 'Events', onClick: handleDropdown, openEvents: open.openEvents },
        { icon: <ChatBubbleIcon/>, label: 'Chats', onClick: handleDropdown, openChats: open.openChats },
    ];

    const main = [
        { icon: <HomeIcon/>, label: 'Home'},
        { icon: <PeopleAltIcon/>, label: 'Friends'},
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <ThemeProvider theme={createTheme({ components: { MuiListItemButton: { defaultProps: { disableTouchRipple: true, }, }, }, palette: { mode: 'dark', background: { paper: 'rgb(5, 30, 52)' }, }, })} >
                <Paper elevation={0} sx={{ minWidth: 300 }}>
                    <CactusNav component="nav" disablePadding>       
                        <ListItem component="div" disablePadding sx={{ flexDirection: "column", alignItems: "flex-start", paddingTop: "0px", paddingBottom: "65px" }}>
                            {main.map((btn) => (
                                <ListItemButton sx={{ height: 35, padding: "35px", width: "100%" }}>
                                <ListItemIcon>
                                    {btn.icon}
                                </ListItemIcon>
                                <ListItemText
                                primary={btn.label}
                                primaryTypographyProps={{
                                    fontWeight: 'medium',
                                    variant: 'body2',
                                }}
                                />
                            </ListItemButton>
                            ))}
                        </ListItem>
                        <Box sx={{ bgcolor: 'rgb(5, 30, 52)', pb: '40px' }} >
                            {data.map((option) => (
                                <>
                                    <ListItemButton key={option.label} id={option.label} alignItems="flex-start" onClick={option.onClick} sx={{ px: 3, pt: 2.5 }} >
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <ListItemIcon sx={{ color: 'inherit', pb: '8px', mr: '15px' }}>
                                                {option.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={option.label} primaryTypographyProps={{ fontSize: 15, fontWeight: 'medium', lineHeight: '20px' }} />
                                        </div>
                                        
                                        <KeyboardArrowDown sx={{ opacity: 0, transform: option.open ? 'rotate(-180deg)' : 'rotate(0)', transition: '0.2s' }}
                                        />
                                    </ListItemButton>
                                    <div className='divider'>
                                        <Divider sx={{width: "90%", marginTop: "15px", marginBottom: "15px"}}/>
                                    </div>
                                    {option.openThreads && option.label === "Threads" ? threads.map((thread) => (
                                        <ListItemButton
                                            key={thread.label}
                                            sx={{ color: 'rgba(255,255,255,.8)' }}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit' }}>
                                            {thread.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                            primary={thread.label}
                                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                            />
                                        </ListItemButton>
                                    )) : ( null )}
                                    {option.openEvents && option.label === "Events" ? events.map((event) => (
                                        <ListItemButton
                                            key={event.title}
                                            sx={{ color: 'rgba(255,255,255,.8)', display: 'flex' }}
                                        >
                                            <ListItemText
                                            primary={event.title}
                                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                            />
                                            <ListItemText 
                                            primary={event.date}
                                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                            sx={{ position: 'absolute', right: '50px' }}
                                            />
                                        </ListItemButton>
                                    )) : ( null )}
                                    {option.openChats && option.label === "Chats" ? chats.map((chat) => (
                                        <ListItemButton
                                        key={chat.label}
                                        sx={{ color: 'rgba(255,255,255,.8)' }}
                                    >
                                        <ListItemIcon sx={{ color: 'inherit' }}>
                                        {chat.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                        primary={chat.label}
                                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                        />
                                        </ListItemButton>
                                    )) : ( null )}
                                </>
                            ))}
                        </Box>
                    </CactusNav>
                </Paper>
            </ThemeProvider>
        </Box>
    );
}