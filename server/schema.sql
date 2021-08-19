CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date TEXT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT,
  helpful INT NOT NULL DEFAULT 0
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
  id SERIAL PRIMARY KEY,
  characteristic_id INT REFERENCES characteristics(id),
  review_id INT REFERENCES reviews(id),
  value INT NOT NULL
);

CREATE INDEX rev_prod_id_idx ON reviews(product_id);
CREATE INDEX rev_id_idx ON reviews_photos(review_id);
CREATE INDEX char_prod_id_idx ON characteristics(product_id);
CREATE INDEX char_id_idx ON characteristic_reviews(characteristic_id);

-- need to re-run the below after loading data
UPDATE reviews
SET response = null
WHERE response = 'null';

SELECT setval('reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM reviews), 1), false);
SELECT setval('reviews_photos_id_seq', COALESCE((SELECT MAX(id)+1 FROM reviews_photos), 1), false);
SELECT setval('characteristics_id_seq', COALESCE((SELECT MAX(id)+1 FROM characteristics), 1), false);
SELECT setval('characteristic_reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM characteristic_reviews), 1), false);
