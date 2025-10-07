import React from 'react';
import { View, Text, TextInput, Alert, Image } from 'react-native';
import { colors, typography } from '@/constants/theme';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';

export default function ReportIssueScreen() {
  const router = useRouter();
  const [message, setMessage] = React.useState('');

  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert('Расскажите подробнее', 'Пожалуйста, опишите ошибку.');
      return;
    }
    Alert.alert('Спасибо!', 'Мы получили ваше сообщение.');
    setMessage('');
    router.back();
  };

  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-6 mt-12">
        <Text style={[typography.h1, { color: colors.text, textAlign: 'center' }]}>Столкнулись с ошибками?</Text>
        <Text className="text-base text-text-muted text-center">
          Напишите нам об этом! Опишите проблему, чтобы мы смогли помочь быстрее.
        </Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Введите текст"
          placeholderTextColor={colors.iconMuted}
          multiline
          numberOfLines={4}
          className="w-full bg-surface border border-border rounded-3xl px-4 py-4 text-base min-h-[160px]"
        />
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/dmtrbrl/rumate-assets/main/404.png' }}
          style={{ width: 180, height: 120, resizeMode: 'contain' }}
        />
      </View>
      <Button label="Отправить" onPress={handleSubmit} />
    </View>
  );
}

