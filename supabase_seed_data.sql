-- MOCK SEED DATA FOR INDIA TRAVEL
-- Execute this after running supabase_schema.sql

-- 1. Insert States
INSERT INTO public.states (name, type, description, capital, image_url) VALUES
('Rajasthan', 'State', 'The Land of Kings, known for its majestic forts and rich culture.', 'Jaipur', 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800'),
('Kerala', 'State', 'God''s Own Country, famous for backwaters and tropical greenery.', 'Thiruvananthapuram', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800'),
('Jammu & Kashmir', 'Union Territory', 'Paradise on Earth, featuring the Himalayas and serene lakes.', 'Srinagar', 'https://images.unsplash.com/photo-1626014903706-0b190f898394?q=80&w=800');

-- 2. Insert Destinations (Assuming state IDs 1, 2, 3 based on above insertion order)
-- Note: In a real system, you'd select the state_id programmatically. Assuming IDs 1, 2, 3 here.
INSERT INTO public.destinations (state_id, name, description, best_time_to_visit, budget_estimate_per_day, rating, hero_image_url) VALUES
(1, 'Jaipur', 'The Pink City, famous for its majestic forts and palaces.', 'October to March', 4000, 4.7, 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800'),
(2, 'Alleppey', 'Known for its tranquil backwaters and houseboat cruises.', 'September to March', 5000, 4.8, 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800'),
(3, 'Srinagar', 'Summer capital known for Dal Lake and Mughal Gardens.', 'April to October', 6000, 4.9, 'https://images.unsplash.com/photo-1626014903706-0b190f898394?q=80&w=800');

-- 3. Insert Attractions (Using subqueries to find destination IDs)
INSERT INTO public.attractions (destination_id, name, category, description, entry_fee_inr, opening_hours) VALUES
((SELECT id FROM public.destinations WHERE name = 'Jaipur' LIMIT 1), 'Amer Fort', 'Monument', 'A magnificent fort built with red sandstone and marble.', 500, '08:00 - 17:30'),
((SELECT id FROM public.destinations WHERE name = 'Jaipur' LIMIT 1), 'Hawa Mahal', 'Monument', 'The Palace of Winds with its unique honeycomb-like facade.', 200, '09:00 - 17:00'),
((SELECT id FROM public.destinations WHERE name = 'Alleppey' LIMIT 1), 'Vembanad Lake', 'Other', 'The longest lake in India, perfect for houseboat tours.', 0, '24 Hours'),
((SELECT id FROM public.destinations WHERE name = 'Srinagar' LIMIT 1), 'Dal Lake', 'Other', 'The Jewel in the crown of Kashmir, known for Shikara rides.', 0, '24 Hours');
