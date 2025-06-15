import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from "../components/Breadcrumb";
import userStore from '../stores/UserStore';


const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

const AddToMealPlan = observer(() => {

const [selectedDay, setSelectedDay] = useState('');
const [mealType, setMealType] = useState('');
const { id } = useParams();
const [error, setError] = useState(null);
const navigate = useNavigate();
const [loading, setLoading] = useState(true);


    useEffect(() => {

                    if (!userStore.isLoggedIn) {
                        navigate('/signin');
                    }
                    else
                    {
                        setLoading(false);
                    }
    }, [navigate]);

const handleAddToPlan = async (e) => {

    e.preventDefault();
    if (!selectedDay || !mealType) return;

    await addToMealPlan(id);

    setSelectedDay('');
    setMealType('');
    navigate('/')
    };

const addToMealPlan = async (id) => {
    try {
    const token = userStore.token;

    const response = await axios.post(
      `http://127.0.0.1:5000/api/add_to_plan/${id}`,
      {
        day: selectedDay,
        meal_type: mealType
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    console.log('API Response:', response.data);
  } catch (err) {
    console.error('Error adding to meal plan:', err);
    setError(err.response?.data?.message || err.message);
  }
};


  if (error) {
    return <div class="flex items-center h-screen p-16">
        <div class="container flex flex-col items-center">
            <div class="flex flex-col gap-6 max-w-md text-center">
                <h2 class="font-extrabold text-9xl text-gray-600">
                    <span class="sr-only">Error</span>404
                </h2>
                <p class="error text-2xl md:text-3xl">
                    {error}
                </p>
                <a href="/signin" class="px-8 py-4 text-xl font-semibold rounded bg-yellow-600 text-gray-50 hover:text-gray-200">
                    Back to home
                </a>
            </div>
        </div>
    </div>;
  }

    if (loading) {
    return <div className="flex items-center justify-center h-screen">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="loading absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                    </div>
                </div>
            </div>;
  }

  return (
    <>
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
            <Breadcrumb/>
        <div className="flex items-center justify-center py-25 px-4"> 
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200">
            <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Add Meal to Plan</h2>
            <p className="text-sm text-gray-500 mt-1">Select the day and meal type below</p>
            </div>

            <form onSubmit={handleAddToPlan} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Choose Day</label>
                <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                >
                <option value="">-- Select Day --</option>
                {days.map((d) => (
                    <option key={d} value={d}>
                    {d}
                    </option>
                ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Choose Meal Type</label>
                <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                >
                <option value="">-- Select Meal Type --</option>
                {mealTypes.map((t) => (
                    <option key={t} value={t}>
                    {t}
                    </option>
                ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
                Save to Plan
            </button>
            </form>
        </div>
        </div>
    </div>

    </>
  );
});

export default AddToMealPlan;
