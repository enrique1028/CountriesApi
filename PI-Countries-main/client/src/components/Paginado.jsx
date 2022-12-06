import React, { useState } from "react";
import "../Estilos/Paginado.css"






export default function Paginado ({countriesPerPage, allCountries, paginado, currentPage, setCurrentPage}){
    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
    

    const pageNumber = []

    const handlePrevious =()=>{
        setCurrentPage(currentPage - 1)
        if((currentPage-1)% pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit- pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit- pageNumberLimit)
        }
    }
    const handlePreviousPerLimit =()=>{
        setCurrentPage(currentPage - pageNumberLimit)
        setMaxPageNumberLimit(maxPageNumberLimit- pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit- pageNumberLimit)
            
    }
    
    const handleNext =()=>{
        setCurrentPage(currentPage + 1)
        if(currentPage+1> maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit+ pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit+ pageNumberLimit)
        }
    }
    const handleNextPerLimit =()=>{
        setCurrentPage(currentPage + pageNumberLimit)
        setMaxPageNumberLimit(maxPageNumberLimit+ pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit+ pageNumberLimit)
           
    }

    for (let i=0; i< Math.ceil(allCountries/countriesPerPage); i++){
        pageNumber.push(i+1)
        
    }
    
    return(
        <nav>
            <ul className="paginado">
                <li>
                    <button onClick={handlePreviousPerLimit}
                    disabled = {currentPage <= pageNumberLimit? true:false}
                    >
                    {'<<<'}</button>
                    <button onClick={handlePrevious}
                    disabled = {currentPage === pageNumber[0]? true:false}
                    >{'<'}</button>
                    
                    </li>
                    

                {
                    pageNumber?.map(num =>{
                        if(num< maxPageNumberLimit+1 && num> minPageNumberLimit){
                            return(
                            
                                <li key={num} onClick={()=> paginado(num)} className={currentPage===num? "active" : null}>
                                {num}
                                
                                </li>
                                )
                        }else {
                            return null
                        }
                        
                      })
                        }
                        
                <li>
                    <button onClick={handleNext}
                    disabled = {currentPage === pageNumber[pageNumber.length-1]? true:false}
                    >{'>'}</button>
                    <button onClick={handleNextPerLimit}
                    disabled = {currentPage >= (pageNumber.length + 1 -pageNumberLimit)? true:false}>
                    {'>>>'}</button>
                    
                    </li>
            
            </ul>
        </nav>

    )
}