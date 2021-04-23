import React, { useEffect, useState } from 'react'
import axios from './axios';
import './Row.css'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")


   //A snippet of code which runs based on a specific condition

   useEffect(() => {
     //if [], run once when row loads, and don't run again
     //whenever we are using a third party service it may take while to get response from it so this is async 

     //Now there is a special way to write async function inside useEffect
     //await is use here for when you make nay request wait for promise to come back

     async function fetchData() {
      const request = await axios.get(fetchUrl);
      // this give us this url https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
      setMovies(request.data.results);
      return request;
     }
     fetchData();

   }, [fetchUrl])      //but here as everytime this variable movies changes this useEffect code will run

   const opts = {
       height: "390",
       width:"100%",
       playerVars: {
           autoplay:1,
       },
   }
   const handleClick = (movie) => {
      if(trailerUrl){
          setTrailerUrl("")
      }else{
          movieTrailer(movie?.name || "")
          .then((url) => {
             const urlParams = new URLSearchParams(new URL(url).search)
            setTrailerUrl(urlParams.get('v'));
          })
          .catch(err => console.log(err))
      }
   }
   
    return (
        <div className="row">
            <h1>{title}</h1>
             
            <div className="row_posters">

             {movies.map(movie => (
                 <img 
                 key={movie.id}
                 onClick={() => handleClick(movie)}
                 className={`row_poster ${isLargeRow && "row_posterLarger"}`}
                 src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                 alt={movie.name}/>
                
             ))}
            </div>
            <div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}></Youtube>}
            </div>
            
        </div>

    )
}

export default Row;
