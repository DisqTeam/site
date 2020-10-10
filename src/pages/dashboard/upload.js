import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Dropzone from 'react-dropzone'
import DisqDrawer from '../../components/disqDrawer';
import DisqBar from '../../components/disqBar';

import UploadImage from '../../assets/upload.svg';

// CSS & images
import '../../assets/index.scss';
import Logo from '../../assets/logo512.png';

class disqLandingPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      alert: {
        open: false,
        text: ""
      }
    }
    this.uploadFile = this.uploadFile.bind(this)
  }


  disqErrorClose() { this.setState({"alert": { "open": false }}) }
  disqError(eText) { 
    this.setState({"alert": { "open": true, "text": eText }})
  }

  uploadFile(file) {
    console.log(file)
  }

  render() {
    return (
      <div className="disqAppContainer">
        <DisqBar page="Upload" />

        <DisqDrawer username={this.state.username}/>

      <Dropzone onDrop={this.uploadFile}>
        {({getRootProps, getInputProps}) => (
          <div className="disqPageContents disqSupercenter disqDrag" {...getRootProps()}>
              <input {...getInputProps()} />
              <Container maxWidth="sm">
                <img src={UploadImage} width="200px" alt="Upload"/>
                <h3 className="disqDragText">Drag a file to upload</h3>
                <h4 className="disqDragText2">or click here</h4>
              </Container>
          </div>
        )}
      </Dropzone>

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
