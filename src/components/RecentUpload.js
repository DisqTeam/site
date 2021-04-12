import React from 'react'

export default function RecentUpload(props) {
    return (
            <div className="recent_upload">
                <span className="material-icons">description</span>
                <a className="recent_link" href={props.domain + "/" + props.filename}>
                    <div className="recent_upload_right">
                        <p>{props.filename}</p>
                        {(props.percent) ? <p className="percent">{props.percent}</p> : void(0) }
                    </div>
                </a>
            </div>
    )
}
