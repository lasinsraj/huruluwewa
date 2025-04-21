
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

// Mock data
const mockDestinations = [
  {
    id: '1',
    name: 'Hurulu Wewa',
    location: 'North Central Province, Sri Lanka',
    shortDescription: 'A paradise for wildlife enthusiasts and nature lovers.',
    fullDescription: 'Hurulu Wewa is a man-made reservoir located in the North Central Province of Sri Lanka, surrounded by the Hurulu Forest Reserve. This remarkable ecosystem is designated as a biosphere reserve by UNESCO, recognized for its exceptional biodiversity and ecological significance.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.55024608219!2d80.54768226729283!3d8.130713918878696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcd5bf70cac095%3A0xd8b2f035f7ef4921!2sHurulu%20Eco%20Park!5e0!3m2!1sen!2sus!4v1713760323457!5m2!1sen!2sus'
  }
];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters').max(200, 'Short description must be less than 200 characters'),
  fullDescription: z.string().min(50, 'Full description must be at least 50 characters'),
  imageUrl: z.string().url('Must be a valid URL'),
  mapUrl: z.string().url('Must be a valid URL'),
});

type DestinationFormValues = z.infer<typeof formSchema>;

const STORAGE_BUCKET = 'admin-destinations';

const AddEditDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;

  // Get destination if in edit mode
  const existingDestination = isEditMode 
    ? mockDestinations.find(dest => dest.id === id) 
    : null;

  const form = useForm<DestinationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: existingDestination || {
      name: '',
      location: '',
      shortDescription: '',
      fullDescription: '',
      imageUrl: '',
      mapUrl: '',
    },
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string>(form.getValues('imageUrl') || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update image preview if the imageUrl changes
  useEffect(() => {
    const url = form.watch('imageUrl');
    if (url) setImagePreview(url);
  }, [form.watch('imageUrl')]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);

    // Generate a unique path
    const fileExt = file.name.split('.').pop();
    const filePath = `destination-${Date.now()}.${fileExt}`;

    let uploadUrl = "";
    try {
      // Check if user is authenticated
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

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
        
      if (error) throw error;

      // Get public URL
      const { data: publicData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);
      uploadUrl = publicData?.publicUrl;
      
      if (!uploadUrl) throw new Error('Failed to get public URL for uploaded image');

      // Set image URL in the form
      form.setValue('imageUrl', uploadUrl, { shouldValidate: true, shouldDirty: true });
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

  const onSubmit = (values: DestinationFormValues) => {
    // In a real app, you would save to a database
    console.log(values);
    
    toast({
      title: isEditMode ? "Destination Updated" : "Destination Created",
      description: `Successfully ${isEditMode ? 'updated' : 'created'} ${values.name}`,
    });
    
    navigate('/admin/destinations');
  };

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
              name="shortDescription"
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
              name="fullDescription"
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
                name="imageUrl"
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
                name="mapUrl"
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
              <Button type="submit" disabled={form.formState.isSubmitting || uploading}>
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
