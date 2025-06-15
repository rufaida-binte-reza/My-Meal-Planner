import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userStore from '../stores/UserStore';
import Breadcrumb from "../components/Breadcrumb";

const MealPlanAccountPage = () => {
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {

              if (!userStore.isLoggedIn) {
                  navigate('/signin');
              }

    fetchMealPlan();
  }, [navigate]);

  const fetchMealPlan = async () => {
    try {
      const token = userStore.token;
      const response = await axios.get('http://localhost:5000/api/meal_plan_with_totals', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMealPlan(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const handleDeleteMeal = async (day, mealType) => {
    try {
      const token = userStore.token;
      await axios.post(
        'http://localhost:5000/api/remove_from_plan',
        { day, meal_type: mealType.toLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchMealPlan();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const handleClearAllMeals = async () => {
    const confirmed = window.confirm("Are you sure you want to clear your entire meal plan?");
    if (!confirmed) return;

    try {
      const token = userStore.token;
      await axios.post(
        'http://127.0.0.1:5000/api/clear_meal_plan',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchMealPlan(); 
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
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


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">  <Breadcrumb/>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Weekly Meal Plan</h2>
          {Object.keys(mealPlan).length > 0 && (
            <button
              onClick={handleClearAllMeals}
              className="text-sm bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-4 py-2 rounded-md shadow"
            >
              Clear All
            </button>
          )}
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {Object.keys(mealPlan).length === 0 ? (
          <p className="text-gray-500">No meals in your plan.</p>
        ) : (
          Object.entries(mealPlan).map(([day, data]) => (
            <div key={day} className="mb-8 border-b pb-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{day}</h3>

              <div className="space-y-3">
                {Object.entries(data.meals).map(([mealType, meal]) => (
                  <div
                    key={meal.meal_id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 relative"
                  >
                    <p className="font-medium text-gray-800">
                      <span className="text-sm text-gray-500">{mealType}:</span>{' '}
                      {meal.meal_name}
                    </p>
                    <div className="text-sm text-gray-600 mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
                      <p>Calories: {meal.calories}</p>
                      <p>Protein: {meal.protein_g}g</p>
                      <p>Fat: {meal.fat_g}g</p>
                      <p>Carbs: {meal.carbs_g}g</p>
                    </div>

                    <button
                      onClick={() => handleDeleteMeal(day, mealType)}
                      className="absolute top-2 right-2 text-sm text-red-600 hover:text-red-800"
                    >
                      ✕ Delete
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-700 bg-blue-50 border border-blue-200 p-3 rounded-md">
                <p className="font-semibold">Daily Totals</p>
                <div className="grid grid-cols-2 gap-x-4 mt-1">
                  <p>Calories: {data.totals.calories}</p>
                  <p>Protein: {data.totals.protein_g}g</p>
                  <p>Fat: {data.totals.fat_g}g</p>
                  <p>Carbs: {data.totals.carbs_g}g</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MealPlanAccountPage;
