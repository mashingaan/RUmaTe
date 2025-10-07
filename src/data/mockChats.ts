import type { MockProfile } from './mockProfiles';
import { mockProfiles } from './mockProfiles';

type ChatMessage = {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
};

export type MockChat = {
  id: string;
  profileId: MockProfile['id'];
  preview: string;
  time: string;
  unread?: boolean;
  messages: ChatMessage[];
};

export const mockChats: MockChat[] = [
  {
    id: 'ivan',
    profileId: 'ivan',
    preview: 'Учусь в ИМТК на 3 курсе, могу показать квартиру сегодня.',
    time: '09:18',
    unread: true,
    messages: [
      { id: '1', sender: 'them', time: '09:16', text: 'Привет! Хочу с тобой жить! 😊' },
      { id: '2', sender: 'me', time: '09:17', text: 'Привет! Рада знакомству! Давай обсудим' },
      { id: '3', sender: 'them', time: '09:18', text: 'Отлично, когда удобно созвониться?' }
    ]
  },
  {
    id: 'ed',
    profileId: 'ed',
    preview: 'Давай договоримся про встречу?',
    time: '08:06',
    messages: [
      { id: '1', sender: 'them', time: '08:02', text: 'Привет! Как насчёт встретиться на кампусе вечером?' },
      { id: '2', sender: 'me', time: '08:04', text: 'Привет! Мне удобно в 19:00.' },
      { id: '3', sender: 'them', time: '08:06', text: 'Супер, до встречи!' }
    ]
  },
  {
    id: 'mila',
    profileId: 'mila',
    preview: 'Я уже зарегистрировалась, жду подтверждения',
    time: '12:44',
    unread: true,
    messages: [
      { id: '1', sender: 'them', time: '12:40', text: 'Я уже зарегистрировалась, жду подтверждения' },
      { id: '2', sender: 'me', time: '12:41', text: 'Проверю вечером, спасибо!' }
    ]
  },
  {
    id: 'alex',
    profileId: 'alex',
    preview: 'У меня будет две строки для вам подходящих вариантов.',
    time: '07:30',
    messages: [
      { id: '1', sender: 'them', time: '07:20', text: 'Нашёл пару вариантов рядом с кампусом, отправлю ссылки.' },
      { id: '2', sender: 'me', time: '07:25', text: 'Здорово, спасибо!' },
      { id: '3', sender: 'them', time: '07:30', text: 'Отправил. Жду твоё мнение.' }
    ]
  }
];

export const getMockChatById = (id: string) => mockChats.find((chat) => chat.id === id);

export const getProfileByChat = (chat: MockChat) =>
  mockProfiles.find((profile) => profile.id === chat.profileId);

