import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong, failed to send request");
  }
  return resData;
}

function useHttp(url, config) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  function clearData() {
    setData();
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: JSON.stringify(data) });
        setData(resData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if (config && config.method === "GET") sendRequest();
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest, clearData };
}

export default useHttp;
