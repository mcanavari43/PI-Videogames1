import React from "react";
import "./Paginado.css";
export default function Pagination({ gamesPerPage, allGames, pageNow }) {
  //Declaro paginado y me traigo las props del otro componente
  const pageNumbers = []; //declaro array vacio

  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    //recorro un arreglo que voy a tomar el numero redondo que resulta de dividir todos los juegos por la pagina
    pageNumbers.push(i); //Con el numero que se genera lo pusheo a mi pageNumbers,
  }

  return (
    //renderizo, cuando tengo este arreglo mapealo y traeme cada numero que devuelve el paginado
    <nav>
      <ul className="paginado">
        {pageNumbers?.map((number) => (
          <li className="li" key={number}>
            <button className="button" onClick={() => pageNow(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
