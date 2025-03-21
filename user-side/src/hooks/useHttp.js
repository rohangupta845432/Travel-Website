import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [httpError, setHttpError] = useState(null);
  // console.log("useHttp call");
  const fetchData = useCallback(
    async (url, { body, headers, method }, manageData) => {
      console.log("fetchData call");
      console.log(body);
      setHttpError(null);
      setIsLoding(true);
      try {
        const response = await fetch(url, {
          method: method ? method : "GET",
          body: body ? JSON.stringify(body) : null,
          headers: headers ? headers : {},
        });
        const data = await response.json();

        if (!response.ok) {
          console.log(response);
          throw new Error(data.error?.message || "Somthing Went error");
        }
        manageData(data);
        console.log(data);
      } catch (error) {
        setHttpError(error.message);
      } finally {
        setIsLoding(false);
      }
    },
    []
  );

  return { isLoding, httpError, fetchData };
};

export default useHttp;
