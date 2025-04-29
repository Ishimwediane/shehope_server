
 🌸 SheHope API

> Empowering young women with mental health support, legal aid, and community engagement.

 🌐 Base URL

- Local: `http://localhost:5000`
- Production: `https://shehope-server-1.onrender.com`



⚙️ Setup Instructions


1. Clone the repository
git clone https://github.com/IshimweDiane/shehope-server.git

2. Navigate into the project directory
cd shehope-server

3. Install dependencies
npm install

4. Add your environment variables in a .env file
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

6. Run the development server
npm run dev


🔐 Authentication

Protected routes require a Bearer token in headers:


Authorization: Bearer <your_jwt_token>


 📁 File Uploads

Upload files via `multipart/form-data` using the `file` field.


📦 API Routes

👤 User Routes - `/api/user`

| Method | Endpoint       | Description                 |
|--------|----------------|-----------------------------|
| POST   | `/register`    | Register a new user         |
| POST   | `/login`       | Login and receive JWT token |
| GET    | `/me`          | Get current user (auth)     |



📝 Blog Routes - `/api/blogs`

| Method | Endpoint     | Description                  |
|--------|--------------|------------------------------|
| GET    | `/`          | Get all blogs                |
| POST   | `/create`    | Create blog (auth + file)    |



 💡 Tips Routes - `/api/tips`

| Method | Endpoint  | Description                  |
|--------|-----------|------------------------------|
| GET    | `/`       | Get all tips                 |
| POST   | `/`       | Create a new tip (auth)      |



📚 Blogs & Tips by Trimester - `/api/blogs-tips`

| Method | Endpoint      | Description                   |
|--------|---------------|-------------------------------|
| GET    | `/blogs-tips` | Get tips & blogs by trimester |



🗓️ Event Routes - `/api/events`

| Method | Endpoint   | Description                   |
|--------|------------|-------------------------------|
| GET    | `/`        | Get all events (auth)         |
| POST   | `/`        | Create a new event (auth)     |
| PUT    | `/:id`     | Update an event by ID (auth)  |
| DELETE | `/:id`     | Delete an event by ID (auth)  |



🧑‍🤝‍🧑 Community Routes - `/api/posts`

| Method | Endpoint                     | Description                   |
|--------|------------------------------|-------------------------------|
| GET    | `/`                          | Get all posts                 |
| POST   | `/`                          | Create a new post (auth)      |
| GET    | `/:postId`                   | Get single post by ID         |
| POST   | `/like/:postId`              | Like a post (auth)            |
| POST   | `/comment/:postId`           | Comment on a post (auth)      |
| POST   | `/report/:postId`            | Report a post (auth)          |



🎁 Donation Routes - `/api/donations`

| Method | Endpoint       | Description                            |
|--------|----------------|----------------------------------------|
| GET    | `/`            | Get all donations (admin only)         |
| POST   | `/`            | Submit donation request (auth + file)  |
| PUT    | `/:donationId` | Approve/Update donation (admin only)   |



🛠️ Admin Routes - `/api/admin` (auth required)

👥 Users

| Method | Endpoint        | Description         |
|--------|-----------------|---------------------|
| GET    | `/users`        | View all users      |
| PUT    | `/users/:id`    | Update user         |
| DELETE | `/users/:id`    | Delete user         |

 📩 Posts & Reports

| Method | Endpoint                                                  | Description              |
|--------|-----------------------------------------------------------|--------------------------|
| GET    | `/posts`                                                  | View all posts           |
| PUT    | `/posts/:postId/reports/:reportId/resolve`                | Resolve reported post    |
| DELETE | `/posts/:postId`                                          | Delete a post            |
| DELETE | `/posts/:postId/comments/:commentId`                      | Delete a comment         |

 📝 Blogs

| Method | Endpoint     | Description      |
|--------|--------------|------------------|
| POST   | `/blogs`     | Create a blog    |
| GET    | `/blogs`     | Get all blogs    |
| PUT    | `/blogs/:id` | Update blog      |
| DELETE | `/blogs/:id` | Delete blog      |

💡 Tips

| Method | Endpoint    | Description     |
|--------|-------------|-----------------|
| POST   | `/tips`     | Create a tip    |
| GET    | `/tips`     | Get all tips    |
| PUT    | `/tips/:id` | Update a tip    |
| DELETE | `/tips/:id` | Delete a tip    |
 🗓️ Events

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| GET    | `/event`      | Get all events    |
| POST   | `/event`      | Create an event   |
| PUT    | `/events/:id` | Update an event   |
| DELETE | `/events/:id` | Delete an event   |



🧪 Testing the API

Use [Postman](https://www.postman.com/) 

 Headers

http
Authorization: Bearer <your_token>
Content-Type: application/json


🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.


