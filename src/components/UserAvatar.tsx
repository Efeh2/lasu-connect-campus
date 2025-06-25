
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface UserAvatarProps {
  name: string;
  role?: 'student' | 'teacher' | 'admin';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar = ({ name, role = 'student', size = 'md', className = '' }: UserAvatarProps) => {
  // Generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate background color based on name
  const getAvatarColor = (fullName: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-cyan-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  };

  // Role-based border colors
  const roleBorderColors = {
    student: 'ring-2 ring-blue-400',
    teacher: 'ring-2 ring-green-400',
    admin: 'ring-2 ring-purple-400'
  };

  const initials = getInitials(name);
  const bgColor = getAvatarColor(name);
  const sizeClass = sizeClasses[size];
  const borderClass = roleBorderColors[role];

  return (
    <Avatar className={`${sizeClass} ${borderClass} ${className}`}>
      <AvatarImage src="" alt={name} />
      <AvatarFallback className={`${bgColor} text-white font-semibold`}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
