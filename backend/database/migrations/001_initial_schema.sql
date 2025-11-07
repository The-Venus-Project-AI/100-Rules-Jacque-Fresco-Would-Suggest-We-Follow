-- RBE Platform Initial Database Schema
-- Migration: 001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Resources Table
CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    name VARCHAR(200) NOT NULL,
    current_amount NUMERIC(20, 2) NOT NULL DEFAULT 0,
    unit VARCHAR(50) NOT NULL,
    region VARCHAR(100) NOT NULL DEFAULT 'global',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source_api VARCHAR(200),
    confidence_level NUMERIC(3, 2) CHECK (confidence_level >= 0 AND confidence_level <= 1),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Principles Implementation Table
CREATE TABLE IF NOT EXISTS principles_implementation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    principle_number INTEGER NOT NULL CHECK (principle_number >= 1 AND principle_number <= 100),
    principle_text TEXT NOT NULL,
    category VARCHAR(200) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('planned', 'in_progress', 'implemented')),
    progress_percentage NUMERIC(5, 2) CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    region VARCHAR(100) NOT NULL DEFAULT 'global',
    evidence_links TEXT[],
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID
);

-- Cooperation Metrics Table
CREATE TABLE IF NOT EXISTS cooperation_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region_from VARCHAR(100) NOT NULL,
    region_to VARCHAR(100),
    cooperation_type VARCHAR(100) NOT NULL,
    metric_name VARCHAR(200) NOT NULL,
    metric_value NUMERIC(10, 2) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(200),
    metadata JSONB
);

-- Automation Progress Table
CREATE TABLE IF NOT EXISTS automation_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sector VARCHAR(100) NOT NULL,
    subsector VARCHAR(100),
    automation_percentage NUMERIC(5, 2) CHECK (automation_percentage >= 0 AND automation_percentage <= 100),
    jobs_automated INTEGER DEFAULT 0,
    jobs_created INTEGER DEFAULT 0,
    region VARCHAR(100) NOT NULL DEFAULT 'global',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Environmental Metrics Table
CREATE TABLE IF NOT EXISTS environmental_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(200) NOT NULL,
    metric_type VARCHAR(100) NOT NULL,
    value NUMERIC(20, 4) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    region VARCHAR(100) NOT NULL DEFAULT 'global',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(200),
    metadata JSONB
);

-- Social Metrics Table
CREATE TABLE IF NOT EXISTS social_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    region VARCHAR(100) NOT NULL DEFAULT 'global',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(200)
);

-- Users Table (for future authentication)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'contributor' CHECK (role IN ('admin', 'moderator', 'contributor', 'viewer')),
    region VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- User Contributions Table
CREATE TABLE IF NOT EXISTS user_contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    contribution_type VARCHAR(100) NOT NULL,
    content JSONB NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id)
);

-- Circular Cities Table
CREATE TABLE IF NOT EXISTS circular_cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    region VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('proposed', 'planning', 'construction', 'operational')),
    population_target INTEGER,
    current_population INTEGER DEFAULT 0,
    renewable_energy_percentage NUMERIC(5, 2),
    waste_recycling_percentage NUMERIC(5, 2),
    coordinates POINT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_region ON resources(region);
CREATE INDEX idx_resources_updated ON resources(last_updated DESC);
CREATE INDEX idx_principles_number ON principles_implementation(principle_number);
CREATE INDEX idx_principles_status ON principles_implementation(status);
CREATE INDEX idx_principles_region ON principles_implementation(region);
CREATE INDEX idx_cooperation_regions ON cooperation_metrics(region_from, region_to);
CREATE INDEX idx_cooperation_timestamp ON cooperation_metrics(timestamp DESC);
CREATE INDEX idx_automation_sector ON automation_progress(sector);
CREATE INDEX idx_automation_region ON automation_progress(region);
CREATE INDEX idx_environmental_metric ON environmental_metrics(metric_name);
CREATE INDEX idx_environmental_timestamp ON environmental_metrics(timestamp DESC);
CREATE INDEX idx_social_category ON social_metrics(category);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_contributions_user ON user_contributions(user_id);
CREATE INDEX idx_circular_cities_status ON circular_cities(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_principles_updated_at BEFORE UPDATE ON principles_implementation
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_circular_cities_updated_at BEFORE UPDATE ON circular_cities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
