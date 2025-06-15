// src/stores/MealStore.js
import { makeAutoObservable, runInAction } from 'mobx';
import api from '../api/apiManager';

class MealStore {
  meals = [];
  selectedMeal = null;
  loading = false;
  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  async searchByIngredient(ingredient) {
    try {
      this.loading = true;
      const res = await api.searchByIngredient(ingredient);
      runInAction(() => {
        this.meals = res.data.meals;
        this.error = '';
      });
    } catch (err) {
      console.error('Ingredient search failed:', err);
      runInAction(() => {
        this.error = err.response?.data?.message || 'Could not find meals for that ingredient.';
      });
    } finally {
      this.loading = false;
    }
  }

  async searchByPreference(preference) {
    try {
      this.loading = true;
      const res = await api.searchByPreference(preference);
      runInAction(() => {
        this.meals = res.data.meals;
        this.error = '';
      });
    } catch (err) {
      console.error('Preference search failed:', err);
      runInAction(() => {
        this.error = err.response?.data?.message || 'Could not find meals for that preference.';
      });
    } finally {
      this.loading = false;
    }
  }

  async getMealDetail(mealId) {
    try {
      this.loading = true;
      const res = await api.getMealDetail(mealId);
      runInAction(() => {
        this.selectedMeal = res.data;
        this.error = '';
      });
    } catch (err) {
      console.error('Meal detail fetch failed:', err);
      runInAction(() => {
        this.error = err.response?.data?.message || 'Could not load meal details.';
      });
    } finally {
      this.loading = false;
    }
  }

  clearMeals() {
    this.meals = [];
    this.selectedMeal = null;
  }
}

export default new MealStore();
