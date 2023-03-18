import axios from "axios";
import { useEffect, useState } from "react";

const useGetUserData = (id) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [browsingHistoryList, setBrowsingHistoryList] = useState([]);

  useEffect(() => {
    setBrowsingHistoryList([]);
  }, []);

  useEffect(() => {
    const request = async () => {
      setIsLoading(true);
      setError(false);
      const response = await axios.get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      setUser(response.data);
      setBrowsingHistoryList((prevUsers) => {
        return [...prevUsers, response.data];
      });
      setIsLoading(false);
    };
    request().catch(() =>
      setError("Something went wrong with user info fetching!")
    );
  }, [id]);

  return { user, isLoading, error, browsingHistoryList };
};

export default useGetUserData;
