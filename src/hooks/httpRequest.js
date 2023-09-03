import { useState } from "react";

function useHttp(applyDataFnc) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
//   const [fetchedData, setFetchedData] =useState(null)

  const sendRequest = async (requestConfig,id=0) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method?requestConfig.method:'GET',
        headers: requestConfig.headers?requestConfig.headers:{},
        body:requestConfig.body?JSON.stringify(requestConfig.body):null
      });

     let responseData=await response.json();
    //  setFetchedData(responseData)
    console.log(responseData)
      if (response.status !== 200 || responseData == null) {
        throw new Error("something went wrong!");
      }
      requestConfig.body.id=responseData.name
      applyDataFnc(requestConfig.body)

    } catch (e) {
      setError(e.message);
    } finally{
        setIsLoading(false)
    }
  };

  return {error, isLoading, sendRequest};
}

export default useHttp;
