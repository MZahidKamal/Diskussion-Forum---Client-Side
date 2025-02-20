import Banner from "../../Components/Banner/Banner.jsx";
import PostsByTags from "../../Components/PostsByTags/PostsByTags.jsx";
import PostsByCategories from "../../Components/PostsByCategories/PostsByCategories.jsx";
import LatestAnnouncements from "../../Components/LatestAnnouncements/LatestAnnouncements.jsx";
import NewsletterSubscription from "../../Components/NewsletterSubscription/NewsletterSubscription.jsx";
import {useEffect} from "react";
import Benefits from "../../Components/Benefits/Benefits.jsx";


const HomePage = () => {


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <Banner></Banner>

            <LatestAnnouncements></LatestAnnouncements>

            <div className="">
                <div className="container mx-auto py-10 flex flex-col lg:flex-row gap-2">
                    <div className="w-full lg:w-3/4">
                        <PostsByTags/>
                    </div>
                    <div className="w-full lg:w-1/4">
                        <PostsByCategories/>
                    </div>
                </div>
            </div>

            <Benefits></Benefits>

            <NewsletterSubscription></NewsletterSubscription>
        </>
    );
};

export default HomePage;
