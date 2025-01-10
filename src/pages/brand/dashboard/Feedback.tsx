import React from 'react';
    import { motion } from 'framer-motion';

    export default function Feedback() {
      const feedbackData = [
        {
          id: 'fb1',
          date: '2024-01-10',
          customer: 'John Doe',
          rating: 5,
          comment: 'Great product, fast shipping!'
        },
        {
          id: 'fb2',
          date: '2024-01-15',
          customer: 'Jane Smith',
          rating: 4,
          comment: 'Good quality, but the color was slightly different than expected.'
        },
        {
          id: 'fb3',
          date: '2024-01-20',
          customer: 'Mike Johnson',
          rating: 5,
          comment: 'Excellent customer service and product quality.'
        },
        {
          id: 'fb4',
          date: '2024-01-25',
          customer: 'Emily Brown',
          rating: 3,
          comment: 'The product arrived a bit late, but overall satisfied.'
        },
        {
          id: 'fb5',
          date: '2024-01-30',
          customer: 'David Lee',
          rating: 5,
          comment: 'Amazing product, highly recommended!'
        }
      ];

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-container mx-auto px-6 py-12 space-y-8"
        >
          <h1 className="text-2xl font-bold mb-6">Customer Feedback</h1>
          <p className="text-text-grey mb-8">
            View and respond to customer feedback and reviews.
          </p>

          <div className="bg-dark-grey/50 backdrop-blur-sm rounded-xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-grey">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Rating</th>
                  <th className="text-left p-4">Comment</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map(feedback => (
                  <tr key={feedback.id} className="border-b border-dark-grey hover:bg-dark-grey/20 transition-colors">
                    <td className="p-4">{feedback.date}</td>
                    <td className="p-4">{feedback.customer}</td>
                    <td className="p-4">{feedback.rating} / 5</td>
                    <td className="p-4">{feedback.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      );
    }
