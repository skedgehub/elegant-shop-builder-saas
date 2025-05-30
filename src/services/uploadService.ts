
import { supabase } from '@/integrations/supabase/client';

export const uploadService = {
  async uploadImage(file: File, bucket: string = 'images'): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = fileName;

      console.log('Uploading file:', fileName, 'to bucket:', bucket);

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Erro ao fazer upload: ${uploadError.message}`);
      }

      console.log('Upload successful:', data);

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      console.log('Public URL:', urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload service error:', error);
      throw error;
    }
  },

  async deleteImage(url: string, bucket: string = 'images'): Promise<void> {
    try {
      const filePath = url.split('/').pop();
      if (!filePath) return;

      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error);
        throw new Error(`Erro ao deletar imagem: ${error.message}`);
      }
    } catch (error) {
      console.error('Delete service error:', error);
      throw error;
    }
  }
};
