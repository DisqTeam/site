import React from 'react';
import {
    Toolbar,
    AppBar,
    Typography
} from '@material-ui/core';

class DisqBar extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            dashboardText: "Dashboard"
        }
    }

    componentDidMount(){
        console.log(this.props.page)
        if(this.props.page === "") return;
        this.setState({ "dashboardText": `Dashboard / ${this.props.page}` })
    }

    render(){
        return(
            <AppBar className="disqAppBar" position="fixed">
            <Toolbar>
              <Typography variant="h6" noWrap>
                {this.state.dashboardText}
              </Typography>
            </Toolbar>
          </AppBar>
        )
    }
}

export default DisqBar;