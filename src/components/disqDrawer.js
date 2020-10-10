import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LinkIcon from '@material-ui/icons/Link';
import BackupIcon from '@material-ui/icons/Backup';
import SettingsIcon from '@material-ui/icons/Settings';
import ComputerIcon from '@material-ui/icons/Computer';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

import checkToken from './checkToken';

class DisqDrawer extends React.Component{
    constructor(props){
        super(props)
    
        this.state = {
          username: ""
        };
        this.disqLogOut = this.disqLogOut.bind(this);
    }

    disqLogOut() {
        localStorage.token = "";
        window.location = '/';
    }

    async componentDidMount() {
        let response = await checkToken()
    
        if(response.success === false) window.location = '/';
        let adminBadge = ""
        if(response.administrator) adminBadge = " <CheckCircleRoundedIcon />"
    
        this.setState({ username: response.username + adminBadge})
    }

    render(){
        return(
            <Drawer className="disqDrawer" variant="permanent" anchor="left" classes={{ paper: "disqPaper"}}>
            <Toolbar />
            <div className="disqDrawerContainer">
                <List>
                    <ListItem>
                        <ListItemIcon> <Avatar>{this.state.username.charAt(0)}</Avatar> </ListItemIcon>
                        <Grid container direction="row" alignItems="center">
                            <ListItemText primary={"Signed in as " + this.state.username} />
                            <CheckCircleRoundedIcon />
                        </Grid>
                    </ListItem>
                </List>
                <List>
                    <Link to="/dashboard/upload" className="disqDrawerLink">
                        <ListItem button key="Upload">
                        <ListItemIcon> <BackupIcon  /> </ListItemIcon>
                        <ListItemText primary="Upload" />
                        </ListItem>
                    </Link>
                    <Link to="/dashboard/files" className="disqDrawerLink">
                        <ListItem button key="Files">
                        <ListItemIcon> <InsertDriveFileIcon  /> </ListItemIcon>
                        <ListItemText primary="Files" />
                        </ListItem>
                    </Link>
                    <Link to="/dashboard/shorts" className="disqDrawerLink">
                        <ListItem button key="Short URLs">
                        <ListItemIcon> <LinkIcon  /> </ListItemIcon>
                        <ListItemText primary="Short URLs" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to="/dashboard/sharex" className="disqDrawerLink">
                        <ListItem button key="ShareX">
                        <ListItemIcon> <ComputerIcon /> </ListItemIcon>
                        <ListItemText primary="ShareX" />
                        </ListItem>
                    </Link>
                    <Link to="/dashboard/settings" className="disqDrawerLink">
                        <ListItem button key="Settings">
                        <ListItemIcon> <SettingsIcon /> </ListItemIcon>
                        <ListItemText primary="Settings" />
                        </ListItem>
                    </Link>
                    <ListItem button key="Logout" onClick={this.disqLogOut}>
                    <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
                    <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </div>
          </Drawer>
        )
    }
}

export default DisqDrawer;