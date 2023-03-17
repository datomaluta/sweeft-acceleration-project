import { useCallback, useRef, useState } from "react";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import useGetData from "../hooks/useGetData";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { users, isLoading, hasMore, error } = useGetData(currentPage);

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
    <div className="flex flex-wrap gap-8 justify-center py-4 px-60 	">
      {isLoading && !error && <LoadingSpinner />}
      {users.length > 0 &&
        users.map((user, index) => {
          return (
            <div
              ref={users.length === index + 1 ? lastUserRef : null}
              key={user.id}
              className="w-[17.375rem] h-[16.5rem] border border-gray-400 shadow-xl"
            >
              <div className="w-full">
                <img
                  className="w-full h-[13.125rem] object-cover"
                  src={user.imageUrl}
                  alt="avatar"
                />
              </div>
              <div className="px-2">
                <p className="font-bold">
                  {user.prefix} {user.name} {user.lastName}
                </p>
                <p>{user.title}</p>
              </div>
            </div>
          );
        })}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
