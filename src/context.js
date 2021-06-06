import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json();
      //destructuring below. grab drinks property from data object
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass
          } = item;
          // return renamed property names to be less cumbersome
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass
          }
        })
        setCocktails(newCocktails)

      } else {
        // set empty array if cocktails are null
        setCocktails([])
      }
      setLoading(false)


    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])

  // useEffect will re-render and invoke fetchDrinks function anytime searchTerm changes
  useEffect(() => {
    fetchDrinks()
  }, [searchTerm, fetchDrinks])
  return <AppContext.Provider value={{
    loading,
    cocktails,
    setSearchTerm
  }}>
    {children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
