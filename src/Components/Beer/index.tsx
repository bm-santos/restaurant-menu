import axios from 'axios';
import { useEffect, useState } from 'react';
import { BeersList } from '../../Types/BeersList';

const Beer = () => {

    const [beers, setBeers] = useState<BeersList[]>([])
    const [beerSection, showBeerSection] = useState<Boolean>()

    useEffect(() => {
        axios.get(`https://api.punkapi.com/v2/beers/?per_page=8`)
            .then(resposta => setBeers(resposta.data))
    }, [])

    const show = () => { showBeerSection(!beerSection) }

    return (
        <div className="food-beer-list food-shop">

            <h1>Tipos de Cerveja</h1>

            <button onClick={show}>Mostrar Cervejas</button>

            {beerSection && <>
                < div className="beers-list">
                    {beers.map((item: BeersList) => (
                        <div className="beer" key={item.id}>
                            <img src={item.image_url} alt={item.name} />
                            <h3>{item.name}</h3>
                            <span>{item.tagline}</span>
                            <small>{item.description}</small>
                        </div>
                    ))}
                </div>
            </>}
        </div >
    );
}

export default Beer;