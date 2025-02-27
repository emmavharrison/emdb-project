import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../amplify/data/resource"
import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { ReviewMovieCards } from "@/app/components/movie-cards/review-cards/ReviewMovieCards";
import { Review } from "@/app/types/movie-backend-types";

export const ReviewsPage = () => {
  // const [reviews, setReviews] = useState<Schema["Movie"]["type"][]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuthenticator((context) => [context.user]);

  const mapReviews = (reviews: Schema["Movie"]["type"][]): Review[] => {
    return reviews
      .filter(review => review.movieName && review.movieId && review.reviewText)
      .map(review => ({
        movieName: review.movieName!,
        movieId: review.movieId!,
        reviewText: review.reviewText!
      }));
  };

  useEffect(() => {
    const client = generateClient<Schema>()
    
    const fetchReviews = async () => {
      try {
        const { data: reviews } = await client.models.Movie.list({
          userId: user?.userId,
          sk: { beginsWith: 'REVIEW#' }
        });
        console.log('reviews', reviews);
        // setReviews(reviews);
        setReviews(mapReviews(reviews))
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return <p>Loading Reviews...</p>
  }

//   return (
//     <div>
//       <h1>Reviews page</h1>
//       {reviews.length > 0 ? (
//         <div>
//           {reviews.map(review => (
//             <div 
//               key={review.sk} 
//             >
//               Review for {review.movieName}: {review.reviewText}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No reviews found.</p>
//       )}
//     </div>
//   );

return (
    <div>
      <h1>Reviews page</h1>
      {reviews.length > 0 ? (
        <div>
            <ReviewMovieCards data={reviews} />
        </div>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};