import React from "react";
import CommunicationHub from "../../components/CommunicationHub";

const AdminMessages = () => {
  return <CommunicationHub userRole="admin" backLink="/admin-dashboard" />;
};

export default AdminMessages;
