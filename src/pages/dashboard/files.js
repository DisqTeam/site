import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DisqDrawer from '../../components/disqDrawer';
import DisqBar from '../../components/disqBar';

import DeleteIcon from '@material-ui/icons/Delete';

// CSS & images
import '../../assets/index.scss';

class disqLandingPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      alert: {
        open: false,
        text: ''
      },
      page: 0,
      tableContent: ''

    }

    this.disqChangePageForward = this.disqChangePageForward.bind(this)
    this.disqChangePageBackward = this.disqChangePageBackward.bind(this)
  }

  async disqGetFiles() {
    let DisqRequest = await fetch(`https://disq.me/api/uploads/${this.state.page}`, {
      headers: {
        token: localStorage.token
      }
    })
    let files = await DisqRequest.json()
    console.log('Get File')
    if(files.files.length === 0) return;
    console.log('Map To File')
    let filesTable = files.files.map((f) => (
      <TableRow key={f.id}>
        <TableCell component="th" scope="row">
          <a href={f.file}>{f.file}</a>
        </TableCell>
        <TableCell align="right">{f.date}</TableCell>
        <TableCell align="right"> <Button size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />}>
        Delete
      </Button></TableCell>
      </TableRow>
    ))

    this.setState({ tableContent: filesTable })
  }

  async componentDidMount(){
    this.disqGetFiles()
  }

  disqChangePageForward(dir) {
    let currentPage = this.state.page
    let destinationPage = currentPage + 1
    this.setState({ page: destinationPage})
    this.disqGetFiles()
  }

  disqChangePageBackward(dir) {
    let currentPage = this.state.page
    if(currentPage === 0) return;
    let destinationPage = currentPage - 1
    this.setState({ page: destinationPage})
    this.disqGetFiles()
  }

  disqErrorClose() { this.setState({"alert": { "open": false }}) }
  disqError(eText) { 
    this.setState({"alert": { "open": true, "text": eText }})
  }

  render() {
    return (
      <div className="disqAppContainer">
        <DisqBar page="Files" />

        <DisqDrawer username={this.state.username}/>

        <div className="disqPageContents disqCenter">
          <Container>
          <div className="disqPageButton">
            <Button className="disqPageButtonLeft" size="medium" variant="contained" color="default">
              Previous
            </Button>
            <Button className="disqPageButtonRight" size="medium" variant="contained" color="default">
              Next
            </Button>
          </div>

          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>File</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.tableContent}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="disqPageButton">
            <Button onClick={this.disqChangePageBackward} className="disqPageButtonLeft" size="medium" variant="contained" color="default">
              Previous
            </Button>
            <Button onClick={this.disqChangePageForward} className="disqPageButtonRight" size="medium" variant="contained" color="default">
              Next
            </Button>
          </div>
          </Container>
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
