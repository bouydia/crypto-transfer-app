import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_KEY

const useFetch = (keyword) => {
    const [gifUrl, setGifUrl] = useState('')
    
    async function fetchGifs() {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${keyword.split(" ").join('')}&api_key=${API_KEY}&limit=1`)
            const { data } = await response.json()
            console.log('Data', response)
            setGifUrl(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            setGifUrl(
              'https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284'
            )
        }
    } 
    
    useEffect(() => {
        if(keyword) fetchGifs()
    }, [keyword])
    
    return gifUrl
}

export default useFetch