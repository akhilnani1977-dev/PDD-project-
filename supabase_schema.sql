-- TRAVERSE - India Travel Database Schema for Supabase PostgreSQL

-- Enable PostGIS for geospatial queries (finding nearby places)
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. USERS TABLE (Extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  preferred_currency TEXT DEFAULT 'INR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. STATES & TERRITORIES (India Only)
CREATE TABLE public.states (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL, -- e.g., 'Maharashtra', 'Kerala', 'Goa'
  type TEXT NOT NULL CHECK (type IN ('State', 'Union Territory')),
  description TEXT,
  capital TEXT,
  image_url TEXT
);

-- 3. DESTINATIONS (Cities, Towns, Regions in India)
CREATE TABLE public.destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  state_id INTEGER REFERENCES public.states(id),
  name TEXT NOT NULL,
  description TEXT,
  best_time_to_visit TEXT,
  budget_estimate_per_day DECIMAL,
  rating DECIMAL DEFAULT 0.0,
  hero_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. ATTRACTIONS (Specific Places to visit)
CREATE TABLE public.attractions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  destination_id UUID REFERENCES public.destinations(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Monument', 'Beach', 'Temple', 'Hill Station', 'Forest', 'Museum', 'Other')),
  description TEXT,
  location GEOGRAPHY(POINT), -- Geo-coordinates for map integration
  entry_fee_inr DECIMAL DEFAULT 0,
  opening_hours TEXT,
  image_urls TEXT[]
);

-- 5. TRIPS (User created itineraries)
CREATE TABLE public.trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  total_budget_inr DECIMAL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 6. TRIP ITEMS (Days/Stops in a trip)
CREATE TABLE public.trip_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
  attraction_id UUID REFERENCES public.attractions(id),
  day_number INTEGER,
  planned_time TIME,
  notes TEXT
);

-- RLS (Row Level Security) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own trips" ON public.trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view public trips" ON public.trips FOR SELECT USING (is_public = true);
CREATE POLICY "Users can insert their own trips" ON public.trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own trips" ON public.trips FOR UPDATE USING (auth.uid() = user_id);
