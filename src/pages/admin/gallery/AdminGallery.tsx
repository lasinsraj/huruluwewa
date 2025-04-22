import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Image, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { createGalleryBucket } from './createGalleryBucket';

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  tags?: string[];
  location?: string;
  created_at: string;
}

const AdminGallery = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [bucketReady, setBucketReady] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    tags: '',
    image: null as File | null
  });

  useEffect(() => {
    const initializeGallery = async () => {
      // Make sure the bucket exists
      const ready = await createGalleryBucket();
      setBucketReady(ready);
      
      if (ready) {
        fetchImages();
      }
    };
    
    initializeGallery();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch gallery images"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bucketReady) {
      toast({
        variant: "destructive",
        title: "Storage Not Ready",
        description: "The gallery storage is not ready. Please try again later."
      });
      return;
    }
    
    if (!formData.title || !formData.image) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Title and image are required"
      });
      return;
    }

    try {
      setUploading(true);
      
      // 1. Upload image to storage
      const fileExt = formData.image.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, formData.image);
      
      if (uploadError) throw uploadError;
      
      // 2. Get public URL
      const { data: publicURLData } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);
      
      const image_url = publicURLData.publicUrl;
      
      // 3. Insert record in the database
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert({
          title: formData.title,
          description: formData.description || null,
          location: formData.location || null,
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,
          image_url
        });
      
      if (dbError) throw dbError;
      
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        tags: '',
        image: null
      });
      
      // Refresh images
      fetchImages();
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, image_url: string) => {
    try {
      // Extract file path from the URL
      const storageUrl = supabase.storage.from('gallery').getPublicUrl('').data.publicUrl;
      const filePath = image_url.replace(storageUrl, '');
      
      // 1. Delete from database
      const { error: dbError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);
      
      if (dbError) throw dbError;
      
      // 2. Delete from storage (this might fail if the file doesn't exist)
      await supabase.storage
        .from('gallery')
        .remove([filePath]);
      
      toast({
        title: "Success",
        description: "Image deleted successfully"
      });
      
      // Refresh images
      setImages(images.filter(img => img.id !== id));
      
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete image"
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gallery Management</h2>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload New Image</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title *</label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="nature, wildlife, etc."
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">Image *</label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Image
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <h3 className="text-xl font-bold mb-4">Gallery Images</h3>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-hurulu-teal" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <Image className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-500">No images in the gallery yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={image.image_url} 
                  alt={image.title}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{image.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                {image.description && (
                  <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                )}
                
                {image.location && (
                  <p className="text-xs text-gray-500 mb-2">
                    <span className="font-medium">Location:</span> {image.location}
                  </p>
                )}
                
                {image.tags && image.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {image.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(image.created_at).toLocaleDateString()}
                </span>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(image.id, image.image_url)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
