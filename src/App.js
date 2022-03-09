import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow/";
import FeaturedMovie from "./components/FeaturedMovie/";
import Header from "./components/Header/";

export default () => {

  const [headerBlack, setHeaderBlack] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setHeaderBlack(true);
      } else {
        setHeaderBlack(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">
      <Header black={headerBlack}/>

      <div className="featured">
        {featuredData && 
          <FeaturedMovie item={featuredData}/>
        }
      </div>

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com ReactJS por Victor William Hostert <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site TheMovieDB <br/>
        Baseado no vídeo <span><a href="https://www.youtube.com/watch?v=tBweoUiMsDg">🔥 Clone do NETFLIX em REACTJS para Iniciantes</a></span>
      </footer>
        
      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://www.rchandru.com/images/portfolio/loading.gif" alt="Loading" />
        </div>
      }
      
    </div>
  )
}