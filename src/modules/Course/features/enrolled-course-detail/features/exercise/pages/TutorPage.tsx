/**
 * Delta Labs Tutor Page
 * Request tutors, view invited tutors, and questions for me
 */

import React, { useState } from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import { DeltaButton } from '../../../../../../../components/theme';
import { Pagination } from '../components';

type TutorTab = 'request-tutor' | 'invited-tutors' | 'questions-for-me';

interface Tutor {
  id: string;
  name: string;
  subject: string;
  institution: string;
  rating: number;
  avatar?: string;
  isInvited?: boolean;
}

interface Question {
  id: string;
  title: string;
  subject: string;
  askedBy: string;
  askedDate: string;
  status: 'pending' | 'answered';
}

interface TutorPageProps {
  onInviteTutor?: (tutorId: string) => void;
  onMessageTutor?: (tutorId: string) => void;
  onBroadcast?: () => void;
}

export const TutorPage: React.FC<TutorPageProps> = ({
  onInviteTutor,
  onMessageTutor,
  onBroadcast,
}) => {
  const [activeTab, setActiveTab] = useState<TutorTab>('request-tutor');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 25;

  const tabs = [
    { id: 'request-tutor' as TutorTab, label: 'Request Tutor' },
    { id: 'invited-tutors' as TutorTab, label: 'Invited Tutors' },
    { id: 'questions-for-me' as TutorTab, label: 'Questions for me' },
  ];

  // Mock tutors data
  const tutors: Tutor[] = [
    {
      id: 'tutor-1',
      name: 'Mr Jospeh Kibru',
      subject: 'Physics',
      institution: 'Addis Ababa UV',
      rating: 3,
    },
    {
      id: 'tutor-2',
      name: 'Dr Sarah Johnson',
      subject: 'Mathematics',
      institution: 'Addis Ababa UV',
      rating: 5,
    },
    {
      id: 'tutor-3',
      name: 'Prof Michael Chen',
      subject: 'Chemistry',
      institution: 'Addis Ababa UV',
      rating: 4,
    },
    {
      id: 'tutor-4',
      name: 'Ms Emily Davis',
      subject: 'Biology',
      institution: 'Addis Ababa UV',
      rating: 4,
    },
  ];

  // Mock invited tutors
  const invitedTutors: Tutor[] = tutors.map(t => ({ ...t, isInvited: true }));

  // Mock questions
  const questions: Question[] = [
    {
      id: 'q-1',
      title: 'How does quantum mechanics explain electron behavior?',
      subject: 'Physics',
      askedBy: 'Student A',
      askedDate: '2024-01-15',
      status: 'pending',
    },
    {
      id: 'q-2',
      title: 'What is the difference between mitosis and meiosis?',
      subject: 'Biology',
      askedBy: 'Student B',
      askedDate: '2024-01-14',
      status: 'answered',
    },
  ];

  // Filter tutors by search query
  const filteredTutors = React.useMemo(() => {
    const tutorList = activeTab === 'invited-tutors' ? invitedTutors : tutors;
    if (!searchQuery.trim()) return tutorList;
    const query = searchQuery.toLowerCase();
    return tutorList.filter(tutor =>
      tutor.name.toLowerCase().includes(query) ||
      tutor.subject.toLowerCase().includes(query) ||
      tutor.institution.toLowerCase().includes(query)
    );
  }, [searchQuery, activeTab]);

  // Filter questions by search query
  const filteredQuestions = React.useMemo(() => {
    if (!searchQuery.trim()) return questions;
    const query = searchQuery.toLowerCase();
    return questions.filter(q =>
      q.title.toLowerCase().includes(query) ||
      q.subject.toLowerCase().includes(query) ||
      q.askedBy.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="w-full font-primary">
      {/* Header with Tabs and Broadcast Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6 border-b border-border-primary">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
            );
          })}
        </div>
        {activeTab === 'request-tutor' && (
          <DeltaButton
            variant="primary"
            size="md"
            className="bg-primary-500 hover:bg-primary-600"
            onClick={onBroadcast}
          >
            Broadcast
          </DeltaButton>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          placeholder="Search"
          value={searchQuery}
          onChange={setSearchQuery}
          maxWidth="full"
          showFilterIcon={true}
        />
      </div>

      {/* Content based on active tab */}
      {activeTab === 'request-tutor' || activeTab === 'invited-tutors' ? (
        <>
          {/* Tutor Grid */}
          {filteredTutors.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {filteredTutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="bg-white rounded-lg border border-border-primary p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-semibold text-lg">
                          {tutor.avatar ? (
                            <img
                              src={tutor.avatar}
                              alt={tutor.name}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            tutor.name.charAt(0)
                          )}
                        </div>
                      </div>

                      {/* Tutor Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-text-primary font-primary mb-1">
                          {tutor.name}
                        </h3>
                        <p className="text-sm text-text-secondary font-primary mb-1">
                          {tutor.subject}
                        </p>
                        <p className="text-sm text-text-tertiary font-primary mb-2">
                          {tutor.institution}
                        </p>
                        <div className="flex items-center gap-1 mb-4">
                          {renderStars(tutor.rating)}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                          <DeltaButton
                            variant="primary"
                            size="sm"
                            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2"
                            onClick={() => onInviteTutor?.(tutor.id)}
                          >
                            Invite
                          </DeltaButton>
                          <button
                            onClick={() => onMessageTutor?.(tutor.id)}
                            className="p-2 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            aria-label="Message tutor"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary font-primary">
                No tutors found. Try adjusting your search.
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Questions List */}
          {filteredQuestions.length > 0 ? (
            <>
              <div className="space-y-4 mb-6">
                {filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-white rounded-lg border border-border-primary p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary font-primary mb-2">
                          {question.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-text-secondary font-primary">
                          <span>{question.subject}</span>
                          <span>•</span>
                          <span>Asked by {question.askedBy}</span>
                          <span>•</span>
                          <span>{new Date(question.askedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          question.status === 'answered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {question.status === 'answered' ? 'Answered' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DeltaButton
                        variant="primary"
                        size="sm"
                        className="bg-primary-500 hover:bg-primary-600"
                      >
                        View Question
                      </DeltaButton>
                      {question.status === 'pending' && (
                        <DeltaButton
                          variant="secondary"
                          size="sm"
                        >
                          Answer
                        </DeltaButton>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary font-primary">
                No questions found. Try adjusting your search.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TutorPage;

