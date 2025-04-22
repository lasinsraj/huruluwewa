
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, MessageSquare, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  location?: string;
  image_url?: string;
  created_at: string;
}

const AdminReviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch reviews"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Review deleted successfully"
      });
      
      // Refresh reviews
      setReviews(reviews.filter(review => review.id !== id));
      
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete review"
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reviews Management</h2>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-hurulu-teal" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-500">No reviews submitted yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{review.title}</CardTitle>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4">{review.content}</p>
                
                <div className="flex flex-wrap justify-between items-end">
                  <div className="space-y-1">
                    {review.location && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">From:</span> {review.location}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Date:</span> {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {review.image_url && (
                    <div className="mt-4 max-w-xs">
                      <img 
                        src={review.image_url} 
                        alt="Review attachment" 
                        className="rounded-md w-full object-cover max-h-40" 
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(review.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Review
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
