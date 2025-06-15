import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Ingredients from './pages/Ingredients';
import FoodPreferences from './pages/FoodPreferences';
import MealDetails from './pages/MealDetails';
import MyAccount from './pages/MyAccount';
import PageNotFound from './pages/PageNotFound';
import AddToMealPlan from './pages/AddToMealPlan';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/preferences" element={<FoodPreferences />} />
      <Route path="/mealDetails/:id" element={<MealDetails />} />
      <Route path="/addToMealPlan/:id" element={<AddToMealPlan />} />
      <Route path="/account" element={<MyAccount />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;

