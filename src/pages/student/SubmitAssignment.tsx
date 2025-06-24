
import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const SubmitAssignment = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit Assignment</h1>

        <div className="grid gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Data Structures Assignment #3</h3>
                <p className="text-gray-600">Implementation of Binary Search Trees</p>
              </div>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Due Soon</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Due: Dec 28, 2024</span>
              </div>
              <div className="flex items-center">
                <FileText size={16} className="mr-1" />
                <span>Max file size: 10MB</span>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-lg font-medium text-gray-900 mb-2">Upload your assignment</div>
              <div className="text-gray-600 mb-4">Drag and drop your file here, or click to browse</div>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.zip"
              />
              <label
                htmlFor="file-upload"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Choose File
              </label>
              {selectedFile && (
                <div className="mt-4 text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Any additional comments about your submission..."
              />
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
                Submit Assignment
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Software Engineering Project</h3>
                <p className="text-gray-600">Phase 2: System Design Document</p>
              </div>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">Upcoming</span>
            </div>
            
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Due: Jan 5, 2025</span>
              </div>
              <div className="flex items-center">
                <FileText size={16} className="mr-1" />
                <span>Max file size: 15MB</span>
              </div>
            </div>

            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
              View Assignment Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitAssignment;
