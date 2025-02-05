import './index.css'
import ReactDOM from "react-dom/client";
import {StrictMode} from 'react'
import {BrowserRouter, Routes, Route} from "react-router";

import MainLayout from "./Layouts/MainLayout/MainLayout.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Error404Page from "./Pages/Error404Page/Error404Page.jsx";

import AdminPrivateRoute from "./ProtectedRoutes/AdminPrivateRoute.jsx";
import UserPrivateRoute from "./ProtectedRoutes/UserPrivateRoute.jsx";
import PublicRoute from "./ProtectedRoutes/PublicRoute.jsx";

import AuthProvider from "./Providers/AuthProvider.jsx";
import RegistrationPage from "./Pages/AuthPages/RegistrationPage/RegistrationPage.jsx";
import SignInPage from "./Pages/AuthPages/SignInPage/SignInPage.jsx";

import ResetPasswordPage from "./Pages/AuthPages/ResetPasswordPage/ResetPasswordPage.jsx";
import AdminDashboardLayout from "./Layouts/AdminDashboardLayout/AdminDashboardLayout.jsx";
import AdminDashboardPage from "./Pages/AdminPages/AdminDashboardPage/AdminDashboardPage.jsx";
import AdminProfilePage from "./Pages/AdminPages/AdminProfilePage/AdminProfilePage.jsx";
import ManageUsersPage from "./Pages/AdminPages/ManageUsersPage/ManageUsersPage.jsx";

import ReportedCommentsPage from "./Pages/AdminPages/ReportedCommentsPage/ReportedCommentsPage.jsx";
import MakeAnnouncementsPage from "./Pages/AdminPages/MakeAnnouncementsPage/MakeAnnouncementsPage.jsx";
import UserDashboardPage from "./Pages/UserPages/UserDashboardPage/UserDashboardPage.jsx";
import UserProfilePage from "./Pages/UserPages/UserProfilePage/UserProfilePage.jsx";
import UpdateProfilePage from "./Pages/UserPages/UpdateProfilePage/UpdateProfilePage.jsx";
import UserDashboardLayout from "./Layouts/UserDashboardLayout/UserDashboardLayout.jsx";
import AddPostPage from "./Pages/UserPages/AddPostPage/AddPostPage.jsx";
import MyPostsPage from "./Pages/UserPages/MyPostsPage/MyPostsPage.jsx";
import UpdatePostPage from "./Pages/UserPages/UpdatePostPage/UpdatePostPage.jsx";

import ManageMembershipPage from "./Pages/UserPages/ManageMembershipPage/ManageMembershipPage.jsx";
import PostDetailsPage from "./Pages/UserPages/PostDetailsPage/PostDetailsPage.jsx";
import MyPostDetailsPage from "./Pages/UserPages/MyPostDetailsPage/MyPostDetailsPage.jsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import DataProvider from "./Providers/DataProvider.jsx";




const root = document.getElementById("root");

// Creating a Tanstack Query client
const queryClient = new QueryClient()

