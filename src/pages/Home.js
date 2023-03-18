import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import CardContent from "../components/shared/CardContent";
import useGetAllUserData from "../hooks/useGetAllUserData";
import useObserver from "../hooks/useObserver";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { users, isLoading, hasMore, error } = useGetAllUserData(currentPage);

  const currentPageHandler = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const { lastElementRef: lastUserRef } = useObserver(
    isLoading,
    hasMore,
    currentPageHandler
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
              <CardContent user={user} />
            </Link>
          );
        })}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
