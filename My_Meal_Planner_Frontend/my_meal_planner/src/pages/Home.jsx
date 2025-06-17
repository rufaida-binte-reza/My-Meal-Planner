import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import userStore from '../stores/UserStore';
import calories from "../assets/calories.png";




const Home = observer(() => {
        const navigate = useNavigate();
        const [meals, setMeals] = useState([]);
        const [loading, setLoading] = useState(true);
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

            fetchMeals();

  }, [navigate]);


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

return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <a aria-current="page" className="flex items-center" href="#">
                            <img className="h-20 w-auto" src="https://res.cloudinary.com/dsh8jzuhk/image/upload/v1749750296/20250612_2336_Meal_Planner_Logo_simple_compose_01jxjkbnbee1js8aask6kbzj4d_rwf7ra.png" alt=""/>
                            <p className="sr-only">My Meal Planner</p>
                        </a>
                    </div>
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                                <button onClick={() => navigate('/account')}>
                                    My Account
                                </button>
                        </a>

                        <a aria-current="page" className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                            <button onClick={() => navigate('/ingredients')}>
                                Ingredients
                            </button>
                        </a>

                        <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                                <button onClick={() => navigate('/preferences')}>
                                    Food Preferences
                                </button>
                        </a>
                    </div>
                    
                    <div className="flex items-center justify-end gap-3">
                        <a className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                            href="/signin" onClick={() => userStore.logout()} >Sign out</a>
                    </div>
                    
                </div>
            </div>
        </header>
    <div className="max-w-screen-xl mx-auto p-5 mt-30 sm:p-10 md:p-16">

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {meals.length > 0 ? (
                meals.map((meal) => (
                        <div key={meal.meal_id} className="rounded overflow-hidden shadow-lg flex flex-col">
                            <div className="relative">
                                <a href="#">
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
    </div>
    );
});

export default Home;
