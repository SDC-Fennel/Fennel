CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date TEXT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT,
  helpful INT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INT REFERENCES reviews(id),
  url text NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id SERIAL NOT NULL,
  characteristic_id INT REFERENCES characteristics(id),
  review_id INT REFERENCES reviews(id),
  value INT NOT NULL
);
