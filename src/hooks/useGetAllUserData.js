import { useEffect, useState } from "react";
import axios from "axios";

const useGetAllUserData = (pageNumber) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrror] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setErrror(false);
      const response = await axios.get(
        `/elasticbeanstalk/user/${pageNumber}/24`
      );

      setUsers((prevUsers) => {
        return [...prevUsers, ...response.data.list];
      });
      setHasMore(response.data.list.length > 0);
      setIsLoading(false);
    };
    getData().catch(() => setErrror("Something went wrong"));
  }, [pageNumber]);

  return { users, isLoading, error, hasMore };
};

export default useGetAllUserData;
