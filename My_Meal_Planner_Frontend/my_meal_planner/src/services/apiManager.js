import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', 
  withCredentials: true, 
});

const apiManager = {

  testDB: () => api.get('/api/test_db'),

  checkSession: () => api.get('/api/check_session'),

  signup: (data) => api.post('/api/signup', data),
  login: (data) => api.post('/api/login', data),
  logout: () => api.post('/api/logout'),

  searchByIngredient: (ingredient) =>
    api.post('/api/by_ingredient', { ingredient }),

  searchByPreference: (preference) =>
    api.post('/api/by_preference', { preference }),

  getMealDetail: (mealId) =>
    api.get(`/api/meal/${mealId}`),

  addToPlan: (mealId, data) =>
    api.post(`/api/add_to_plan/${mealId}`, data),

  getMealPlanWithTotals: () => api.get('/api/meal_plan_with_totals'),

  deletePlan: () => api.delete('/api/delete_plan'),
};

export default apiManager;
