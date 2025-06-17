import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import userStore from '../stores/UserStore';
import calories from "../assets/calories.png";
import Breadcrumb from "../components/Breadcrumb";


  const Ingredients = observer(() => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {

        if (!userStore.isLoggedIn) {
            navigate('/signin');
        }

            const fetchMeals = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/all_meals');
                console.log('API Response:', response.data); 
                
                const data = response.data;
                let mealsData = [];
                
                if (Array.isArray(data)) {
                mealsData = data;
                } else if (data && Array.isArray(data.meals)) {
                mealsData = data.meals;
                } else if (data) {
                mealsData = [data]; 
                }
                
                setMeals(mealsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
            };

            if(!isSearch)
            {
              fetchMeals();
            }

  }, [isSearch, navigate]);

    const fetchMealsByIngredient = async (ingredients) => {
          try {

            const response = await axios.post('http://127.0.0.1:5000/api/by_ingredient',
                                          {
                                            ingredients: ingredients  
                                          },
                                          {
                                            headers: {
                                              'Content-Type': 'application/json'
                                            }
                                          }
                                        );

              console.log('API Response:', response.data); 
              
              const data = response.data;
              let mealsData = [];
              
              if (Array.isArray(data)) {
              mealsData = data;
              } else if (data && Array.isArray(data.meals)) {
              mealsData = data.meals;
              } else if (data) {
              mealsData = [data]; 
              }
              
              setMeals(mealsData);
              setLoading(false);
              setIsSearch(true);
          } 
          catch (err) {
              setError(err.message);
              setLoading(false);
          }
    };

        const viewMealDetails = (id) => {
                                    navigate(`/mealDetails/${id}`);
                                    };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="loading absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                    </div>
                </div>
            </div>;
  }

  if (error) {
    return <div className="flex items-center h-screen p-16">
        <div className="container flex flex-col items-center">
            <div className="flex flex-col gap-6 max-w-md text-center">
                <h2 className="font-extrabold text-9xl text-gray-600">
                    <span className="sr-only">Error</span>404
                </h2>
                <p className="error text-2xl md:text-3xl">
                    {error}
                </p>
                <a href="/signin" className="px-8 py-4 text-xl font-semibold rounded bg-yellow-600 text-gray-50 hover:text-gray-200">
                    Back to home
                </a>
            </div>
        </div>
    </div>;
  }



  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', search);
    const array = search
                .split(",")            
                .map(item => item.trim()) 
                .filter(Boolean)       
                .reverse();  

    console.log('Searching for:', array);
    fetchMealsByIngredient(array);
    setIsSearch(true);
  };

  return (
    <div className="min-h-screen p-6 bg-white-50">
     <Breadcrumb/>
      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
      <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
        <input
        placeholder="e.g. egg, beef" 
        className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200" 
        type="text" 
        name="query" 
        id="query"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          <svg className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search
        </button>
      </div>
      </form>

      <h3 className="text-xl font-semibold mb-4">Recommended Meals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                      {meals.length > 0 ? (
                      meals.map((meal) => (
                              <div key={meal.meal_id} className="rounded overflow-hidden shadow-lg flex flex-col">
                                  <div className="relative"><a href="#">
                                        <img
                                        src={meal.image_url ?? "https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750179695/healthyMeal_pficsm.jpg"}
                                        className="w-[360px] h-[240px]"
                                        alt="No image available"
                                        />
                                          <div
                                              className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                          </div>
                                      </a>
                                  </div>
                                  <div className="px-6 py-4 mb-auto">
                                      <a onClick={() => viewMealDetails(meal.meal_id)}
                                          className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                                                          {meal && meal.meal_name}
                                      </a>
                                  </div>
                                  <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                                      <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                          <span className="ml-1"> {meal && meal.tags}</span>
                                      </span>
      
                                      <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                         <img src={calories} alt="" width="20" height="20"/>
                                          <span className="ml-1"> {meal && meal.calories} </span>
                                      </span>
                                  </div>
                              </div>
                      ))
                      ) : (
                          <div class="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                              <div class="text-9xl font-bold text-indigo-600 mb-4"></div>
                              <h1 class="text-4xl font-bold text-gray-800 mb-6">No meals available</h1>
                              <p class="text-lg text-gray-600 mb-8"></p>
                          </div>
                      )}
          </div>
    </div>
  );
});

export default Ingredients;
