import {useState,useEffect} from "react";
type useFetchJsonReturn<T> ={
  data : T | null;
  loading : boolean;
  error: Error | null;
};

const useFetchJson = <T= any>(url:string):useFetchJsonReturn<T> => {
    const [data,setdata] = useState<T | null>(null);  // store the actual data...
    const [loading,setloading] = useState<boolean>(true); // tells us whether we are still fetching or not...
    const [error,seterror] = useState<Error | null>(null); // stores any error message....


    // actual data fetching code....
     
    useEffect(() => {   // here useeffect ensures we fetch new data for a different url is passed...
      const fetchData = async () => {
        try{
            const res = await fetch(url); // wait for the data until fetch fetches data     and returns a  promise and here res is a response...
            if(!res.ok) throw new Error('Failed to fetch JSON ');
            const json = await res.json();  // await is used because res.json also sends a promise
            setdata(json);

        }
        catch(err){
            seterror(err as Error);
             
        }
        finally{
            setloading(false);
            
        }
      };
      fetchData();

    }, [url]);

    return {data,error,loading};

};

export default useFetchJson;