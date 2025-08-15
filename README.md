# Liveable

## Overview
### Desc
[Liveable](https://liveable-zeta.vercel.app/) is a full-stack home affordability platform built using Next.js and Prisma ORM deployed with Vercel.

### Motivation
While lots of job boards tend to give you a role description and compensation info, they never really account for or inform the user of the cost of living in the location of the job itself. A salary figure in one city might have you living like royalty, whereas in another, you might just be trying to make ends meet. Liveable makes aggregates that data to save headaches and the number of tabs open for prospective job hunters. This project builds on another project called [Affor-db](https://github.com/BryOliveira/affor-db), a Python CLI application with a SQL database.

## Table of Contents
1. [Usage and Features](#usage)
    - [Homepage Navigation](#home)
    - [Liveability Tool](#calc)
    - [Liveability Map](#map)
2. [Acknowledgements](#acknowledgements)
3. [Contact](#contact)

## Usage and Features <a name="usage"></a>
Go to [Liveable](https://liveable-zeta.vercel.app/).
### Navigation from homepage <a name="home"></a>
- Type into search bar job titles and location to then be redirected to the "Jobs" screen with your query filtering the job postings.
- Click on Jobs to see all of the available jobs.
- Hover over Tools:
  - Calculator tool that lets you calculate mortgage costs and assess how liveable it would be proportional to gross income.
  - Map tool that lets you view the entire contiguous US and how liveable they are based on user-input salary and the median price of houses in those states.
### Liveability Calculator <a name="calc"></a>
<div align="center"><img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/77e8292d-588d-4292-994d-da7cb4495904" /></div>
Fill in the form's fields and you'll be treated to two responsive donut charts and two flower animations representing how liveable it would be with the mortgage payments under the min and max salaries.

All the form inputs are required to have something, and there is form pre-submission validation warns the user if any of the inputs are invalid (e.g. min salary > max salary, down payment > house price, etc.).

### Liveability Map <a name="map"></a>
<div align="center"><img width="1200" height="700" alt="image" src="https://github.com/user-attachments/assets/ae053fed-27bb-4317-ba3c-44039d9212df" /></div>
Again, fill in the form's fields and the map dynamically updates to show you how liveable each state is based on the salary and expected loan term and interest rate using the median home price as the expected home price.

Hovering over each state gives you more income like the name of the state, the median house price in that state, and how much as a percentage of your income would the mortgage payments take.

## Acknowledgements <a name="acknowledgements"></a>
The job listings are queried from a MySQL database and are not regularly updated as they were taken and pre-processed from a Kaggle dataset.
The median house price is processed data from Zillow's public datasets on current house sale prices.

Affor-db, the sourced database, was co-created with [Felipe Cruz](https://github.com/PipeCruz), a fellow Caltech CS Undergrad minoring in Data Science.

## Contact <a name="contact"></a>
If you wanna get in touch you can email me at [boliveir@caltech.edu](mailto:boliveir@caltech.edu).
You are free to clone the repo and mess around with it locally, but I'm not quite sure how the app would interact with the Aiven hosted DB server on other machines.

## License <a name="license"></a>
<div align="center">
  &copy; 2025 Bryan Oliveira.
  
  All rights reserved.
</div>
