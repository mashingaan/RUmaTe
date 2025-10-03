import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { onboardingSchema } from '@/lib/validation';
import dayjs from 'dayjs';

const campuses = ['Главный кампус', 'Южный кампус', 'Сити', 'Онлайн'];

export default function OnboardingScreen() {
  const { form, step, setStep, updateForm } = useOnboardingStore();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [budgetMin, setBudgetMin] = useState(form.budget?.[0] ?? 15000);
  const [budgetMax, setBudgetMax] = useState(form.budget?.[1] ?? 45000);
  const [selectedDate, setSelectedDate] = useState(
    form.moveInDate ? new Date(form.moveInDate) : new Date()
  );

  const handleNext = () => {
    if (step === 0 && !form.campus) return;
    if (step === 1) {
      updateForm({ budget: [budgetMin, budgetMax] });
    }
    if (step === 2) {
      const result = onboardingSchema.safeParse({
        campus: form.campus,
        budget: [budgetMin, budgetMax],
        moveInDate: selectedDate.toISOString()
      });
      if (result.success) {
        updateForm({ budget: result.data.budget, moveInDate: result.data.moveInDate });
      }
    }
    setStep(Math.min(step + 1, 2));
  };

  const handlePrevious = () => setStep(Math.max(step - 1, 0));

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View className="gap-2">
        <Text className="text-sm text-text-muted">Шаг {step + 1} из 3</Text>
        <Text className="text-2xl font-semibold text-text">Подберём лучшее жильё</Text>
      </View>

      {step === 0 && (
        <View className="gap-3">
          <Text className="text-base text-text">Выберите кампус</Text>
          <View className="flex-row flex-wrap gap-2">
            {campuses.map((campus) => (
              <Chip
                key={campus}
                label={campus}
                selected={form.campus === campus}
                onPress={() => updateForm({ campus })}
              />
            ))}
          </View>
        </View>
      )}

      {step === 1 && (
        <View className="gap-4">
          <Text className="text-base text-text">Какой бюджет?</Text>
          <Text className="text-sm text-text-muted">
            {budgetMin.toLocaleString()} ₽ — {budgetMax.toLocaleString()} ₽
          </Text>
          <View className="gap-3">
            <Text className="text-xs text-text-muted">Минимум</Text>
            <Slider
              minimumValue={10000}
              maximumValue={80000}
              step={1000}
              value={budgetMin}
              onValueChange={setBudgetMin}
              minimumTrackTintColor="#1F6AA5"
            />
            <Text className="text-xs text-text-muted">Максимум</Text>
            <Slider
              minimumValue={budgetMin}
              maximumValue={120000}
              step={1000}
              value={budgetMax}
              onValueChange={setBudgetMax}
              minimumTrackTintColor="#1F6AA5"
            />
          </View>
        </View>
      )}

      {step === 2 && (
        <View className="gap-3">
          <Text className="text-base text-text">Когда планируете въехать?</Text>
          <Pressable
            className="bg-surface border border-border rounded-2xl px-4 py-3"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="text-base text-text">{dayjs(selectedDate).format('D MMMM YYYY')}</Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              onChange={(_event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setSelectedDate(date);
                  updateForm({ moveInDate: date.toISOString() });
                }
              }}
              minimumDate={new Date()}
            />
          )}
        </View>
      )}

      <View className="flex-row justify-between mt-auto pt-8">
        <Button label="Назад" variant="outline" onPress={handlePrevious} disabled={step === 0} />
        <Button label={step === 2 ? 'Готово' : 'Дальше'} onPress={handleNext} />
      </View>
    </ScrollView>
  );
}
