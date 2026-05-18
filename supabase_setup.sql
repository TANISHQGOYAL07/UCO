-- SQL Script to set up BioCycle database tables in Supabase
-- Paste this script inside your Supabase SQL Editor and click "Run"!

-- 1. Create Suppliers Table
CREATE TABLE IF NOT EXISTS public.suppliers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'Restaurant',
    contact TEXT NOT NULL,
    address TEXT,
    avg_monthly_oil NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'Active',
    last_pickup TEXT DEFAULT 'None',
    latitude NUMERIC DEFAULT 28.6139, -- Defaults near Delhi NCR, updates with location
    longitude NUMERIC DEFAULT 77.2090,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) & Public read/write (for development ease)
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all read access" ON public.suppliers FOR SELECT USING (true);
CREATE POLICY "Allow all write access" ON public.suppliers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access" ON public.suppliers FOR UPDATE USING (true);
CREATE POLICY "Allow all delete access" ON public.suppliers FOR DELETE USING (true);

-- 2. Create Pickups Table
CREATE TABLE IF NOT EXISTS public.pickups (
    id TEXT PRIMARY KEY,
    supplier_name TEXT NOT NULL,
    quantity NUMERIC NOT NULL,
    pickup_date TEXT NOT NULL,
    status TEXT DEFAULT 'Scheduled',
    collector TEXT,
    price_paid NUMERIC DEFAULT 0,
    quality_ffa NUMERIC DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.pickups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all read access" ON public.pickups FOR SELECT USING (true);
CREATE POLICY "Allow all write access" ON public.pickups FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access" ON public.pickups FOR UPDATE USING (true);
CREATE POLICY "Allow all delete access" ON public.pickups FOR DELETE USING (true);

-- 3. Create Buyers Table
CREATE TABLE IF NOT EXISTS public.buyers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'Biodiesel Plant',
    contact TEXT,
    contract_rate NUMERIC NOT NULL,
    total_bought NUMERIC DEFAULT 0,
    latitude NUMERIC DEFAULT 28.6250,
    longitude NUMERIC DEFAULT 77.2200,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.buyers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all read access" ON public.buyers FOR SELECT USING (true);
CREATE POLICY "Allow all write access" ON public.buyers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access" ON public.buyers FOR UPDATE USING (true);
CREATE POLICY "Allow all delete access" ON public.buyers FOR DELETE USING (true);

-- 4. Create Sales Table
CREATE TABLE IF NOT EXISTS public.sales (
    id TEXT PRIMARY KEY,
    buyer_name TEXT NOT NULL,
    quantity NUMERIC NOT NULL,
    sale_date TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    invoice_number TEXT NOT NULL,
    status TEXT DEFAULT 'Pending Payment',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all read access" ON public.sales FOR SELECT USING (true);
CREATE POLICY "Allow all write access" ON public.sales FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access" ON public.sales FOR UPDATE USING (true);
CREATE POLICY "Allow all delete access" ON public.sales FOR DELETE USING (true);

-- Supabase tables setup complete! Empty tables ready for active production oil data.
