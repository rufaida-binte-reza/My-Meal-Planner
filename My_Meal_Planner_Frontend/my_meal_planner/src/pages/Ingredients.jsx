import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import userStore from '../stores/UserStore';
import caloriesIcon from '../assets/calories.png';
import Breadcrumb from '../components/Breadcrumb';
import healthyMeal from '../assets/healthyMeal.jpg';

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
      return;
    }

    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/all_meals');
        const data = response.data;
        let mealsData = [];

        if (Array.isArray(data)) mealsData = data;
        else if (data?.meals && Array.isArray(data.meals)) mealsData = data.meals;
        else if (data) mealsData = [data];

        setMeals(mealsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (!isSearch) {
      fetchMeals();
    }
  }, [isSearch, navigate]);

  const fetchMealsByIngredient = async (ingredients) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/by_ingredient',
        { ingredients },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;
      let mealsData = [];

      if (Array.isArray(data)) mealsData = data;
      else if (data?.meals && Array.isArray(data.meals)) mealsData = data.meals;
      else if (data) mealsData = [data];

      setMeals(mealsData);
      setLoading(false);
      setIsSearch(true);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const ingredientsArray = search
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .reverse(); // for your logic

    fetchMealsByIngredient(ingredientsArray);
  };

  const viewMealDetails = (id) => {
    navigate(`/mealDetails/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
          <div className="loading absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center h-screen p-16">
        <div className="container flex flex-col items-center">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-gray-600">404</h2>
            <p className="text-2xl md:text-3xl">{error}</p>
            <a
              href="/signin"
              className="px-8 py-4 text-xl font-semibold rounded bg-yellow-600 text-gray-50 hover:text-gray-200"
            >
              Back to home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-white-50">
      <Breadcrumb />
      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
          <input
            placeholder="e.g. egg, beef"
            className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md focus:ring-teal-200 focus:border-teal-200"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-3 inline-flex items-center h-10 px-4 py-2 text-sm text-white bg-teal-600 rounded-full hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <svg
              className="w-4 h-4 mr-2 sm:w-5 sm:h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4">Recommended Meals</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.meal_id}
              className="rounded overflow-hidden shadow-lg flex flex-col"
            >
              <div className="relative">
                <img
                  className="w-full"
                  src={meal.image_url || healthyMeal}
                  alt={meal.meal_name}
                />
                <div className="absolute inset-0 bg-gray-900 opacity-25 hover:bg-transparent transition duration-300" />
              </div>
              <div className="px-6 py-4 mb-auto">
                <button
                  onClick={() => viewMealDetails(meal.meal_id)}
                  className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                >
                  {meal.meal_name}
                </button>
              </div>
              <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span className="text-xs font-regular text-gray-900 flex items-center">
                  {meal.tags}
                </span>
                <span className="text-xs font-regular text-gray-900 flex items-center">
                  <img src={caloriesIcon} alt="Calories" width="20" height="20" />
                  <span className="ml-1">{meal.calories}</span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              No meals available
            </h1>
          </div>
        )}
      </div>
    </div>
  );
});

export default Ingredients;
