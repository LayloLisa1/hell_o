-- Foydalanuvchilar jadvallari
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('job_seeker', 'employer', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kompaniyalar jadvallari
CREATE TABLE Companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    website VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ish Joylari jadvallari
CREATE TABLE Jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    company_id INT NOT NULL REFERENCES Companies(id),
    location VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('full_time', 'part_time', 'contract')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ish Arizalari jadvallari
CREATE TABLE Applications (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL REFERENCES Jobs(id),
    user_id INT NOT NULL REFERENCES Users(id),
    status VARCHAR(20) NOT NULL CHECK (status IN ('applied', 'reviewed', 'accepted', 'rejected')),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ish Joylari uchun Ma'lumotlar jadvallari
CREATE TABLE JobDetails (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL REFERENCES Jobs(id),
    requirement TEXT NOT NULL,
    responsibility TEXT NOT NULL,
    benefit TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User jadvali uchun indeks yaratish
CREATE INDEX idx_users_username ON Users(username);
CREATE INDEX idx_users_email ON Users(email);

-- Jobs jadvali uchun indeks yaratish
CREATE INDEX idx_jobs_title ON Jobs(title);
CREATE INDEX idx_jobs_location ON Jobs(location);
CREATE INDEX idx_jobs_company_id ON Jobs(company_id);

-- Applications jadvali uchun indeks yaratish
CREATE INDEX idx_applications_job_id ON Applications(job_id);
CREATE INDEX idx_applications_user_id ON Applications(user_id);

-- JobDetails jadvali uchun indeks yaratish
CREATE INDEX idx_jobdetails_job_id ON JobDetails(job_id);
