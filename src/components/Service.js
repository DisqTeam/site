import React from "react";

export default function Service(props) {
  let classes;

  switch (props.name) {
    case "Plus":
      classes = "grad grad_plus more_service";
      break;

    case "Upload":
      classes = "grad grad_linkpage more_service";
      break;

    default:
      classes = "more_service";
  }

  return (
    <a href={props.link}>
      <div className={classes}>
        <span className="material-icons">{props.icon}</span>
        <div className="flx-ontop">
          <h1>{props.name}</h1>
          <p>{props.description}</p>
        </div>
      </div>
    </a>
  );
}
