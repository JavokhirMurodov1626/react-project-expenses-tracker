import { useState } from "react";

function useHttp(requestConfig,applyDataFnc) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
//   const [fetchedData, setFetchedData] =useState(null)

  const sendRequest = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method?requestConfig.method:'GET',
        headers: requestConfig.headers?requestConfig.headers:{},
        body:JSON.stringify(data)
      });

     let responseData=await response.json();
    //  setFetchedData(responseData)

      if (response.status !== 200 || responseData == null) {
        throw new Error("something went wrong!");
      }
      data.id=responseData.name
      applyDataFnc(data)

    } catch (e) {
      setError(e.message);
    } finally{
        setIsLoading(false)
    }
  };

  return {error, isLoading, sendRequest};
}

export default useHttp;
