Create database my_meal_planner;

use my_meal_planner;

CREATE TABLE Meals (
    meal_id INT AUTO_INCREMENT PRIMARY KEY,
    meal_name VARCHAR(255) NOT NULL,
	image_url VARCHAR(255),
    calories INT NOT NULL,
    protein_g DECIMAL(5,2) NOT NULL,
    carbs_g DECIMAL(5,2) NOT NULL,
    fat_g DECIMAL(5,2) NOT NULL,
    tags VARCHAR(255)
);



CREATE TABLE Ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_name VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL
);



CREATE TABLE Meal_Ingredients (
    meal_ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    meal_id INT,
    ingredient_id INT,
    quantity DECIMAL(5,2),
    FOREIGN KEY (meal_id) REFERENCES Meals(meal_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id) ON DELETE CASCADE
);


CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE Meal_Plan (
    meal_plan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    meal_id INT,
    meal_type ENUM('Breakfast', 'Lunch', 'Dinner'),
    day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (meal_id) REFERENCES Meals(meal_id)
   );

use my_meal_planner;
INSERT INTO Ingredients (ingredient_name, unit) VALUES
('beef', 'g'),
('potato', 'g'),
('spinach', 'g'),
('cheese', 'g'),
('salt', 'tsp'),
('Greek yogurt', 'tbsp'),
('mustard', 'tsp'),
('lettuce', 'leaf'),
('mushrooms', 'g'),
('onion', 'tbsp'),
('olive oil', 'tbsp'),
('bell pepper', 'g'),
('soy sauce', 'tbsp'),
('sesame oil', 'tsp'),
('peas', 'g'),
('carrot', 'g'),
('green onions', 'piece'),
('white fish', 'g'),
('shrimp', 'g'),
('tomato', 'g'),
('zucchini', 'g'),
('chicken breast', 'g'),
('egg', 'piece'),
('radish', 'g'),
('eggplant', 'g'),
('cauliflower rice', 'g'),
('rice', 'g');

