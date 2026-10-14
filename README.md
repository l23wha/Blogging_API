# 📝 Blogging Platform API

A clean and robust RESTful API built for a personal blogging platform using **Node.js**, **Express.js**, and **MongoDB**. This project implements full CRUD operations, proper HTTP status codes, structured error handling, and advanced search filtering.

---

## 🚀 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose (ODM)
* **Environment Management:** `dotenv`
* **Utilities:** `cors`

---

## ✨ Features

* **Complete CRUD Operations:** Create, read, update, and delete blog posts seamlessly.
* **Wildcard Search Filtering:** Filter posts dynamically by title, content, or category using case-insensitive Regular Expressions (`/posts?term=...`).
* **Proper HTTP Status Codes:** Returns correct status codes (`201 Created`, `200 OK`, `204 No Content`, `400 Bad Request`, `404 Not Found`, and `500 Internal Server Error`).
* **Timestamps:** Automatically tracks creation and update times for every blog post using Mongoose timestamps.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.rhwj0rz.mongodb.net/blogging-platform?retryWrites=true&w=majority&appName=Cluster0
