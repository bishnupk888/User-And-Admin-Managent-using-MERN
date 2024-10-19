import react, { useEffect, useState } from 'react'
function useFetchData(url){
    const [data,setData] = useState('')
    useEffect(()=>{
        const datas = axios.get(url).
        setData(datas)
    },[])
    return data
}

export {useFetchData}
