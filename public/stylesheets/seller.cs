
body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
}

.dashboard-header {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dashboard-header .navbar-brand {
    display: flex;
    align-items: center;
}

.dashboard-header .navbar-brand .logo {
    height: 40px;
    margin-right: 10px;
}

.dashboard-main {
    padding: 20px;
}

.card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 8px;
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}

.card .card-title {
    font-size: 1.5rem;
    color: #007bff;
    font-weight: bold;
}

.card .btn {
    margin-top: 10px;
    font-size: 0.9rem;
}

h1 {
    font-size: 2.5rem;
    color: #333;
}

h2 {
    font-size: 2rem;
    color: #555;
    margin-top: 30px;
    margin-bottom: 20px;
}

.quick-actions .btn {
    font-size: 1.2rem;
    padding: 10px 20px;
    margin-bottom: 20px;
}

.dashboard-footer {
    background-color: #007bff;
    color: white;
    padding: 10px 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
}

.dashboard-footer p {
    margin: 0;
    font-size: 0.9rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .card {
        margin-bottom: 20px;
    }

    .quick-actions .btn {
        font-size: 1rem;
    }
}
