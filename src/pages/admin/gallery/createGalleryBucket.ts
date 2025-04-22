
import { supabase } from '@/integrations/supabase/client';

export const createGalleryBucket = async () => {
  try {
    // First check if the bucket already exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const galleryBucketExists = buckets?.some(bucket => bucket.name === 'gallery');
    
    if (!galleryBucketExists) {
      // Create the gallery bucket
      const { error } = await supabase.storage.createBucket('gallery', {
        public: true,
        fileSizeLimit: 10485760, // 10MB limit
      });
      
      if (error) {
        console.error('Error creating gallery bucket:', error);
        return false;
      }
      
      console.log('Gallery bucket created successfully');
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking/creating gallery bucket:', error);
    return false;
  }
};
