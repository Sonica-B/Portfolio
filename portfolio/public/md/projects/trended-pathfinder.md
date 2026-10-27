# TrendED Pathfinder: career recommender

NLP role matching and skill-gap learning paths.

> An NLP engine that matches resumes to roles with TF-IDF and cosine similarity, calibrates rankings with supervised classifiers, and recommends courses that close the skill gaps it finds.

- Kind: NLP
- Period: Sep 2024 to Nov 2024 (completed)
- Affiliation: Worcester Polytechnic Institute
- Team: Shreya Boyane with Sakshi, Blake, Harrison, Ankit
- Repository: https://github.com/Sonica-B/TrendED

## Problem

Job boards filter on job type and company, not on what a specific student can do and should learn next.

## Approach

Scraped job boards and university catalogs with BeautifulSoup, built the matching and ranking models in TensorFlow and scikit-learn, and generated top-k role plus coursework recommendations from unified text features.

## Results

- Scaled to 10,000+ job descriptions, 5,000 resumes and 300+ course catalogs.
- 95% match accuracy with 90% NLP precision; irrelevant results down 50% and data preparation time down 65%.
- Used by 1,000+ students for tailored course suggestions; LDA topic modeling on job and catalog text.

## Key numbers

- Job descriptions: 10,000+
- Match accuracy: 95%
- NLP precision: 90%

## Stack

Python, TF-IDF, scikit-learn, TensorFlow, BeautifulSoup, NLP

Canonical page: https://shreyaboyane.dev/projects/trended-pathfinder. This markdown: https://shreyaboyane.dev/md/projects/trended-pathfinder.md. Generated from the site content model, last updated 2026-10-27.