ReactDOM.createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <DataProvider>
                        <Routes>
                            <Route path={'/'} element={<MainLayout></MainLayout>}>
                                <Route path={'/'} element={<HomePage></HomePage>}></Route>

                                <Route path={'/registration'} element={<PublicRoute><RegistrationPage></RegistrationPage></PublicRoute>}></Route>
                                <Route path={'/sign-in'} element={<PublicRoute><SignInPage></SignInPage></PublicRoute>}></Route>
                                <Route path={'/reset-password'} element={<PublicRoute><ResetPasswordPage></ResetPasswordPage></PublicRoute>}></Route>

                                <Route path={'/post-details/:postId'} element={<PostDetailsPage></PostDetailsPage>}></Route>

                                <Route path={'/admin-dashboard'} element={<AdminPrivateRoute><AdminDashboardLayout></AdminDashboardLayout></AdminPrivateRoute>}>
                                    <Route path={'/admin-dashboard'} element={<AdminPrivateRoute><AdminDashboardPage></AdminDashboardPage></AdminPrivateRoute>}></Route>
                                    <Route path={'/admin-dashboard/admin-profile'} element={<AdminPrivateRoute><AdminProfilePage></AdminProfilePage></AdminPrivateRoute>}></Route>
                                    <Route path={'/admin-dashboard/admin-profile/update-profile'} element={<AdminPrivateRoute><UpdateProfilePage></UpdateProfilePage></AdminPrivateRoute>}></Route>

                                    <Route path={'/admin-dashboard/create-new-post'} element={<AdminPrivateRoute><AddPostPage></AddPostPage></AdminPrivateRoute>}></Route>
                                    <Route path={'/admin-dashboard/my-posts'} element={<AdminPrivateRoute><MyPostsPage></MyPostsPage></AdminPrivateRoute>}></Route>
                                    <Route path={'/admin-dashboard/my-posts/post-details/:postId'} element={<AdminPrivateRoute><MyPostDetailsPage></MyPostDetailsPage></AdminPrivateRoute>}></Route>
                                    <Route path={'/admin-dashboard/my-posts/update-post/:postId'} element={<AdminPrivateRoute><UpdatePostPage></UpdatePostPage></AdminPrivateRoute>}></Route>
                                    <Route path={'/admin-dashboard/manage-membership'} element={<AdminPrivateRoute><ManageMembershipPage></ManageMembershipPage></AdminPrivateRoute>}></Route>

                                    <Route path={'/admin-dashboard/manage-users'} element={<AdminPrivateRoute><ManageUsersPage></ManageUsersPage></AdminPrivateRoute>}></Route>
                                    <Route path={'/admin-dashboard/reported-comments'} element={<AdminPrivateRoute><ReportedCommentsPage></ReportedCommentsPage></AdminPrivateRoute>}></Route>
                                    <Route path={'/admin-dashboard/make-announcements'} element={<AdminPrivateRoute><MakeAnnouncementsPage></MakeAnnouncementsPage></AdminPrivateRoute>}></Route>
                                </Route>

                                <Route path={'/user-dashboard'} element={<UserPrivateRoute><UserDashboardLayout></UserDashboardLayout></UserPrivateRoute>}>
                                    <Route path={'/user-dashboard'} element={<UserPrivateRoute><UserDashboardPage></UserDashboardPage></UserPrivateRoute>}></Route>
                                    <Route path={'/user-dashboard/user-profile'} element={<UserPrivateRoute><UserProfilePage></UserProfilePage></UserPrivateRoute>}></Route>
                                    <Route path={'/user-dashboard/user-profile/update-profile'} element={<UserPrivateRoute><UpdateProfilePage></UpdateProfilePage></UserPrivateRoute>}></Route>

                                    <Route path={'/user-dashboard/create-new-post'} element={<UserPrivateRoute><AddPostPage></AddPostPage></UserPrivateRoute>}></Route>
                                    <Route path={'/user-dashboard/my-posts'} element={<UserPrivateRoute><MyPostsPage></MyPostsPage></UserPrivateRoute>}></Route>
                                    <Route path={'/user-dashboard/my-posts/post-details/:postId'} element={<UserPrivateRoute><MyPostDetailsPage></MyPostDetailsPage></UserPrivateRoute>}></Route>
                                    <Route path={'/user-dashboard/my-posts/update-post/:postId'} element={<UserPrivateRoute><UpdatePostPage></UpdatePostPage></UserPrivateRoute>}></Route>
                                    <Route path={'/user-dashboard/manage-membership'} element={<UserPrivateRoute><ManageMembershipPage></ManageMembershipPage></UserPrivateRoute>}></Route>
                                </Route>

                            </Route>
                            <Route path={'*'} element={<Error404Page></Error404Page>}></Route>
                        </Routes>
                    </DataProvider>
                </QueryClientProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
