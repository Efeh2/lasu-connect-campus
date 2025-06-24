
import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ViewGrades = () => {
  const courses = [
    {
      name: 'Data Structures & Algorithms',
      instructor: 'Dr. Johnson',
      assignments: [
        { name: 'Assignment 1', grade: 85, total: 100, date: '2024-11-15' },
        { name: 'Assignment 2', grade: 92, total: 100, date: '2024-11-30' },
        { name: 'Quiz 1', grade: 78, total: 100, date: '2024-12-05' },
        { name: 'Assignment 3', grade: null, total: 100, date: '2024-12-28' },
      ],
    },
    {
      name: 'Database Management Systems',
      instructor: 'Prof. Williams',
      assignments: [
        { name: 'Quiz 1', grade: 88, total: 100, date: '2024-11-20' },
        { name: 'Project Phase 1', grade: 90, total: 100, date: '2024-12-10' },
        { name: 'Quiz 2', grade: 85, total: 100, date: '2024-12-18' },
      ],
    },
    {
      name: 'Software Engineering',
      instructor: 'Dr. Brown',
      assignments: [
        { name: 'Assignment 1', grade: 95, total: 100, date: '2024-11-25' },
        { name: 'Project Phase 1', grade: 88, total: 100, date: '2024-12-15' },
        { name: 'Project Phase 2', grade: null, total: 100, date: '2025-01-05' },
      ],
    },
  ];

  const calculateCourseAverage = (assignments: any[]) => {
    const gradedAssignments = assignments.filter(a => a.grade !== null);
    if (gradedAssignments.length === 0) return null;
    const sum = gradedAssignments.reduce((acc, a) => acc + a.grade, 0);
    return Math.round(sum / gradedAssignments.length);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 bg-green-50';
    if (grade >= 80) return 'text-blue-600 bg-blue-50';
    if (grade >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTrendIcon = (assignments: any[]) => {
    if (assignments.length < 2) return <Minus size={16} />;
    const recent = assignments.filter(a => a.grade !== null).slice(-2);
    if (recent.length < 2) return <Minus size={16} />;
    
    if (recent[1].grade > recent[0].grade) return <TrendingUp size={16} className="text-green-600" />;
    if (recent[1].grade < recent[0].grade) return <TrendingDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/student-dashboard" className="flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Academic Performance</h1>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">87.5%</div>
            <div className="text-sm text-gray-600">Overall Average</div>
          </div>
        </div>

        <div className="space-y-8">
          {courses.map((course, index) => {
            const average = calculateCourseAverage(course.assignments);
            
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{course.name}</h2>
                    <p className="text-gray-600">{course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold px-3 py-1 rounded-full ${average ? getGradeColor(average) : 'text-gray-600 bg-gray-50'}`}>
                      {average ? `${average}%` : 'N/A'}
                    </div>
                    <div className="flex items-center justify-end mt-1">
                      {getTrendIcon(course.assignments)}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-gray-600 font-medium">Assignment</th>
                        <th className="text-center py-3 text-gray-600 font-medium">Grade</th>
                        <th className="text-center py-3 text-gray-600 font-medium">Total</th>
                        <th className="text-center py-3 text-gray-600 font-medium">Percentage</th>
                        <th className="text-right py-3 text-gray-600 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.assignments.map((assignment, assignmentIndex) => (
                        <tr key={assignmentIndex} className="border-b border-gray-100">
                          <td className="py-3 font-medium text-gray-900">{assignment.name}</td>
                          <td className="text-center py-3">
                            {assignment.grade !== null ? (
                              <span className={`px-2 py-1 rounded ${getGradeColor(assignment.grade)}`}>
                                {assignment.grade}
                              </span>
                            ) : (
                              <span className="text-gray-400">Pending</span>
                            )}
                          </td>
                          <td className="text-center py-3 text-gray-600">{assignment.total}</td>
                          <td className="text-center py-3">
                            {assignment.grade !== null ? (
                              <span className={`font-medium ${assignment.grade >= 80 ? 'text-green-600' : assignment.grade >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {Math.round((assignment.grade / assignment.total) * 100)}%
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="text-right py-3 text-gray-600 text-sm">
                            {new Date(assignment.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewGrades;
