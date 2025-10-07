import type { ImageSourcePropType } from 'react-native';
import type { Preference } from '@/types/preferences';

export type MockProfile = {
  id: string;
  name: string;
  match: number;
  cover: ImageSourcePropType;
  avatar: ImageSourcePropType;
  role: string;
  verified: boolean;
  about: string;
  preferences: Preference;
  tags: string[];
};

const createAvatar = (seed: string): ImageSourcePropType => ({
  uri: `https://source.boringavatars.com/marble/256/${seed}`
});

const createCover = (seed: string): ImageSourcePropType => ({
  uri: `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=80`
});

export const mockProfiles: MockProfile[] = [
  {
    id: 'ivan',
    name: 'Иван Иванов',
    match: 94,
    cover: createCover('photo-1524504388940-b1c1722653e1'),
    avatar: createAvatar('ivan'),
    role: 'Сосед',
    verified: true,
    about: 'Учусь в ИМТК на 3 курсе. Люблю готовить и поддерживать порядок дома.',
    preferences: {
      cleanliness: 'high',
      pets: 'ok',
      alcohol: 'neutral',
      smoking: 'negative',
      sleep: 'early'
    },
    tags: ['Можно потратить 20 тыс', 'Ищу соседа', 'Хочу жить вдвоём']
  },
  {
    id: 'ed',
    name: 'Эдуард Мартынов',
    match: 92,
    cover: createCover('photo-1544723795-3fb6469f5b39'),
    avatar: createAvatar('ed'),
    role: 'Сосед',
    verified: true,
    about: 'Учусь на архитектора, люблю уют и чистоту, часто бываю в библиотеке.',
    preferences: {
      cleanliness: 'high',
      pets: 'has',
      alcohol: 'neutral',
      smoking: 'negative',
      sleep: 'flex'
    },
    tags: ['Готов делить студию', 'Чистота важна', 'Есть питомец']
  },
  {
    id: 'mila',
    name: 'Мила Орлова',
    match: 88,
    cover: createCover('photo-1508214751196-bcfd4ca60f91'),
    avatar: createAvatar('mila'),
    role: 'Соседка',
    verified: false,
    about: 'Учусь на психолога, люблю настолки и уютные вечера с сериалами.',
    preferences: {
      cleanliness: 'mid',
      pets: 'no',
      alcohol: 'neutral',
      smoking: 'negative',
      sleep: 'early'
    },
    tags: ['До 25 тыс', 'Ищу соседку', 'Без животных']
  },
  {
    id: 'alex',
    name: 'Алексей Смирнов',
    match: 86,
    cover: createCover('photo-1527980965255-d3b416303d12'),
    avatar: createAvatar('alex'),
    role: 'Сосед',
    verified: true,
    about: 'Работаю в стартапе, часто бываю в кампусе до позднего вечера.',
    preferences: {
      cleanliness: 'mid',
      pets: 'ok',
      alcohol: 'positive',
      smoking: 'neutral',
      sleep: 'late'
    },
    tags: ['Готов тратить 30 тыс', 'Люблю готовить', 'Нейтрален к животным']
  },
  {
    id: 'kira',
    name: 'Кира Ли',
    match: 90,
    cover: createCover('photo-1517841905240-472988babdf9'),
    avatar: createAvatar('kira'),
    role: 'Соседка',
    verified: false,
    about: 'Учусь на программиста, люблю работать над проектами в коворкинге и играть в волейбол.',
    preferences: {
      cleanliness: 'mid',
      pets: 'has',
      alcohol: 'positive',
      smoking: 'neutral',
      sleep: 'flex'
    },
    tags: ['Ищу соседку', 'Есть питомец', 'Готова делить подсобку']
  },
  {
    id: 'daniil',
    name: 'Даниил Фомин',
    match: 84,
    cover: createCover('photo-1492562080023-ab3db95bfbce'),
    avatar: createAvatar('daniil'),
    role: 'Сосед',
    verified: true,
    about: 'Учусь на инженера, люблю киберспорт и готовить экспериментальные блюда.',
    preferences: {
      cleanliness: 'low',
      pets: 'ok',
      alcohol: 'neutral',
      smoking: 'positive',
      sleep: 'late'
    },
    tags: ['Можно жить втроём', 'Люблю настолки', 'Нужен простор']
  }
];

export const getMockProfileById = (id: string) => mockProfiles.find((profile) => profile.id === id);
