# Expense Tracker 💵

A Django-based web application for tracking personal expenses. This application allows users to manage their expenses, categorize spending, and monitor their budget.

## Features

-   User authentication system
-   Add and track expenses
-   Categorize expenses
-   View expense summaries
-   Track total spending
-   Responsive design

## Technologies Used

-   Python 3.x
-   Django 4.x
-   SQLite3
-   HTML/CSS
-   Bootstrap

## Installation

1. Clone the repository

```bash
git clone https://github.com/mettcetn/expense-tracker.git
cd expense-tracker
```

2. Create a virtual environment and activate it

```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install required packages

```bash
pip install -r requirements.txt
```

4. Run migrations

```bash
python manage.py migrate
```

5. Create a superuser (admin)

```bash
python manage.py createsuperuser
```

6. Run the development server

```bash
python manage.py runserver
```

The application will be available at `http://127.0.0.1:8000/`

## Usage

1. Register a new account or login
2. Add expenses through the "Add Expense" form
3. View your expenses list and total spending
4. Categorize expenses for better organization
