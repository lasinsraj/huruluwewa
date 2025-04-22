import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

type Destination = {
  id: string;
  name: string;
  location: string;
  short_description: string;
  full_description: string;
  image_url?: string;
  map_url?: string;
  created_at?: string;
  updated_at?: string;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  short_description: z.string().min(10, 'Short description must be at least 10 characters').max(200, 'Short description must be less than 200 characters'),
  full_description: z.string().min(50, 'Full description must be at least 50 characters'),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  map_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type DestinationFormValues = z.infer<typeof formSchema>;

const AddEditDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    if (isEditMode) {
      fetchDestination(id);
    }
  }, [id, isEditMode]);

  const fetchDestination = async (destinationId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', destinationId)
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        setDestination(data);
        form.reset({
          name: data.name,
          location: data.location,
          short_description: data.short_description,
          full_description: data.full_description,
          image_url: data.image_url || '',
          map_url: data.map_url || ''
        });
      }
    } catch (error: any) {
      console.error('Error fetching destination:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load destination",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<DestinationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: destination || {
      name: '',
      location: '',
      short_description: '',
      full_description: '',
      image_url: '',
      map_url: '',
    },
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string>(form.getValues('image_url') || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const url = form.watch('image_url');
    if (url) setImagePreview(url);
  }, [form.watch('image_url')]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);

    const fileExt = file.name.split('.').pop();
    const filePath = `destination-${Date.now()}.${fileExt}`;

    let uploadUrl = "";
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to upload files.",
          variant: "destructive"
        });
        setUploading(false);
        return;
      }

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
        
      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);
      uploadUrl = publicData?.publicUrl;
      
      if (!uploadUrl) throw new Error('Failed to get public URL for uploaded image');

      form.setValue('image_url', uploadUrl, { shouldValidate: true, shouldDirty: true });
      setImagePreview(uploadUrl);
      
      toast({
        title: "Image Uploaded",
        description: "Your image was uploaded successfully.",
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "An error occurred during upload.",
        variant: "destructive"
      });
    }
    
    setUploading(false);
    setUploadProgress(100);
  };

  const onSubmit = async (values: DestinationFormValues) => {
    try {
      setLoading(true);
      
      if (isEditMode) {
        const { error } = await supabase
          .from('destinations')
          .update({
            name: values.name,
            location: values.location,
            short_description: values.short_description,
            full_description: values.full_description,
            image_url: values.image_url || null,
            map_url: values.map_url || null,
          })
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: "Destination Updated",
          description: `Successfully updated ${values.name}`,
        });
      } else {
        const { error } = await supabase
          .from('destinations')
          .insert([{
            name: values.name,
            location: values.location,
            short_description: values.short_description,
            full_description: values.full_description,
            image_url: values.image_url || null,
            map_url: values.map_url || null,
          }]);
          
        if (error) throw error;
        
        toast({
          title: "Destination Created",
          description: `Successfully created ${values.name}`,
        });
      }
      
      navigate('/admin/destinations');
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: "Save Failed",
        description: error.message || "An error occurred while saving the destination.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-hurulu-teal" />
        <span className="ml-2">Loading destination...</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Destination' : 'Add New Destination'}
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Hurulu Wewa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. North Central Province, Sri Lanka" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief overview (max 200 characters)" 
                      {...field} 
                      className="resize-none h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="full_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detailed description of the destination" 
                      {...field} 
                      className="resize-none h-40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="mb-2 block">Main Image</FormLabel>
              <div className="flex gap-6 items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="block w-full border border-input rounded-md text-sm file:bg-hurulu-teal/40 file:text-hurulu-teal"
                  disabled={uploading}
                  onChange={handleFileChange}
                />
                {uploading && (
                  <span className="text-xs text-hurulu-teal animate-pulse">
                    Uploading...
                  </span>
                )}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-16 w-24 object-cover rounded border"
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Upload an image or paste a valid image URL below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                        onBlur={e => {
                          field.onBlur();
                          setImagePreview(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="map_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Maps Embed URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.google.com/maps/embed?..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/destinations')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting || uploading || loading}>
                {isEditMode ? 'Update Destination' : 'Create Destination'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddEditDestination;
