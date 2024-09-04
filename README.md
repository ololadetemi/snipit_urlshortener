*SnipIt URL Shortener*
SnipIt is a URL shortening service built with Node.js, Express, and MongoDB. It allows users to shorten long URLs, create custom slugs, and track link analytics such as click counts. The service also generates corresponding QR codes for the shortened URLs.

*Features*
Shorten URLs: Convert long URLs into concise, easy-to-share links.
Custom Slugs: Create personalized slugs for shortened URLs.
Analytics: Track the number of clicks for each shortened URL.
QR Code Generation: Automatically generate a QR code for each shortened URL.
RESTful API: Use a RESTful API to interact with the service programmatically.

Installation
Clone the repository:
git clone https://github.com/ololadetemi/snipit_urlshortener.git
cd snipit_urlshortener

*Install dependencies:*
npm install

*Create a .env file in the root directory and add the following environment variables:*
BASE_URL=http://snipit
MONGODB_URI=your_mongodb_uri
PORT=5040

*Start the server:*
npm start

Usage
Access the service at http://localhost:5040 if running locally.
Use the API to create, retrieve, and manage shortened URLs.

*API Endpoints*
POST /shorten: Shorten a new URL.
GET /:slug: Redirect to the original URL.
GET /:slug/stats: Get analytics for a shortened URL.


*Docker*
You can also run the application using Docker:

*Build the Docker image:*
docker build -t snipit-urlshortener .

*Run the container:*
docker run -p 5040:5040 snipit-urlshortener

*Contributing*
Feel free to open issues or submit pull requests if you'd like to contribute to the project.


