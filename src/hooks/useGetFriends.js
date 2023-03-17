import axios from "axios";
import { useEffect, useState } from "react";

const useGetFriends = (id, friendsPageNumber) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setFriends([]);
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(false);
      const response = await axios.get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${friendsPageNumber}/14`
      );

      setFriends((prevUsers) => {
        return [...prevUsers, ...response.data.list];
      });
      setHasMore(response.data.list.length > 0);
      setIsLoading(false);
    };
    getData().catch(() => setError("Something went wrong"));
  }, [friendsPageNumber, id]);

  return { friends, isLoading, error, hasMore };
};

export default useGetFriends;
