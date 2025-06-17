import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import userStore from '../stores/UserStore';
import calories from "../assets/calories.png";
import Breadcrumb from "../components/Breadcrumb";
import healthyMeal from "../assets/healthyMeal.jpg";

const FoodPreferences = observer(() => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
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

        const mealsData = Array.isArray(data)
          ? data
          : Array.isArray(data?.meals)
          ? data.meals
          : data
          ? [data]
          : [];

        setMeals(mealsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMeals();
  }, [navigate]);

  const fetchMealsByPreference = async (selectedValue) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/by_preference',
        { preference: selectedValue },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;
      const mealsData = Array.isArray(data)
        ? data
        : Array.isArray(data?.meals)
        ? data.meals
        : data
        ? [data]
        : [];

      setMeals(mealsData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const viewMealDetails = (id) => {
    navigate(`/mealDetails/${id}`);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    fetchMealsByPreference(selectedValue);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="loading absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
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
            <p className="error text-2xl md:text-3xl">{error}</p>
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 w-full max-w-xl mx-auto bg-white p-4 rounded-xl shadow-md border">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
          Choose your meal preference
        </h3>

        <select
          onChange={handleChange}
          className="w-full sm:w-auto p-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="">Select</option>
          <option value="high_protein">High Protein</option>
          <option value="low_carb">Low Carb</option>
          <option value="vegetarian">Vegetarian</option>
        </select>
      </div>

      <h3 className="text-xl font-semibold mb-4">Recommended Meals</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.meal_id} className="rounded overflow-hidden shadow-lg flex flex-col">
              <div className="relative">
                <img
                  className="w-full"
                  src={meal.image_url || healthyMeal}
                  alt={meal.meal_name}
                />
                <div className="absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25 hover:bg-transparent transition duration-300"></div>
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
                <span className="py-1 text-xs font-regular text-gray-900 flex items-center">
                  <span className="ml-1">{meal.tags}</span>
                </span>
                <span className="py-1 text-xs font-regular text-gray-900 flex items-center">
                  <img src={calories} alt="calories" width="20" height="20" />
                  <span className="ml-1">{meal.calories}</span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">No meals available</h1>
          </div>
        )}
      </div>
    </div>
  );
});

export default FoodPreferences;
