import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import RenderRequests from "./RenderRequests";
const InRequests = ({ inrequests}) => {


  return (
    <div className="inrequest-container">
      {inrequests.length > 0 ? (
        <RenderRequests requests={inrequests.reverse()} />
      ) : (
        <label>No Friend Request</label>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
    inrequests: state.request.inrequests,
  };
};

export default connect(mapStateToProps, null)(InRequests);
