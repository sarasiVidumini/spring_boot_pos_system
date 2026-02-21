# spring_boot_pos_system

### My spring_boot_pos_system YouTube Link = https://youtu.be/gPwxH2KsvJk

## GlowCare  - Intelligent POS System

### Overview
This is a high-performance Point of Sale (POS) system designed for the GDSE 73rd Batch assignment. It features a layered architecture on the backend using Spring Boot 3 and a modern, responsive dashboard on the frontend.

### Key Features
Customer Management: Full CRUD operations with asynchronous data handling.

Inventory Management: Track stock levels (QtyOnHand) and pricing with high precision.

Transactional Orders: A robust "Place Order" module that handles nested order details in a single transaction.

Intelligent Dashboard: Real-time business analytics including total revenue, order count, and growth charts using Chart.js.

### Tech Stack
Backend: Java 17, Spring Boot 3, Spring Data JPA, Hibernate, MySQL.

Frontend: HTML5, CSS3 (Glassmorphism UI), JavaScript, jQuery (AJAX), Lucide Icons.

Utilities: ModelMapper (Strict Matching), Lombok.

### Backend Architecture
The project follows a clean Layered Architecture:

Controller Layer: Handles REST API requests and sends responses using a generic APIResponse wrapper.

Service Layer: Contains business logic and transactional management (using @Service and @Transactional).

Repository Layer: Manages database persistence using Spring Data JPA.

Entity/DTO Layer: Uses ModelMapper to securely map data between the database entities and Data Transfer Objects (DTOs).


