import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "./useAxiosPublic.jsx";

const useFetchAllFilteredPostsFromServer = (selectedTag, selectedCategory, postsPerPage, currentPage) => {

    // console.log(selectedTag, selectedCategory, postsPerPage, currentPage);

    const axiosPublic = useAxiosPublic();

    const { data, refetch } = useQuery({

        queryKey: ['allFilteredPosts', postsPerPage, currentPage],

        queryFn: async () => {

            const response = await axiosPublic.get(
                `/posts/get_all_filtered_posts`,
                {
                    headers: {
                        'selected_tag': selectedTag,
                        'selected_category': selectedCategory,
                        'posts_per_page': postsPerPage,
                        'current_page': currentPage,
                    }
                }
            );

            // console.log(`Response from server:`, response?.data)
            return response.data;

        },

        enabled: !!postsPerPage && !!currentPage,  // Ensure the query is only enabled when both userId and postId are valid

    });

    return { data, refetch };
};

export default useFetchAllFilteredPostsFromServer;
