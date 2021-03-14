import React, { Component } from 'react'
import axios from 'axios';
import config from '../config.json';
import Dropzone from 'react-dropzone';

export default class QuickUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uploaderText: "Drag a file here or click to upload"
        }
        this.onDrop.bind(this);
    }

    onDrop = async (files) => {
        let stuff = new FormData()
        stuff.append("file", files[0])

        axios({
            url: `${config.endpoint}/upload`,
            method: 'post',
            headers: { 'token': localStorage.token, 'Content-Type': 'multipart/form-data' },
            data: stuff,
            onUploadProgress: (e) => {
                this.setState({uploaderText: `${((e.loaded / e.total) * 100).toFixed(0)}%`}) 
            }
        })
        .then((res) => {
            if(!res.data.success) return this.setState({ uploaderText: res.data.description })
            this.setState({ uploaderText: <a href={res.data.file.url}>{res.data.file.url}</a> })
        })
        .catch((res) => {
            this.setState({ uploaderText: res.response.data.description })
        })
    }

    render() {
        return (
            <div>
                <h2 className="land_header">Quick Upload</h2>
                <Dropzone onDrop={this.onDrop}>
                    {({getRootProps, getInputProps}) => (
                        <div className="quick_drop dropzone" {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <span className="upload_icon material-icons">upload</span>
                            <p>{this.state.uploaderText}</p>
                        </div>
                    )}
                </Dropzone>
            </div>
        )
    }
}
