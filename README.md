# Field Estimate Tool

The stack I used to build the HVAC field estimate tool was Next.js for the frontend/ backend, and Prisma ORM with SQLite for the database.

The first step I took in building this application was to normalize the data files that were given to me using a script. Then I create 3 separate database tables for each of the files, and migrated the data into the tables. 

Once I verified the tables were successfully populated, I started creating the backend API endpoints for customers, equipment, and labor rates. After I tested the endpoints and made sure the data can be successfully retrieved, I started working on the frontend.

I split the frontend UI into focused cards for customer, labor, equipment, and estimate summary so each section has a clear responsibility while the home page coordinates the selected values. With these components in place, a technician can search and select a customer, choose a job type and level, enter estimated labor hours within the allowed range, optionally select equipment, and then view a final estimate summary.

With more time I would definitely add form validation feedback, implement database create/ update/ delete operations (currently its only read for all tables), a polished mobile layout, and tests for the API routes and estimate calculations. I would also move the app to Postgres for a production style setup as SQLite is not really ideal for multiple users sharing the database.