import React from "react"
import "./styles.css"


export default ({item}) => {
    console.log(item)
    const releaseYear = item.first_air_date.slice(0, 4);
    let genres = [];
    for(let i in item.genres) {
        genres.push( item.genres[i].name );
    }

    return (
        <div>
            <section className="featured" style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path}`
            }}>
                <div className="featured--vertical">
                    <div className="featured--horizontal">
                        <div className="featured--name">{item.original_name}</div>
                        <div className="featured--info">
                            <div className="featured--points">{item.vote_average} points</div>
                            <div className="featured--year">{releaseYear}</div>
                            <div className="featured--seasons">
                                {item.number_of_seasons} season{item.number_of_seasons !== 1 && 's'}
                            </div>
                            <div className="featured--description">{item.overview}</div>
                            <div className="featured--buttons">
                                <a className="featured--watchbutton" href={`/watch/${item.id}`}>► Watch</a>
                                <a className="featured--mylistbutton" href={`/list/add/${item.id}`}>+ My List</a>
                            </div>
                            <div className="featured--genres">
                                <strong>Genres:</strong> {genres.join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}