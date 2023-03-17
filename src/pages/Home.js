import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import useGetAllUserData from "../hooks/useGetAllUserData";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { users, isLoading, hasMore, error } = useGetAllUserData(currentPage);

  const observer = useRef();
  const lastUserRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  return (
    <div className="grid grid-cols-4 lg:grid-cols-2 gap-y-4 gap-x-4 py-4 max-w-[76rem] mx-auto px-2">
      {isLoading && !error && <LoadingSpinner />}
      {users.length > 0 &&
        users.map((user, index) => {
          return (
            <Link
              to={`/user/${user.id}`}
              key={user.id}
              ref={users.length === index + 1 ? lastUserRef : null}
              className="max-w-[17.375rem] w-full lg:max-w-full border border-gray-400 shadow-xl h-[17.5rem] lg:max-h-[24rem] lg:h-full "
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
