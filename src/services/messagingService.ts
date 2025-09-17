import { supabase } from '../integrations/supabase/client';

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  content: string;
  is_read: boolean;
  message_type: 'general' | 'assignment' | 'announcement';
  related_assignment_id?: string;
  created_at: string;
  sender_profile?: {
    first_name: string;
    last_name: string;
    role: string;
  };
  recipient_profile?: {
    first_name: string;
    last_name: string;
    role: string;
  };
}

export interface Conversation {
  id: string;
  other_user_id: string;
  other_user_name: string;
  other_user_role: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  is_online: boolean;
}

export class MessagingService {
  // Get all conversations for a user
  static async getConversations(userId: string): Promise<Conversation[]> {
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          id,
          sender_id,
          recipient_id,
          content,
          created_at,
          is_read,
          sender_profile:profiles!messages_sender_id_fkey(first_name, last_name, role, is_online),
          recipient_profile:profiles!messages_recipient_id_fkey(first_name, last_name, role, is_online)
        `)
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching conversations:', error);
        return [];
      }

      // Group messages by conversation partner
      const conversationsMap = new Map<string, Conversation>();

      messages?.forEach((message) => {
        const isSender = message.sender_id === userId;
        const otherUserId = isSender ? message.recipient_id : message.sender_id;
        const otherUserProfile = isSender ? message.recipient_profile : message.sender_profile;
        
        if (!otherUserProfile) return;

        const otherUserName = `${otherUserProfile.first_name} ${otherUserProfile.last_name}`;
        
        if (!conversationsMap.has(otherUserId)) {
          conversationsMap.set(otherUserId, {
            id: otherUserId,
            other_user_id: otherUserId,
            other_user_name: otherUserName,
            other_user_role: otherUserProfile.role,
            last_message: message.content,
            last_message_time: message.created_at,
            unread_count: 0,
            is_online: otherUserProfile.is_online || false,
          });
        }

        const conversation = conversationsMap.get(otherUserId)!;
        
        // Update with most recent message
        if (new Date(message.created_at) > new Date(conversation.last_message_time)) {
          conversation.last_message = message.content;
          conversation.last_message_time = message.created_at;
        }

        // Count unread messages
        if (!isSender && !message.is_read) {
          conversation.unread_count++;
        }
      });

      return Array.from(conversationsMap.values());
    } catch (error) {
      console.error('Error in getConversations:', error);
      return [];
    }
  }

  // Get messages between two users
  static async getMessages(userId: string, otherUserId: string): Promise<Message[]> {
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender_profile:profiles!messages_sender_id_fkey(first_name, last_name, role),
          recipient_profile:profiles!messages_recipient_id_fkey(first_name, last_name, role)
        `)
        .or(`and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }

      return messages || [];
    } catch (error) {
      console.error('Error in getMessages:', error);
      return [];
    }
  }

  // Send a new message
  static async sendMessage(
    senderId: string,
    recipientId: string,
    subject: string,
    content: string,
    messageType: 'general' | 'assignment' | 'announcement' = 'general',
    relatedAssignmentId?: string
  ): Promise<Message | null> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: senderId,
          recipient_id: recipientId,
          subject,
          content,
          message_type: messageType,
          related_assignment_id: relatedAssignmentId,
        })
        .select(`
          *,
          sender_profile:profiles!messages_sender_id_fkey(first_name, last_name, role),
          recipient_profile:profiles!messages_recipient_id_fkey(first_name, last_name, role)
        `)
        .single();

      if (error) {
        console.error('Error sending message:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in sendMessage:', error);
      return null;
    }
  }

  // Mark messages as read
  static async markMessagesAsRead(userId: string, otherUserId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('recipient_id', userId)
        .eq('sender_id', otherUserId)
        .eq('is_read', false);

      if (error) {
        console.error('Error marking messages as read:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in markMessagesAsRead:', error);
      return false;
    }
  }

  // Get unread message count for a user
  static async getUnreadCount(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', userId)
        .eq('is_read', false);

      if (error) {
        console.error('Error getting unread count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Error in getUnreadCount:', error);
      return 0;
    }
  }

  // Get all teachers for student messaging
  static async getTeachers(): Promise<{ id: string; name: string; role: string; is_online: boolean }[]> {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, role, is_online')
        .eq('role', 'teacher');

      if (error) {
        console.error('Error fetching teachers:', error);
        return [];
      }

      return profiles?.map(profile => ({
        id: profile.id,
        name: `${profile.first_name} ${profile.last_name}`,
        role: profile.role,
        is_online: profile.is_online || false,
      })) || [];
    } catch (error) {
      console.error('Error in getTeachers:', error);
      return [];
    }
  }

  // Get all students for teacher messaging
  static async getStudents(): Promise<{ id: string; name: string; role: string; is_online: boolean }[]> {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, role, is_online')
        .eq('role', 'student');

      if (error) {
        console.error('Error fetching students:', error);
        return [];
      }

      return profiles?.map(profile => ({
        id: profile.id,
        name: `${profile.first_name} ${profile.last_name}`,
        role: profile.role,
        is_online: profile.is_online || false,
      })) || [];
    } catch (error) {
      console.error('Error in getStudents:', error);
      return [];
    }
  }
}
