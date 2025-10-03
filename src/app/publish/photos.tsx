import React, { useState } from 'react';
import { Alert, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { ListingPreview } from '@/components/ListingPreview';
import { usePublishStore } from '@/store/usePublishStore';
import { pickAndUploadImage } from '@/utils/image';

export default function PublishPhotosScreen() {
  const router = useRouter();
  const { details, images, setImages } = usePublishStore();
  const [uploading, setUploading] = useState(false);

  const handleAddPhoto = async () => {
    try {
      setUploading(true);
      const url = await pickAndUploadImage(details.title ?? `draft-${Date.now()}`);
      if (url) {
        setImages([...(images ?? []), url]);
      }
    } catch (error) {
      Alert.alert('РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё', 'РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ С„РѕС‚Рѕ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View className="gap-3">
        <Text className="text-2xl font-semibold text-text">Р”РѕР±Р°РІСЊС‚Рµ С„РѕС‚Рѕ</Text>
        <Pressable
          onPress={handleAddPhoto}
          className="h-40 border border-dashed border-border rounded-3xl items-center justify-center"
        >
          <Text className="text-primary font-medium">Р—Р°РіСЂСѓР·РёС‚СЊ РёР· РіР°Р»РµСЂРµРё</Text>
          <Text className="text-xs text-text-muted">РђРІС‚РѕРєР°РґСЂРёСЂРѕРІР°РЅРёРµ РїРѕРґ 16:9</Text>
        </Pressable>
        {uploading && <Text className="text-sm text-text-muted">Р—Р°РіСЂСѓР·РєР°...</Text>}
        <FlatList
          data={images}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => (
            <Image source={{ uri: item }} className="w-48 h-32 rounded-2xl mr-3" />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <ListingPreview details={details} images={images} />

      <Button label="Р”Р°Р»РµРµ" onPress={() => router.push('/publish/conditions')} />
    </ScrollView>
  );
}

