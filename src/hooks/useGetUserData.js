import axios from "axios";
import { useEffect, useState } from "react";

const useGetUserData = (id) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [browsingHistory, setBrowsingHistory] = useState([]);

  useEffect(() => {
    setBrowsingHistory([]);
  }, []);

  useEffect(() => {
    const request = async () => {
      setIsLoading(true);
      setError(false);
      const response = await axios.get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      setUser(response.data);
      setBrowsingHistory((prevUsers) => {
        return [
          ...prevUsers,
          //   `${response.data.prefix} ${response.data.name} ${response.data.lastName}`,
          response.data,
        ];
      });
      setIsLoading(false);
    };
    request().catch(() => setError("Something went wrong!"));
  }, [id]);

  return { user, isLoading, error, browsingHistory };
};

export default useGetUserData;
