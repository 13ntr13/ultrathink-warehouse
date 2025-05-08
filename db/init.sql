-- Создание расширений
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создание схемы
CREATE SCHEMA IF NOT EXISTS warehouse;

-- Установка поискового пути
SET search_path TO warehouse, public;

-- Создание таблиц
CREATE TABLE IF NOT EXISTS warehouse.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS warehouse.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов
CREATE INDEX IF NOT EXISTS idx_users_username ON warehouse.users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON warehouse.users(email);
CREATE INDEX IF NOT EXISTS idx_products_name ON warehouse.products(name);

-- Создание триггеров для обновления updated_at
CREATE OR REPLACE FUNCTION warehouse.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON warehouse.users
    FOR EACH ROW
    EXECUTE FUNCTION warehouse.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON warehouse.products
    FOR EACH ROW
    EXECUTE FUNCTION warehouse.update_updated_at_column(); 