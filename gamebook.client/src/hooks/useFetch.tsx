import { useEffect, useState } from 'react';
import { ItemType, RoomType } from '../types';

/*
    Tento hook slouží k načtení dat z API.
    Vrací objekt s daty, načítáním a chybou.
    Slouží k zpřehlednění kódu a zamezení duplikace kódu.
*/


const useFetch = (url: string) => {
    const [data, setData] = useState<RoomType | ItemType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    
       useEffect(() => {
               const fetchData = async () => {
                   setLoading(true)
                   try{
                       const response = await fetch(url); 
                   if(!response.ok){
                       throw new Error("Nepodařilo se načíst místnosti")
                   }
                    const ResponseJson = await response.json();
                    setData(ResponseJson)
                   }
                   catch(error){
                       if(error instanceof Error){
                           setError(error)
                       }else{
                           setError(new Error("Něco se pokazilo"))
                       }
                   }finally{
                       setLoading(false)
                   }
               }
               fetchData();
           }, [url]);

    return { data, loading, error };
}

export default useFetch;
