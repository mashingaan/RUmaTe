import React from 'react';
import { Alert, View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';
import { getMockChatById, getProfileByChat } from '@/data/mockChats';
import { AlertTriangle, ArrowLeft, UserPlus } from 'lucide-react-native';
import clsx from 'clsx';

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const chat = params.id ? getMockChatById(params.id) : undefined;
  const profile = chat ? getProfileByChat(chat) : undefined;
  const [draft, setDraft] = React.useState('');
  const [reportOpen, setReportOpen] = React.useState(false);

  if (!chat || !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-bg">
        <Text className="text-base text-text-muted">Чат не найден</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <View className="px-4 pt-12 pb-4 bg-surface flex-row items-center justify-between shadow-sm">
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-primary-soft items-center justify-center"
        >
          <ArrowLeft color={colors.primary} size={20} />
        </TouchableOpacity>
        <View className="flex-row items-center gap-3">
          <Image source={profile.avatar} className="w-12 h-12 rounded-full" />
          <View>
            <Text style={[typography.h2, { color: colors.text }]}>{profile.name.split(' ')[0]}</Text>
            <Text className="text-xs text-primary">{profile.role}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            accessibilityRole="button"
            className="w-10 h-10 rounded-full bg-primary items-center justify-center"
          >
            <UserPlus color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            className="w-10 h-10 rounded-full bg-danger/10 items-center justify-center border border-danger/30"
            onPress={() => setReportOpen((prev) => !prev)}
          >
            <AlertTriangle color={colors.danger} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {reportOpen && (
        <>
          <TouchableOpacity
            accessibilityRole="button"
            className="absolute inset-0"
            activeOpacity={1}
            onPress={() => setReportOpen(false)}
          />
          <View className="absolute right-4 top-28 w-64 bg-surface rounded-2xl border border-danger px-3 py-3 shadow-lg z-20">
            <Text className="text-sm font-semibold text-text mb-2">Оставить жалобу</Text>
            {['Насилие', 'Незаконные товары', 'Порнография', 'Терроризм', 'Мошенничество или спам', 'Жестокое обращение с детьми', 'Другое'].map(
              (reason) => (
                <TouchableOpacity
                  key={reason}
                  className="py-2"
                  onPress={() => {
                    setReportOpen(false);
                    Alert.alert('Жалоба отправлена', `Мы рассмотрим обращение: ${reason.toLowerCase()}.`);
                  }}
                >
                  <Text className="text-sm text-text">{reason}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </>
      )}

      <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ gap: 12 }}>
        {chat.messages.map((message) => {
          const isMe = message.sender === 'me';
          const containerClasses = clsx('flex', isMe ? 'items-end' : 'items-start');
          const bubbleClasses = clsx(
            'max-w-[80%] rounded-3xl px-5 py-3',
            isMe ? 'bg-primary rounded-br-sm' : 'bg-surface rounded-bl-sm'
          );
          const textColor = isMe ? 'text-white' : 'text-text';
          const timeClasses = clsx('text-xs mt-2', isMe ? 'text-white/70 self-end' : 'text-text-muted');
          return (
            <View key={message.id} className={containerClasses}>
              <View className={bubbleClasses}>
                <Text className={textColor}>{message.text}</Text>
                <Text className={timeClasses}>{message.time}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View className="px-5">
        <TouchableOpacity
          accessibilityRole="button"
          className="mb-4 px-4 py-3 rounded-full bg-primary-soft items-center"
        >
          <Text className="text-sm font-semibold text-primary">Добавить в качестве соседа</Text>
        </TouchableOpacity>
      </View>

      <View className="px-5 pb-8">
        <View className="flex-row items-center gap-3 bg-surface border border-border rounded-full px-4 py-2.5">
          <TextInput
            placeholder="Введите сообщение"
            value={draft}
            onChangeText={setDraft}
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            accessibilityRole="button"
            className={clsx('px-4 py-2 rounded-full', draft ? 'bg-primary' : 'bg-primary-soft')}
            disabled={!draft}
          >
            <Text className={clsx('text-sm font-semibold', draft ? 'text-white' : 'text-primary')}>
              Отправить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
