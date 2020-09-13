import React from "react";

export default (props) => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="single"></label>
      <input
        type="file"
        id="single"
        onChange={props.onChange}
        disabled={!props.loggedInUser}
      />
    </div>
  </div>
);
