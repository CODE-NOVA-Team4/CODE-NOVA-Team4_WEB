export interface ChatRoom {
  id: string;
  productId: string;
  productImage: string;
  productTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  otherUserName: string;
  isLastMessageMine: boolean;
  unreadCount: number;
}