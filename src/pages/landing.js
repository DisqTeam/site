import React from 'react';

import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Snackbar
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

// CSS & images
import '../assets/index.scss';
import Logo from '../assets/logo512.png';

// API
import checkToken from '../components/checkToken';

class disqLandingPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      loginDialogOpen: false,
      username: "",
      password: "",
      alert: {
        open: false,
        text: "Oops! An unknown error occured..."
      }
    }
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.usernameType = this.usernameType.bind(this)
    this.passwordType = this.passwordType.bind(this)
    this.loginToDisq = this.loginToDisq.bind(this)
    this.disqErrorClose = this.disqErrorClose.bind(this)
  }

  async componentDidMount() {
    const disqInfo = await checkToken();
    if(disqInfo.success === true) window.location = '/dashboard';
  }

  handleDialogClose() { this.setState({"loginDialogOpen": false})}
  handleDialogOpen() { this.setState({"loginDialogOpen": true})}

  usernameType(e) { this.setState({"username": e.target.value})}
  passwordType(e) { this.setState({"password": e.target.value})}
  disqErrorClose() { this.setState({"alert": { "open": false }}) }
  disqError(eText) { 
    this.setState({"alert": { "open": true, "text": eText }})
  }

  loginToDisq(){
    if(!this.state.username) return this.disqError("You need to specify a username")
    if(!this.state.password) return this.disqError("You need to specify a password")

    fetch('https://disq.me/api/login', {
        method: "POST",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(response => {
      if(response.success === false) return this.disqError(response.description);
      localStorage.token = response.token;
      window.location = '/dashboard';
    })
    .catch((e) => {
      console.log(e)
      this.disqError("An error occured with the request, please check the console for more info.")
    })
  }

  render() {
    return (
      <div className="disqContainer">
        <Container className="disqSupercenter disqCenter" maxWidth="sm">
          <img src={Logo} className="disqBigLogo" alt="Disq Logo"></img>
          <hr />
          <div className="disqLandingBtnCont">
            <Button onClick={this.handleDialogOpen} variant="contained" color="primary">
              Login
            </Button>
          </div>
        </Container>

        <Dialog className="disqLoginDialog" open={this.state.loginDialogOpen} onClose={this.handleDialogClose} disableBackdropClick aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Login to disq.me
            <IconButton className="disqLoginDialogClose" onClick={this.handleDialogClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="dm-username" label="Username" type="username" fullWidth onChange={this.usernameType}/>
            <TextField margin="dense" id="dm-password" label="Password" type="password" fullWidth onChange={this.passwordType}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.loginToDisq} variant="contained" color="Primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={this.state.alert.open} onClose={this.disqErrorClose} autoHideDuration={6000}>
          <MuiAlert elevation={6} variant="filled" severity="error">
            {this.state.alert.text}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

export default disqLandingPage;
