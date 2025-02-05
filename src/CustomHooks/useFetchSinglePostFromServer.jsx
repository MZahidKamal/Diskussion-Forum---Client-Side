import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure.jsx';

const UseFetchSinglePostFromServer = (userId, postId) => {

    const axiosSecure = useAxiosSecure();

    const { data, refetch } = useQuery({

        queryKey: ['singlePost', userId, postId],

        queryFn: async () => {

            const response = await axiosSecure.get(
                `/posts/get_a_post_by_id`,
                {
                    headers: {
                        'user-id': String(userId),   // As userId is not a string, so it's necessary to make it a string.
                        'post-id': String(postId)    // As postId is not a string, so it's necessary to make it a string.
                    }
                }
            );

            return response.data;

        },

        enabled: !!postId,  // Ensure the query is only enabled when both userId and postId are valid

    });

    return { data, refetch };
};

export default UseFetchSinglePostFromServer;
