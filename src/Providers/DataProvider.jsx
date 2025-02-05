import PropTypes from "prop-types";
import {useContext, useEffect, useState} from "react";
import DataContext from "./DataContext.jsx";
import AuthContext from "./AuthContext.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import useAxiosSecure from "../CustomHooks/useAxiosSecure.jsx";
import useAxiosPublic from "../CustomHooks/useAxiosPublic.jsx";


const DataProvider = ({children}) => {


    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [unreadAnnouncements, setUnreadAnnouncements] = useState(null)


    const {data: allCategories, refetch: refetchCategories} = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/categories/get_all_categories`);
            // console.log(response?.data)
            return response.data;
        }
    })


    const {mutateAsync: saveCategoriesToServer} = useMutation({
        mutationFn: async (categoriesArray) => {
            try {
                const response = await axiosSecure.post(
                    `/categories/create_new_categories`,
                    {email: user?.email, categoriesArray: categoriesArray},
                )
                // console.log(response?.data);
                toast.success(`${response?.data?.insertedCount} Categories added successfully!`);
            } catch (error) {
                toast.error(`Failed to add categories. Error: ${error.code}: ${error.message}`);
            } finally {
                await refetchCategories()
            }
        }
    })


    const {data: allTags, refetch: refetchTags} = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/tags/get_all_tags`);
            // console.log(response?.data)
            return response.data;
        }
    })


    const {mutateAsync: saveTagsToServer} = useMutation({
        mutationFn: async (tagsArray) => {
            try {
                const response = await axiosSecure.post(
                    `/tags/create_new_tags`,
                    {email: user?.email, tagsArray: tagsArray},
                )
                // console.log(response?.data);
                toast.success(`${response?.data?.insertedCount} Tags added successfully!`);
            } catch (error) {
                toast.error(`Failed to add tags. Error: ${error.code}: ${error.message}`);
            } finally {
                await refetchTags()
            }
        }
    })


    const {data: allPosts, refetch: refetchPosts} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/posts/get_all_posts`);
            // console.log(response?.data)
            return response.data;
        }
    })


    const {mutateAsync: saveNewPostToServer} = useMutation({
        mutationFn: async (newPostObj) => {
            try {
                const response = await axiosSecure.post(
                    `/posts/add_new_post`,
                    {userEmail: user?.email, newPostObj: newPostObj},
                )
                // console.log(response?.data);
                if (response?.data?.insertedId){
                    toast.success(`Post added successfully!`);
                }
            } catch (error) {
                toast.error(`Failed to add post. Error: ${error.code}: ${error.message}`);
            } finally {
                await refetchPosts()
            }
        }
    })


    const {data: singlePost, mutateAsync: fetchSinglePostFromServer} = useMutation({
        mutationFn: async (postId) => {
            try {
                const response = await axiosPublic.post(
                    `/posts/get_a_post_by_id`,
                    {userId: user?._id, postId: postId}
                );
                // console.log(response?.data)
                return response?.data;
            } catch (error) {
                toast.error(`Failed to fetch post. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            }
        },
    });


    const {data: allMyPosts, mutateAsync: fetchAllMyPostsFromServer} = useMutation({
        mutationFn: async ({userId, userEmail}) => {
            try {
                const response = await axiosSecure.post(
                    `/posts/get_all_my_posts`,
                    {userId: userId, userEmail: userEmail},
                );
                // console.log(response?.data)
                return response?.data;
            } catch (error) {
                toast.error(`Failed to fetch my posts. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            }
        },
    });


    const {mutateAsync: saveUpdatedCommentToServer} = useMutation({
        mutationFn: async (updatedCommentObj) => {
            try {
                const response = await axiosSecure.patch(
                    `/comments/update_a_comments`,
                    {userEmail: user?.email, updatedCommentObj: updatedCommentObj},
                );
                // console.log(response?.data)
                if (response?.status === 200) toast.success('Report submitted successfully!');
            } catch (error) {
                toast.error(`Failed to submit report. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            }
        },
    });


    const {mutateAsync: saveUpdatedPostToServer} = useMutation({
        mutationFn: async (updatedPostObj) => {
            try {
                const response = await axiosSecure.patch(
                    `/posts/update_a_post`,
                    {userEmail: user?.email, updatedPostObj: updatedPostObj},
                );
                // console.log(response)
                if (response?.data?.modifiedCount > 0) toast.success('Post updated successfully!');
            } catch (error) {
                toast.error(`Failed to update post. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            }
        },
    });


    const {mutateAsync: deleteOneOfMyPostFromServer} = useMutation({
        mutationFn: async (postId) => {
            try {
                const response = await axiosSecure.post(                        //axios.delete method takes only url and config, not the data, therefore using post method.
                    `/posts/delete_one_of_my_post`,
                    {userEmail: user?.email, postId: postId},
                );
                // console.log(response)
                if (response?.status === 200) toast.success('Post deleted successfully!');
            } catch (error) {
                toast.error(`Failed to delete post. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            }
        },
    });


    const {data: allUsersRollSorted, mutateAsync: fetchAllUsersFromServerRollSorted} = useMutation({
        mutationFn: async (userEmail) => {
            try {
                const response = await axiosSecure.post(
                    `/users/get_all_users_roll_sorted`,
                    {userEmail},
                );
                // console.log(response)
                return response?.data;
            } catch (error) {
                toast.error(`Failed to fetch roll sorted users. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            }
        },
    });


    const {mutateAsync: saveUpdatedUserRoleToServer} = useMutation({
        mutationFn: async ({userId, updatedUserRole}) => {
            try {
                const response = await axiosSecure.patch(
                    `/users/change_user_role`,
                    {adminEmail: user?.email, userId: userId, updatedUserRole: updatedUserRole},
                );
                // console.log(response)
                if (response?.data?.modifiedCount > 0) toast.success('User role updated successfully!');
            } catch (error) {
                toast.error(`Failed to update user role. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            }
        },
    });


    const {data: allAnnouncements, refetch: refetchAllAnnouncements} = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/announcements/get_all_announcements`);
            // console.log(response?.data)
            return response.data;
        }
    })


    const {mutateAsync: saveNewAnnouncementToServer} = useMutation({
        mutationFn: async (newAnnouncementObj) => {
            try {
                const response = await axiosSecure.post(
                    `/announcements/add_new_announcement`,
                    {userEmail: user?.email, newAnnouncementObj: newAnnouncementObj},
                )
                // console.log(response?.data);
                if (response?.data?.insertedId){
                    toast.success(`Announcement added successfully!`);
                }
            } catch (error) {
                toast.error(`Failed to add announcement. Error: ${error.code}: ${error.message}`);
            } finally {
                await refetchAllAnnouncements()
            }
        }
    })


    const {mutateAsync: makeThisAnnouncementReadByThisUser} = useMutation({
        mutationFn: async (announcementId) => {
            try {
                const response = await axiosSecure.patch(
                    `/announcements/make_an_announcement_read`,
                    {userEmail: user?.email, userId: user?._id, announcementId: announcementId},
                );
                // console.log(response)
                if (response?.data?.modifiedCount > 0) toast.success('Announcement marked as read!');
            } catch (error) {
                toast.error(`Failed to update user role. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            } finally {
                await refetchAllAnnouncements()
            }
        },
    });


    useEffect(() => {
        if (allAnnouncements?.length === 0) return;
        const unreadAnnouncements = allAnnouncements?.filter(announcement => !announcement?.viewedByUserIds.includes(user?._id));
        setUnreadAnnouncements(unreadAnnouncements);
    }, [allAnnouncements, user]);


    const {data: allReportedComments, mutateAsync: fetchAllReportedComments} = useMutation({
        mutationFn: async () => {
            try {
                const response = await axiosSecure.post(
                    `/comments/get_all_reported_comments`,
                    {userEmail: user?.email},
                );
                // console.log(response)
                return response?.data;
            } catch (error) {
                toast.error(`Failed to fetch all reported comments. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            }
        },
    });


    const {mutateAsync: saveUpdatedCommentReportActionToServer} = useMutation({
        mutationFn: async ({commentId, updatedReportAction}) => {
            try {
                const response = await axiosSecure.patch(
                    `/comments/update_report_action`,
                    {adminEmail: user?.email, commentId: commentId, updatedReportAction: updatedReportAction},
                );
                // console.log(response)
                if (response?.data?.modifiedCount > 0) toast.success('Report action updated successfully!');
            } catch (error) {
                toast.error(`Failed to update report action. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            }
        },
    });


    const {mutateAsync: saveNewCommentToServer} = useMutation({
        mutationFn: async ({postId, newCommentObj}) => {
            try {
                const response = await axiosSecure.post(
                    `/comments/add_new_comment`,
                    {userEmail: user?.email, postId: postId, newCommentObj: newCommentObj},
                )
                // console.log(response?.data);
                if (response?.data?.insertedId){
                    toast.success(`Comment added successfully!`);
                }
            } catch (error) {
                toast.error(`Failed to add comment. Error: ${error.code}: ${error.message}`);
            } finally {
                await fetchSinglePostFromServer(postId)
            }
        }
    })


    const {mutateAsync: saveAVoteOfAPostToServer} = useMutation({
        mutationFn: async ({postId, vote}) => {
            //console.log(postId, vote)
            try {
                const response = await axiosSecure.patch(
                    `/posts/vote_a_post`,
                    {
                        userEmail: user?.email,
                        userId: user?._id,
                        postId: postId,
                        vote: vote
                    },
                );
                // console.log(response)
                if (response?.status === 200) toast.success('Vote counted successfully!');
            } catch (error) {
                toast.error(`Failed to count vote. Error: ${error.code}: ${error.message}`);
                throw error; // Ensure the error is propagated
            } finally {
                await fetchSinglePostFromServer(postId);
            }
        },
    });


    const dataInfo = {
        allCategories,
        saveCategoriesToServer,
        allTags,
        saveTagsToServer,
        allPosts,
        saveNewPostToServer,
        fetchSinglePostFromServer,
        singlePost,
        fetchAllMyPostsFromServer,
        allMyPosts,
        saveUpdatedCommentToServer,
        saveUpdatedPostToServer,
        deleteOneOfMyPostFromServer,
        fetchAllUsersFromServerRollSorted,
        allUsersRollSorted,
        saveUpdatedUserRoleToServer,
        saveNewAnnouncementToServer,
        allAnnouncements,
        unreadAnnouncements,
        makeThisAnnouncementReadByThisUser,
        fetchAllReportedComments,
        allReportedComments,
        saveUpdatedCommentReportActionToServer,
        saveNewCommentToServer,
        saveAVoteOfAPostToServer
    };


    return (
        <div>
            <DataContext.Provider value={dataInfo}>
                {children}
            </DataContext.Provider>
        </div>
    );
};


DataProvider.propTypes = {
    children: PropTypes.node,
}

export default DataProvider;
