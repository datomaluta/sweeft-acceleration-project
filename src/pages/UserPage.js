import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScrollToTop from "../components/helpers/ScrollToTop";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import CardContent from "../components/shared/CardContent";
import BrowsingHistory from "../components/userPageComponents/browsingHistory/BrowsingHistory";
import DetailInfo from "../components/userPageComponents/detailInfo/DetailInfo";
import useGetFriends from "../hooks/useGetFriends";
import useGetUserData from "../hooks/useGetUserData";
import useObserver from "../hooks/useObserver";

const UserPage = () => {
  const { id } = useParams();
  const [friendsPageNumber, setFriendsPageNumber] = useState(1);

  useEffect(() => {
    setFriendsPageNumber(1);
  }, [id]);

  const {
    user,
    isLoading: userInfoIsLoading,
    error: userError,
    browsingHistoryList,
  } = useGetUserData(id);

  const {
    friends,
    isLoading: friendListIsLoading,
    hasMore: hasMoreFriend,
    error: friendError,
  } = useGetFriends(id, friendsPageNumber);

  const currentPageHandler = () => {
    setFriendsPageNumber((prevPage) => prevPage + 1);
  };

  const { lastElementRef: lastFriendRef } = useObserver(
    friendListIsLoading,
    hasMoreFriend,
    currentPageHandler
  );

  return (
    <>
      <ScrollToTop />
      <div className="max-w-[75rem] border-x border-gray-400 lg:border-none mx-auto py-4 px-3">
        {userError && <p>{userError}</p>}
        {userInfoIsLoading && <LoadingSpinner />}
        {user && <DetailInfo user={user} />}

        {browsingHistoryList.length > 0 && (
          <BrowsingHistory browsingHistory={browsingHistoryList} />
        )}

        <div className="mt-10">
          <p className="font-bold text-2xl">Friends:</p>
          {friendListIsLoading && !friendError && <LoadingSpinner />}
          {friendError && <p>{friendError}</p>}
          <div className="lg:gap-x-4 lg:grid grid grid-cols-4 lg:grid-cols-2 gap-y-4 gap-x-4 py-4 max-w-[76rem] mx-auto  ">
            {friends.length > 0 &&
              friends.map((user, index) => {
                return (
                  <Link
                    className="max-w-[17.375rem] lg:max-w-[27rem] lg:h-full lg:max-h-[24rem] h-[16.5rem] border border-gray-400 shadow-xl"
                    to={`/user/${user.id}`}
                    key={user.id}
                    ref={friends.length === index + 1 ? lastFriendRef : null}
                  >
                    <CardContent user={user} />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
