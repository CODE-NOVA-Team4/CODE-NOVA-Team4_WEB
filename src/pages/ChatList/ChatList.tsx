import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from './ChatList.module.css';
import backgreenArrow from '../../assets/images/arrow-green.svg';
import { initiateSocket, disconnectSocket, getSocket } from '../../utils/socket.ts';
import { ChatRoom } from '../../types/chat.ts';
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";

interface UnreadMessage {
  roomId: string;
  count: number;
}

const ChatList = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: '1',
      productId: '1',
      productImage: '/placeholder.jpg',
      productTitle: '미개봉 로봇공학 전공서적',
      lastMessage: '중고도서관에서 만나요!',
      lastMessageTime: new Date().toISOString(),
      otherUserName: '김건국',
      isLastMessageMine: false,
      unreadCount: 2,
    },
    {
      id: '2',
      productId: '2',
      productImage: '/placeholder.jpg',
      productTitle: '전자기학 교재 팝니다',
      lastMessage: '네, 알겠습니다. 내일 뵐게요',
      lastMessageTime: new Date().toISOString(),
      otherUserName: '이공대',
      isLastMessageMine: true,
      unreadCount: 0,
    },
    {
      id: '3',
      productId: '3',
      productImage: '/placeholder.jpg',
      productTitle: '프로그래밍 책 3권',
      lastMessage: '내일 어디서 만날까요?',
      lastMessageTime: new Date().toISOString(),
      otherUserName: '박학생',
      isLastMessageMine: false,
      unreadCount: 0,
    }
  ]);
  const [unreadMessages, setUnreadMessages] = useState<UnreadMessage[]>([]);

  // useEffect(() => {
  //   // 웹소켓 연결
  //   const token = localStorage.getItem('token'); // 실제 토큰 관리 방식에 따라 수정
  //   if (token) {
  //     const socket = initiateSocket(token);

  //     // 채팅방 목록 수신
  //     socket.on('chatRooms', (rooms: ChatRoom[]) => {
  //       setChatRooms(rooms);
  //     });

  //     // 새 메시지 수신
  //     socket.on('newMessage', (data: { roomId: string; message: string; timestamp: string }) => {
  //       setChatRooms(prev => prev.map(room => 
  //         room.id === data.roomId
  //           ? { 
  //               ...room, 
  //               lastMessage: data.message,
  //               lastMessageTime: data.timestamp
  //             }
  //           : room
  //       ));

  //       // 읽지 않은 메시지 카운트 증가
  //       setUnreadMessages(prev => {
  //         const existing = prev.find(msg => msg.roomId === data.roomId);
  //         if (existing) {
  //           return prev.map(msg =>
  //             msg.roomId === data.roomId
  //               ? { ...msg, count: msg.count + 1 }
  //               : msg
  //           );
  //         }
  //         return [...prev, { roomId: data.roomId, count: 1 }];
  //       });
  //     });

  //     // 채팅방 목록 요청
  //     socket.emit('getChatRooms');

  //     return () => {
  //       disconnectSocket();
  //     };
  //   }
  // }, []);

  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: ko });
    } catch {
      return timestamp;
    }
  };

  const getUnreadCount = (roomId: string) => {
    const unread = unreadMessages.find(msg => msg.roomId === roomId);
    return unread?.count || 0;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>채팅 목록</h1>
      </div>

      <div className={styles.chatList}>
        {chatRooms.map((chat) => (
          <div
            key={chat.id}
            className={styles.chatItem}
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={chat.productImage}
                alt={chat.productTitle}
                className={styles.productImage}
              />
            </div>
            <div className={styles.chatInfo}>
              <div className={styles.chatHeader}>
                <h3 className={styles.title}>{chat.productTitle}</h3>
                <span className={styles.time}>{formatTime(chat.lastMessageTime)}</span>
              </div>
              <div className={styles.messageWrapper}>
                <p className={styles.message}>
                  {chat.isLastMessageMine ? 
                    `나: ${chat.lastMessage}` : 
                    `${chat.otherUserName}: ${chat.lastMessage}`}
                </p>
                {chat.unreadCount > 0 && (
                  <span className={styles.unreadBadge}>{chat.unreadCount}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Bottombar/>
    </div>
  );
};

export default ChatList;