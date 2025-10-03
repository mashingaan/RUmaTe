import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { supabase } from '@/lib/supabase';

export const pickAndUploadImage = async (listingId: string) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: false,
    quality: 0.8
  });

  if (result.canceled) return null;

  const asset = result.assets[0];
  const manipulated = await ImageManipulator.manipulateAsync(
    asset.uri,
    [{ resize: { width: 1080 } }, { crop: { originX: 0, originY: 0, width: asset.width ?? 1080, height: asset.height ?? 720 } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );

  const response = await fetch(manipulated.uri);
  const blob = await response.blob();
  const filePath = `${listingId}/${Date.now()}.jpg`;
  const { data, error } = await supabase.storage.from('listing-images').upload(filePath, blob, {
    contentType: 'image/jpeg',
    upsert: true
  });
  if (error) throw error;
  const { data: publicUrl } = supabase.storage.from('listing-images').getPublicUrl(data.path);
  return publicUrl.publicUrl;
};
