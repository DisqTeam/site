import React from 'react'

export default function Service(props) {
    return (
        <a href={props.link}>
            <div className="more_service">
                <span className="material-icons">{props.icon}</span>
                <h1>{props.name}</h1>
            </div>
        </a>
    )
}
