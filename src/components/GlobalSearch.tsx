
import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Users, Calendar, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'user' | 'assignment' | 'announcement';
  url: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Data Structures and Algorithms',
    description: 'CSC 301 - Advanced computer science course',
    type: 'course',
    url: '/courses/csc301',
  },
  {
    id: '2',
    title: 'Dr. John Smith',
    description: 'Computer Science Professor',
    type: 'user',
    url: '/profile/john-smith',
  },
  {
    id: '3',
    title: 'Assignment: Binary Trees',
    description: 'Due next week - CSC 301',
    type: 'assignment',
    url: '/student/submit-assignment',
  },
  {
    id: '4',
    title: 'Welcome Back Announcement',
    description: 'New semester guidelines and updates',
    type: 'announcement',
    url: '/announcements/1',
  },
];

const getIcon = (type: SearchResult['type']) => {
  switch (type) {
    case 'course':
      return <BookOpen className="h-4 w-4" />;
    case 'user':
      return <Users className="h-4 w-4" />;
    case 'assignment':
      return <FileText className="h-4 w-4" />;
    case 'announcement':
      return <Calendar className="h-4 w-4" />;
    default:
      return <Search className="h-4 w-4" />;
  }
};

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filteredResults = mockSearchResults.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center border-b p-4">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <Input
              placeholder="Search courses, users, assignments..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 text-lg"
              autoFocus
            />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="p-2">
                {results.map((result) => (
                  <a
                    key={result.id}
                    href={result.url}
                    className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-purple-600 dark:text-purple-400">
                        {getIcon(result.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {result.description}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 capitalize">
                        {result.type}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : query.length > 2 ? (
              <div className="p-8 text-center text-gray-500">
                No results found for "{query}"
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Start typing to search...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalSearch;