INSERT INTO Meals (meal_name, image_url, calories, protein_g, carbs_g, fat_g, tags) VALUES
('Beef & Potato Stew (Aloo Gosht)', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176453/Beef_Potato_Stew_Aloo_Gosht_yfsnjs.jpg', 370, 26.00, 18.00, 22.00, 'high_protein'),
('Beef & Bell Pepper Stir-Fry', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176436/Beef_Bell_Pepper_Stir-Fry_lb5ozu.jpg', 330, 29.00, 10.00, 18.00, 'high_protein,low_carb'),
('Beef Keema (Minced Beef Curry)', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176346/Beef_Keema_Minced_Beef_Curry_s710e8.jpg', 340, 25.00, 9.00, 20.00, 'high_protein,low_carb'),
('Healthy Beef Bolognese', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176381/Healthy_Beef_Bolognese_q3o8vp.jpg', 320, 28.00, 10.00, 18.00, 'high_protein,low_carb'),
('Potato & Spinach Curry (Aloo Palak)', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176345/Potato_Spinach_Curry_Aloo_Palak_ujxerb.jpg', 210, 5.00, 35.00, 6.00, 'vegetarian'),
('Baked Spiced Potato Patties (Aloo Tikkis)', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176362/Baked_Spiced_Potato_Patties_Aloo_Tikkis_yoo8ct.jpg', 250, 4.00, 32.00, 10.00, 'vegetarian'),
('Mushroom & Potato Soup', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176375/Mushroom_Potato_Soup_ndep76.jpg', 240, 6.00, 30.00, 10.00, 'vegetarian'),
('Grilled White Fish with Lemon Herb Veggies', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176406/Grilled_White_Fish_with_Lemon_Herb_Veggies_i97viv.jpg', 300, 25.00, 10.00, 12.00, 'high_protein,low_carb'),
('Tomato and Shrimp Cauliflower Rice', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176383/Tomato_and_Shrimp_Cauliflower_Rice_jjqvaw.jpg', 320, 35.00, 10.00, 18.00, 'high_protein,low_carb'),
('Shrimp & Tomato Zucchini Noodles', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176398/Shrimp_Tomato_Zucchini_Noodles_rpiokg.jpg', 350, 40.00, 8.00, 18.00, 'high_protein,low_carb'),
('Chicken Veggie Stir-Fry', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176419/Chicken_Veggie_Stir-Fry_sovsc2.jpg', 400, 35.00, 25.00, 15.00, 'high_protein'),
('Chicken and Veggie Soup', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176409/Chicken_and_Veggie_Soup_ynszzd.jpg', 250, 25.00, 10.00, 10.00, 'high_protein,low_carb'),
('Tomato & Chicken Lettuce Wraps', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176385/Tomato_Chicken_Lettuce_Wraps_phvm7o.jpg', 280, 35.00, 6.00, 15.00, 'high_protein,low_carb'),
('Chicken and Zucchini Noodles (Zoodles)', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176372/Chicken_and_Zucchini_Noodles_Zoodles_ipmqbw.jpg', 320, 30.00, 10.00, 18.00, 'high_protein,low_carb'),
('Scrambled Eggs with Spinach and Cheese', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176403/Scrambled_Eggs_with_Spinach_and_Cheese_mz5vb1.jpg', 320, 20.00, 2.00, 25.00, 'high_protein,low_carb'),
('Egg Muffins with Veggies', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176380/Egg_Muffins_with_Veggies_sx7vzu.jpg', 280, 22.00, 4.00, 20.00, 'high_protein,low_carb'),
('Tomato and Spinach Egg White Scramble', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176347/Tomato_and_Spinach_Egg_White_Scramble_bx7ook.jpg', 200, 25.00, 6.00, 10.00, 'high_protein,low_carb'),
('Roast New Potatoes & Radishes', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176345/Roast_New_Potatoes_Radishes_mfgsup.jpg', 180, 3.00, 25.00, 7.00, 'vegetarian'),
('Tomato and Eggplant Grilled Stack', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176341/Tomato_and_Eggplant_Grilled_Stack_fet9sb.jpg', 220, 15.00, 10.00, 14.00, 'vegetarian'),
('Tomato Basil Soup with Grilled Chicken', 'https://res.cloudinary.com/dsh8jzuhk/image/upload/v1750176341/Tomato_Basil_Soup_with_Grilled_Chicken_jyf1bj.jpg', 320, 35.00, 12.00, 16.00, 'high_protein');



-- Beef & Potato Stew (Aloo Gosht)
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(1, 1, 150.00),  -- beef
(1, 2, 100.00),  -- potato
(1, 3, 30.00),  -- spinach
(1, 4, 30.00),  -- cheese
(1, 5, 0.25);    -- salt

-- Beef & Bell Pepper Stir-Fry
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(2, 1, 150.00),  -- beef
(2, 12, 50.00),  -- bell pepper
(2, 10, 1.00),   -- onion
(2, 11, 1.00),   -- olive oil
(2, 13, 1.00);   -- soy sauce

-- Beef Keema (Minced Beef Curry)
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(3, 1, 150.00),  -- beef
(3, 10, 1.00),   -- onion
(3, 3, 50.00),   -- spinach
(3, 15, 30.00),  -- peas
(3, 16, 30.00);  -- carrot

-- Healthy Beef Bolognese
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(4, 1, 150.00),  -- beef
(4, 2, 100.00),  -- potato
(4, 9, 30.00),   -- mushrooms
(4, 10, 1.00),   -- onion
(4, 11, 1.00);   -- olive oil

-- Potato & Spinach Curry (Aloo Palak)
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(5, 2, 100.00),  -- potato
(5, 3, 50.00),   -- spinach
(5, 10, 1.00),   -- onion
(5, 11, 1.00),   -- olive oil
(5, 5, 0.25);    -- salt

-- Baked Spiced Potato Patties (Aloo Tikkis)
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(6, 2, 100.00),  -- potato
(6, 10, 1.00),   -- onion
(6, 17, 50.00),  -- radish
(6, 11, 1.00);   -- olive oil

-- Mushroom & Potato Soup
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(7, 2, 100.00),  -- potato
(7, 9, 50.00),   -- mushrooms
(7, 10, 1.00),   -- onion
(7, 11, 1.00);   -- olive oil

-- Grilled White Fish with Lemon Herb Veggies
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(8, 18, 150.00), -- white fish
(8, 2, 100.00),  -- potato
(8, 3, 30.00),   -- spinach
(8, 11, 1.00),   -- olive oil
(8, 10, 1.00);   -- onion

-- Tomato and Shrimp Cauliflower Rice
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(9, 19, 150.00), -- shrimp
(9, 2, 100.00),  -- potato
(9, 3, 50.00),   -- spinach
(9, 2, 100.00),  -- cauliflower rice
(9, 10, 1.00);   -- onion

-- Shrimp & Tomato Zucchini Noodles
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(10, 19, 150.00), -- shrimp
(10, 21, 50.00),  -- zucchini
(10, 9, 50.00),   -- mushrooms
(10, 10, 1.00),   -- onion
(10, 11, 1.00);   -- olive oil

-- Chicken Veggie Stir-Fry
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(11, 22, 150.00), -- chicken breast
(11, 12, 50.00),  -- bell pepper
(11, 10, 1.00),   -- onion
(11, 3, 50.00),   -- spinach
(11, 11, 1.00);   -- olive oil

-- Chicken and Veggie Soup
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(12, 22, 150.00), -- chicken breast
(12, 2, 100.00),  -- potato
(12, 16, 30.00),  -- carrot
(12, 10, 1.00),   -- onion
(12, 13, 0.5);    -- sesame oil

-- Tomato & Chicken Lettuce Wraps
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(13, 22, 150.00), -- chicken breast
(13, 20, 50.00),  -- tomato
(13, 12, 30.00),  -- bell pepper
(13, 11, 1.00),   -- olive oil
(13, 5, 0.25);    -- salt

-- Chicken and Zucchini Noodles (Zoodles)
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(14, 22, 150.00), -- chicken breast
(14, 21, 50.00),  -- zucchini
(14, 20, 50.00),  -- tomato
(14, 11, 1.00),   -- olive oil
(14, 10, 1.00);   -- onion

-- Scrambled Eggs with Spinach and Cheese
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(15, 23, 3),      -- egg
(15, 3, 50.00),   -- spinach
(15, 4, 30.00),   -- cheese
(15, 11, 1.00);   -- olive oil

-- Egg Muffins with Veggies
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(16, 23, 3),      -- egg
(16, 12, 50.00),  -- bell pepper
(16, 2, 100.00),  -- potato
(16, 10, 1.00);   -- onion

-- Tomato and Spinach Egg White Scramble
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(17, 23, 6),      -- egg
(17, 3, 50.00),   -- spinach
(17, 20, 50.00);  -- tomato

-- Roast New Potatoes & Radishes
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(18, 2, 100.00),  -- potato
(18, 17, 50.00),  -- radish
(18, 11, 1.00);   -- olive oil

-- Tomato and Eggplant Grilled Stack
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(19, 20, 50.00),  -- tomato
(19, 18, 100.00), -- eggplant
(19, 4, 30.00),   -- cheese
(19, 11, 1.00);   -- olive oil

-- Tomato Basil Soup
INSERT INTO Meal_Ingredients (meal_id, ingredient_id, quantity) VALUES
(20, 20, 50.00),  -- tomato
(20, 3, 50.00),   -- spinach
(20, 22, 150.00), -- chicken breast
(20, 9, 1.00);    -- mushrooms









