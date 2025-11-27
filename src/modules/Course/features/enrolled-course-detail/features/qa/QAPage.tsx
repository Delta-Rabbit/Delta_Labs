/**
 * Delta Labs Q&A Page - Refactored with Atomic Design
 * Main orchestrator component using atomic design principles
 */

import React, { useState } from 'react';
import { SidebarNavigation } from './components';
import { 
  QAView, 
  BookmarksView, 
  NotificationsView, 
  CommunityWikiView, 
  LiveQAView,
  NetworkView,
  PaymentView 
} from './pages';
import { AskQuestionForm } from './forms';
import type { 
  QATab, 
  NetworkTab, 
  QAView as QAViewType,
  AskQuestionStep,
  Audience,
  QuestionPayment,
  Question,
  BookmarkedQuestion,
  Notification,
  WikiTopic,
  LiveSession,
  ChatMessage,
} from './types';

const QAPage = () => {
  // Main view state
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('profile');
  const [activeView, setActiveView] = useState<QAViewType>('qa');
  
  // Q&A view state
  const [activeTab, setActiveTab] = useState<QATab>('my-questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  
  // Ask Question form state
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [askQuestionStep, setAskQuestionStep] = useState<AskQuestionStep>(1);
  const [askQuestionData, setAskQuestionData] = useState({
    title: '',
    details: '',
    tags: [] as string[],
    roadmap: '',
    duplicateSearch: '',
    confirmNoDuplicate: false,
    postAnonymously: true,
    audience: 'school' as Audience,
    payment: 'free' as QuestionPayment,
    questionType: 'Selected Option',
  });
  
  // Answer form state
  const [answerContent, setAnswerContent] = useState('');
  const [anonymousAnswer, setAnonymousAnswer] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 25;
  
  // Live session state
  const [liveTab, setLiveTab] = useState<'my-live' | 'community-live'>('my-live');
  const [joinedLiveSessionId, setJoinedLiveSessionId] = useState<string | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isAvailableOnline, setIsAvailableOnline] = useState(true);
  
  // Network session state
  const [networkTab, setNetworkTab] = useState<NetworkTab>('my-questions');
  const [joinedNetworkSessionId, setJoinedNetworkSessionId] = useState<string | null>(null);
  const [networkMicMuted, setNetworkMicMuted] = useState(false);
  const [networkCameraOn, setNetworkCameraOn] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  
  // Sample data - In production, this would come from API/context
  const allQuestions: Question[] = [
    {
      id: '1',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: { name: 'Leul Solomon', avatar: '' },
      askedDate: '2 days ago',
      answerCount: 2,
      views: 300,
      isClosed: false,
      isBookmarked: false,
      userAnswer: {
        id: 'a1',
        content: 'When a projectile is launched on an inclined plane, the motion becomes more complex than standard projectile motion. The key factors affecting the trajectory are: 1) The angle of projection relative to the horizontal, 2) The incline angle of the plane, and 3) The initial velocity magnitude. The trajectory will be parabolic but modified by the incline. The time of flight increases with steeper incline angles, while the range depends on both the projection angle and incline angle. The maximum height is achieved when the vertical component of velocity becomes zero.',
        votes: 1,
        author: { name: 'You', avatar: '' },
        editedAt: 'just now',
        commentCount: 0,
      },
      answers: [
        {
          id: 'a1',
          content: 'You are the operator of a junction and you hear a Git branch coming. You have no idea which way it is supposed to go. You stop the train to ask the driver which direction they want. And then you set the switch appropriately to open them.',
          votes: 1,
          author: { name: 'Leul Solomon', avatar: '' },
          answeredAt: '4 mins ago',
          commentCount: 0,
        },
        {
          id: 'a2',
          content: 'When a projectile is launched on an inclined plane, the motion becomes more complex than standard projectile motion. The key factors affecting the trajectory are: 1) The angle of projection relative to the horizontal, 2) The incline angle of the plane, and 3) The initial velocity magnitude. The trajectory will be parabolic but modified by the incline. The time of flight increases with steeper incline angles, while the range depends on both the projection angle and incline angle. The maximum height is achieved when the vertical component of velocity becomes zero.',
          votes: 0,
          author: { name: 'John Doe', avatar: '' },
          answeredAt: '1 hour ago',
          commentCount: 2,
        },
      ],
    },
    {
      id: '2',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: { name: 'Leul Solomon', avatar: '' },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isClosed: false,
      isBookmarked: false,
      userAnswer: {
        id: 'a2',
        content: 'The motion of a projectile on an inclined plane requires analyzing both the component parallel to the incline and perpendicular to it. The acceleration due to gravity must be resolved into these components, which changes the standard equations of motion.',
        votes: 0,
        author: { name: 'You', avatar: '' },
        commentCount: 2,
      },
    },
    {
      id: '3',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: { name: 'Leul Solomon', avatar: '' },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isClosed: true,
      isBookmarked: false,
    },
  ];
  
  const bookmarkedQuestions: BookmarkedQuestion[] = [
    {
      id: '1',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: { name: 'Leul Solomon', avatar: '' },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isClosed: false,
      isPaid: true,
    },
    {
      id: '2',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: { name: 'Leul Solomon', avatar: '' },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isClosed: false,
      isPaid: true,
    },
    {
      id: '3',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: { name: 'Leul Solomon', avatar: '' },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isClosed: true,
      isPaid: true,
    },
  ];
  
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'answer',
      title: 'New answer to your question',
      message: 'John Doe answered your question "Principles of Projectile Motion on an Inclined Plane"',
      timestamp: '5 minutes ago',
      isRead: false,
      relatedItem: {
        id: 'q1',
        title: 'Principles of Projectile Motion on an Inclined Plane',
      },
      author: { name: 'John Doe', avatar: '' },
    },
    {
      id: '2',
      type: 'mention',
      title: 'You were mentioned',
      message: 'Sarah Smith mentioned you in a comment on "Kinematics and Dynamics"',
      timestamp: '1 hour ago',
      isRead: false,
      relatedItem: {
        id: 'q2',
        title: 'Kinematics and Dynamics',
      },
      author: { name: 'Sarah Smith', avatar: '' },
    },
    {
      id: '3',
      type: 'course-update',
      title: 'Course update available',
      message: 'New content added to "Advanced Physics" course',
      timestamp: '2 hours ago',
      isRead: true,
      relatedItem: {
        id: 'c1',
        courseName: 'Advanced Physics',
      },
    },
    {
      id: '4',
      type: 'reply',
      title: 'Reply to your comment',
      message: 'Michael Brown replied to your comment on "Quantum Mechanics Basics"',
      timestamp: '3 hours ago',
      isRead: true,
      relatedItem: {
        id: 'q3',
        title: 'Quantum Mechanics Basics',
      },
      author: { name: 'Michael Brown', avatar: '' },
    },
    {
      id: '5',
      type: 'like',
      title: 'Your answer was liked',
      message: 'Emma Wilson and 5 others liked your answer',
      timestamp: '1 day ago',
      isRead: true,
      author: { name: 'Emma Wilson', avatar: '' },
    },
    {
      id: '6',
      type: 'follow',
      title: 'New follower',
      message: 'David Lee started following you',
      timestamp: '2 days ago',
      isRead: true,
      author: { name: 'David Lee', avatar: '' },
    },
  ];
  
  const wikiTopics: WikiTopic[] = [
    {
      id: '1',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: { name: 'Leul Solomon', avatar: '' },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isPaid: true,
      isBookmarked: false,
    },
    {
      id: '2',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: { name: 'Leul Solomon', avatar: '' },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isPaid: true,
      isBookmarked: false,
    },
    {
      id: '3',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: { name: 'Leul Solomon', avatar: '' },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isPaid: true,
      isBookmarked: false,
    },
  ];
  
  const liveSessions: LiveSession[] = [
    {
      id: '1',
      title: 'What is Quantum',
      host: { name: 'Leul Mekonnen', avatar: '' },
      invitationType: 'invited',
      status: 'roadmap',
      action: 'live',
      viewers: 4,
      isOnline: true,
    },
    {
      id: '2',
      title: 'What is Mechanics',
      host: { name: 'Leul Mekonnen', avatar: '' },
      invitationType: 'invited-by',
      status: 'roadmap',
      action: 'join',
      viewers: 0,
      isOnline: true,
    },
  ];
  
  // Handlers
  const handleSidebarItemChange = (item: string) => {
    setActiveSidebarItem(item);
    const viewMap: Record<string, QAViewType> = {
      'profile': 'qa',
      'bookmark': 'bookmarks',
      'notification': 'notifications',
      'mindmap': 'community-wiki',
      'connection': 'live',
      'links': 'network',
      'financial': 'payment',
    };
    setActiveView(viewMap[item] || 'qa');
    setSelectedQuestionId(null);
    setShowAskQuestion(false);
    setJoinedLiveSessionId(null);
    setJoinedNetworkSessionId(null);
  };
  
  const handleAskQuestionSubmit = () => {
    // Handle form submission
    console.log('Question submitted:', askQuestionData);
    setShowAskQuestion(false);
    setAskQuestionStep(1);
    setAskQuestionData({
      title: '',
      details: '',
      tags: [],
      roadmap: '',
      duplicateSearch: '',
      confirmNoDuplicate: false,
      postAnonymously: true,
      audience: 'school',
      payment: 'free',
      questionType: 'Selected Option',
    });
  };
  
  const handleAnswerSubmit = () => {
    if (answerContent.trim()) {
      console.log('Answer submitted:', { answerContent, anonymousAnswer });
      setAnswerContent('');
      setAnonymousAnswer(false);
    }
  };
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSendChatMessage = () => {
    if (chatInput.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        author: 'You',
        message: chatInput,
        timestamp: 'just now',
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
    }
  };
  
  // Render based on active view
  const renderView = () => {
    if (showAskQuestion) {
      return (
        <AskQuestionForm
          step={askQuestionStep}
          data={askQuestionData}
          onDataChange={(data: Partial<typeof askQuestionData>) => setAskQuestionData((prev: typeof askQuestionData) => ({ ...prev, ...data }))}
          onStepChange={setAskQuestionStep}
          onCancel={() => {
            setShowAskQuestion(false);
            setAskQuestionStep(1);
            setAskQuestionData({
              title: '',
              details: '',
              tags: [],
              roadmap: '',
              duplicateSearch: '',
              confirmNoDuplicate: false,
              postAnonymously: true,
              audience: 'school',
              payment: 'free',
              questionType: 'Selected Option',
            });
          }}
          onSubmit={handleAskQuestionSubmit}
        />
      );
    }
    
    switch (activeView) {
      case 'qa':
        return (
          <QAView
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            questions={allQuestions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            selectedQuestionId={selectedQuestionId}
            onQuestionClick={setSelectedQuestionId}
            onBackToQuestions={() => setSelectedQuestionId(null)}
            onAskQuestion={() => setShowAskQuestion(true)}
            answerContent={answerContent}
            onAnswerContentChange={setAnswerContent}
            anonymousAnswer={anonymousAnswer}
            onAnonymousAnswerChange={setAnonymousAnswer}
            onAnswerSubmit={handleAnswerSubmit}
          />
        );
      
      case 'bookmarks':
        return (
          <BookmarksView
            questions={bookmarkedQuestions}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onQuestionClick={setSelectedQuestionId}
          />
        );
      
      case 'notifications':
        return (
          <NotificationsView
            notifications={notifications}
            onNotificationClick={(id: string) => console.log('Notification clicked:', id)}
            onMarkAsRead={(id: string) => console.log('Mark as read:', id)}
          />
        );
      
      case 'community-wiki':
        return (
          <CommunityWikiView
            topics={wikiTopics}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onTopicClick={(id: string) => console.log('Topic clicked:', id)}
          />
        );
      
      case 'live':
        return (
          <LiveQAView
            sessions={liveSessions}
            activeTab={liveTab}
            onTabChange={setLiveTab}
            isAvailableOnline={isAvailableOnline}
            onAvailableOnlineChange={setIsAvailableOnline}
            onJoinSession={setJoinedLiveSessionId}
            joinedSessionId={joinedLiveSessionId}
            onLeaveSession={() => setJoinedLiveSessionId(null)}
            isMicMuted={isMicMuted}
            onMicToggle={() => setIsMicMuted(!isMicMuted)}
            isCameraOn={isCameraOn}
            onCameraToggle={() => setIsCameraOn(!isCameraOn)}
          />
        );
      
      case 'network':
        return (
          <NetworkView
            questions={allQuestions}
            activeTab={networkTab}
            onTabChange={setNetworkTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            selectedQuestionId={selectedQuestionId}
            onQuestionClick={setSelectedQuestionId}
            onBackToQuestions={() => setSelectedQuestionId(null)}
            joinedSessionId={joinedNetworkSessionId}
            onJoinSession={setJoinedNetworkSessionId}
            onLeaveSession={() => setJoinedNetworkSessionId(null)}
            isMicMuted={networkMicMuted}
            onMicToggle={() => setNetworkMicMuted(!networkMicMuted)}
            isCameraOn={networkCameraOn}
            onCameraToggle={() => setNetworkCameraOn(!networkCameraOn)}
            chatMessages={chatMessages}
            chatInput={chatInput}
            onChatInputChange={setChatInput}
            onSendMessage={handleSendChatMessage}
          />
        );
      
      case 'payment':
        return <PaymentView />;
      
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full font-primary py-6 relative">
      {/* Left Sidebar Navigation */}
      <SidebarNavigation 
        activeItem={activeSidebarItem} 
        onItemChange={handleSidebarItemChange}
        currentPage={activeView}
      />
      
      {/* Main Content */}
      {renderView()}
    </div>
  );
};

export default QAPage;
