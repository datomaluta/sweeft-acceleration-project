import { useCallback, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScrollToTop from "../components/helpers/ScrollToTop";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import useGetFriends from "../hooks/useGetFriends";
import useGetUserData from "../hooks/useGetUserData";

const UserPage = () => {
  const { id } = useParams();
  const [friendsPageNumber, setFriendsPageNumber] = useState(1);
  const { user, isLoading, error, browsingHistory } = useGetUserData(id);
  const {
    friends,
    isLoading: friendListIsLoading,
    hasMore: hasMoreFriend,
    error: friendError,
  } = useGetFriends(id, friendsPageNumber);

  const observer = useRef();
  const lastFriendRef = useCallback(
    (node) => {
      if (friendListIsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreFriend) {
          setFriendsPageNumber((prevPage) => prevPage + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [friendListIsLoading, hasMoreFriend]
  );

  return (
    <>
      <ScrollToTop />
      <div className="max-w-[75rem] border-x border-gray-400 lg:border-none mx-auto py-4 px-3">
        {error && <p>{error}</p>}
        {isLoading && <LoadingSpinner />}
        {user && (
          <div className="flex items-center justify-between px-4 lg:flex-col lg:gap-4">
            <div className="w-full lg:h-80 sm:h-52 overflow-hidden max-w-[16.5rem] mr-4 lg:mr-0 flex-grow lg:max-w-full">
              <img
                className="w-full h-full object-fill"
                src={user.imageUrl}
                alt="mainphoto"
              />
            </div>
            <fieldset className="border border-black px-4 pb-2 w-full max-w-[41.875rem] lg:max-w-full">
              <legend className="px-1">Info</legend>
              <p className="font-bold">
                {user.prefix} {user.name} {user.lastName}
              </p>
              <p className="italic mb-6">{user.title}</p>
              <p>
                <span className="underline">Email:</span> {user.email}
              </p>
              <p>
                <span className="underline">Ip Address:</span> {user.ip}
              </p>
              <p>
                <span className="underline">Job Area:</span> {user.jobArea}
              </p>
              <p>
                <span className="underline">Job Type:</span> {user.jobType}
              </p>
            </fieldset>
            <fieldset className="border w-full border-black py-2 px-2 max-w-[12rem] ml-2 lg:ml-0 lg:max-w-full">
              <legend className="px-1">Address</legend>
              <p className="font-bold">
                {user.company.name + " " + user.company.suffix}
              </p>
              <p>
                <span className="underline mr-1">City:</span>
                {user.address.city}
              </p>
              <p>
                <span className="underline mr-1">Country:</span>
                {user.address.country}
              </p>
              <p>
                <span className="underline mr-1">State:</span>
                {user.address.state}
              </p>
              <p>
                <span className="underline mr-1">Street Address:</span>
                {user.address.streetAddress}
              </p>
              <p>
                <span className="underline mr-1">Zip: </span>
                {user.address.zipCode}
              </p>
            </fieldset>
          </div>
        )}
        {browsingHistory.length > 0 && (
          <div className="flex px-4 mt-6 flex-wrap">
            {browsingHistory.map((user, index) => (
              <div key={user.name + Math.random()}>
                <Link
                  to={`/user/${user.id}`}
                  className="text-purple-700 underline mx-2"
                >
                  {`${user.prefix} ${user.name} ${user.lastName}`}
                </Link>
                {index !== browsingHistory.length - 1 ? (
                  <span className="!no-underline">&gt;</span>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mt-10">
          <p className="font-bold text-2xl">Friends:</p>
          {friendListIsLoading && <LoadingSpinner />}
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
                    <div className="w-full">
                      <img
                        className="w-full  lg:max-h-[20rem] h-full object-cover"
                        src={user.imageUrl + "/" + user.id}
                        alt="avatar"
                      />
                    </div>
                    <div className="px-2">
                      <p className="font-bold">
                        {user.prefix} {user.name} {user.lastName}
                      </p>
                      <p>{user.title}</p>
                    </div>
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
