
import React from 'react';
import CommunicationHub from '../../components/CommunicationHub';

const TeacherMessages = () => {
  return <CommunicationHub userRole="teacher" backLink="/teacher-dashboard" />;
};

export default TeacherMessages;
