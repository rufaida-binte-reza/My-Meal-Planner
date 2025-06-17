import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import userStore from '../stores/UserStore';
import Breadcrumb from "../components/Breadcrumb";


  const MealDetails = observer(() => {
  const navigate = useNavigate();
  const [meal, setMeal] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();


      useEffect(() => {

          if (!userStore.isLoggedIn) {
              navigate('/signin');
          }

          const fetchMeals = async () => {
          try {
              const response = await axios.get('http://127.0.0.1:5000/api/meal/' + id);
              console.log('API Response:', response.data); 
              
              const data = response.data;
              
              setMeal(data);
              setLoading(false);
          } catch (err) {
              setError(err.message);
              setLoading(false);
          }
          };

          fetchMeals();

      }, [id, navigate]);

      const addToMealPlan = (id) => 
        {
           navigate(`/addToMealPlan/${id}`);
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
    <div className="min-h-screen p-6 bg-white-50">  <Breadcrumb/>

        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-wrap -mx-4">
                
                <div className="w-full md:w-1/2 px-4 mb-8">
                  <img 
                   src={meal.image_url ?? "https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750179695/healthyMeal_pficsm.jpg"}
                   alt="No image available"
                  className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage"/>
                </div>

                <div className="w-full md:w-1/2 px-4">
                  <h2 className="text-3xl font-bold mb-2">{meal && meal.name}</h2>
                  <p className="text-gray-600 mb-4"></p>
                  <div className="mb-4">
                    <span className="text-2xl font-bold mr-2"></span>
                    <span className="text-gray-500 line-through"></span>
                  </div>
                  <div className="flex items-center mb-4">
                  </div>


                          <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Ingredients:</h4>
                    <ul>
                      {meal.ingredients.map((item, index) => (
                        <li key={index}>
                          {item.quantity} {item.unit} of {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Details:</h3>
                    <div>
                      <p className="block text-sm font-medium text-gray-700 mb-1"> Calories: {meal && meal.calories} </p>
                      <p className="block text-sm font-medium text-gray-700 mb-1"> Carbs: {meal && meal.carbs} </p>
                      <p className="block text-sm font-medium text-gray-700 mb-1"> Fat: {meal && meal.fat} </p>
                      <p className="block text-sm font-medium text-gray-700 mb-1"> Protein: {meal && meal.protein} </p>
                    </div>
                  </div>




                  <div className="flex space-x-4 mb-6">
                    <button onClick={() => addToMealPlan(id)}
                                  className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                  Add to Meal plan
                    </button>
                  </div>

                  <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                      <div>
                        <p className="block text-sm font-medium text-gray-700 mb-1"> {meal && meal.tags} </p>
                      </div>
                  </div>

                </div>
              </div>
            </div>
        </div>
    </div>
  );
});

export default MealDetails;
