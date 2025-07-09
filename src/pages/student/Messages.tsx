
import React from 'react';
import CommunicationHub from '../../components/CommunicationHub';

const StudentMessages = () => {
  return <CommunicationHub userRole="student" backLink="/student-dashboard" />;
};

export default StudentMessages;
