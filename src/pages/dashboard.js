import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DisqDrawer from '../components/disqDrawer';
import DisqBar from '../components/disqBar';

// CSS & images
import '../assets/index.scss';

class disqLandingPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      alert: {
        open: false,
        text: ""
      }
    }
  }


  disqErrorClose() { this.setState({"alert": { "open": false }}) }
  disqError(eText) { 
    this.setState({"alert": { "open": true, "text": eText }})
  }

  render() {
    return (
      <div className="disqAppContainer">
        <DisqBar page="" />
        <DisqDrawer username={this.state.username}/>

        <div className="disqPageContents">
        </div>

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
