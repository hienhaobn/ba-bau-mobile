import { navigate } from 'navigation/utils';

export const goToFoods = (foodCategoryRoot: food.FoodCategoryRoot) => navigate('Foods', { foodCategoryRoot });

export const goToFoodDetail = (foodId: string) => navigate('FoodDetail', { foodId });

export const goToDishDetail = () => navigate('DishDetail');
