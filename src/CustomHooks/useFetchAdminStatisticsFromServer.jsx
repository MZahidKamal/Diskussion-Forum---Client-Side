import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure.jsx';

const UseFetchAdminStatisticsFromServer = (userId) => {

    const axiosSecure = useAxiosSecure();

    const { data, refetch } = useQuery({

        queryKey: ['adminStats', userId],

        queryFn: async () => {

            const response = await axiosSecure.get(
                `/posts/get_admin_stats`,
                {
                    headers: {
                        'user-id': String(userId),
                    }
                }
            );

            return response.data;

        },

        enabled: !!userId,  // Ensure the query is only enabled when both userId and postId are valid

    });

    return { data, refetch };
};

export default UseFetchAdminStatisticsFromServer;
