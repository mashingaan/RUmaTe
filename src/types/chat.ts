export type ThreadStatus = 'new' | 'scheduled' | 'closed';

export type Message = {
  id: string;
  thread_id: string;
  sender_id: string;
  text: string;
  created_at: string;
};

export type Thread = {
  id: string;
  listing_id: string;
  initiator_id: string;
  recipient_id: string;
  status: ThreadStatus;
  created_at: string;
  last_message?: Message;
  listing_title?: string;
};
