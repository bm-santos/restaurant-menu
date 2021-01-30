/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Comidas } from '../../Types/FoodList';

const Foods = () => {
    const [categorias, setCategorias] = useState<String[]>([])
    const [categoria, setCategoria] = useState<String>()
    const [comidas, setComidas] = useState<Comidas[]>([])
    const [textoDigitado, setTextoDigitado] = useState<String>()


    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            .then(resposta => setCategorias(resposta.data.categories))
    }, [])

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
            .then(resposta => setComidas(resposta.data.meals))
    }, [categoria])

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${textoDigitado}`)
            .then(resposta => setComidas(resposta.data.meals))
    }, [textoDigitado])


    return (
        <div className="food-beer-list food-shop">
            <h1>Tipos de pratos</h1>
            <p>
                Selecione uma categoria ou digite a comida (em inglês):
                <input type="text" placeholder="Digite a comida..." onChange={(event) => setTextoDigitado(event.target.value)} />
            </p>

            <ul>
                {categorias.map((item: any) => (
                    <li key={item.id} onClick={() => setCategoria(item.strCategory)}>{item.strCategory}</li>
                ))}
            </ul>

            {((categoria === undefined) && (comidas !== null)) && (
                <h2>{comidas.length} pratos encontrados</h2>
            )}

            {((categoria !== undefined) && (comidas !== null)) && (
                <>
                    <h2>Tipo selecionado: <strong>{categoria} </strong></h2>
                    <h2>{comidas.length} pratos encontrados</h2></>
            )
            }
            <div className="food-container">
                {comidas !== null && (
                    comidas.map((item: Comidas) => (

                        <div className="food-item" key={item.idMeal}>
                            <img src={item.strMealThumb} />
                            <p>{item.strMeal}</p>
                        </div>
                    ))
                )
                }
            </div>
        </div >
    );
}

export default Foods;