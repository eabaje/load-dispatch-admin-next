import React from "react";

function CustomButton(props) {
  return (
    <>
      <button type="submit" className="btn  btn-primary" style={{ float: "right" }}>
        {props.loading ? (
          <>
            {" "}
           
            <i className="fa fa-spinner fa-spin"></i> Processing
          </>
        ) : props.isAddMode ? (
          <>
            {" "}
            <i className="feather mr-2 icon-check-circle"></i> Submit
          </>
        ) : props.caption ? (
          <>
            {" "}
            <i className="fa fa-spinner fa-spin"></i>
            {props.caption}
          </>
        ) : (
          <>
            {" "}
            <i className="feather mr-2 icon-check-circle"></i> Update
          </>
        )}
      </button>
    </>
  );
}

export default CustomButton;
