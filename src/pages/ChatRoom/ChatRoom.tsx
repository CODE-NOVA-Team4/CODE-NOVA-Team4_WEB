  import React, { useState, useRef, useEffect } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import styles from './ChatRoom.module.css';
  import backgreenArrow from '../../assets/images/arrow-green.svg';
  import sendIcon from '../../assets/images/send.svg';

  interface ChatUser {
    name: string;
    department: string;
    profileImage?: string;
  }

  // 임시 데이터
const otherUser: ChatUser = {
    name: '이지현',
    department: '스마트ICT융합공학과',
    profileImage: '/placeholder.jpg'
  };
  
  const ChatRoom = () => {
    const navigate = useNavigate();
    const { chatId } = useParams();
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
          id: '1',
          senderId: 'other',
          content: '안녕하세요! 책 아직 판매 중이신가요?',
          timestamp: '11:00',
          isRead: true,
        },
        {
          id: '2',
          senderId: 'other',
          content: '혹시 가격 네고 가능할까요?',
          timestamp: '11:00',
          isRead: true,
        },
        {
          id: '3',
          senderId: 'me',
          content: '안녕하세요! 네, 아직 판매 중입니다.',
          timestamp: '11:01',
          isRead: true,
        },
        {
          id: '4',
          senderId: 'me',
          content: '가격은 조정이 어려울 것 같습니다.',
          timestamp: '11:01',
          isRead: true,
        },
      ]);

    const shouldShowTime = (messages: Message[], index: number) => {
        // 마지막 메시지는 항상 시간 표시
        if (index === messages.length - 1) return true;
      
        const currentMsg = messages[index];
        const nextMsg = messages[index + 1];
        
        // 다음 메시지와 보낸 사람이 다르면 시간 표시
        if (currentMsg.senderId !== nextMsg.senderId) return true;
      
        // 시간을 비교할 때는 같은 시간대면 false 반환
        return currentMsg.timestamp !== nextMsg.timestamp;
      };
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!message.trim()) return;
  
      // 새 메시지 추가
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        content: message,
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute:'2-digit' 
        }),
        isRead: false,
      };
  
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    };
  
    return (
        <div className={styles.container}>
          <div className={styles.header}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
              <img src={backgreenArrow} alt="back" />
            </button>
            <div className={styles.headerInfo}>
              <h1 className={styles.productTitle}>미개봉 로봇공학 전공서적</h1>
              <p className={styles.userName}>
                {otherUser.name}({otherUser.department})
              </p>
            </div>
          </div>
    
          <div className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div 
                key={msg.id}
                className={`${styles.messageWrapper} ${msg.senderId === 'me' ? styles.myMessage : styles.otherMessage}`}
              >
                {msg.senderId === 'other' && (
                  <div className={styles.profileImage}>
                    <img src={otherUser.profileImage} alt={otherUser.name} />
                  </div>
                )}
                <div className={styles.messageContent}>
                  <div className={styles.message}>
                    {msg.content}
                  </div>
                  {shouldShowTime(messages, index) && (
                    <div className={styles.timestamp}>
                      {msg.timestamp}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
    
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="채팅을 입력하세요"
              className={styles.input}
            />
            <button 
              type="submit" 
              className={styles.sendButton}
              disabled={!message.trim()}
            >
              <img src={sendIcon} alt="전송" />
            </button>
          </form>
        </div>
      );
    };
  
  export default ChatRoom;