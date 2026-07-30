# Photo Tagger

🌐 **Live Demo:** https://photo-tagger-ten.vercel.app/

<p align="center">
  <img src="docs/app/Home.png" width="900" alt="Photo Tagger">
</p>

<h3 align="center">
AWS Serverless Photo Management Application built with React
</h3>

---

## About

Photo Tagger is an AWS Serverless Photo Management Application built using React and AWS Cloud services. Users can upload images, automatically detect labels using Amazon Rekognition, search photos using filenames or detected labels, preview images, download them, and delete them.

The project was built to gain hands-on experience with AWS serverless architecture by integrating multiple AWS services into a complete cloud application.

---

## Features

- 📤 Upload images directly to Amazon S3
- 🏷️ Automatic image labeling using Amazon Rekognition
- 🔍 Search images using filenames or detected labels
- 🖼️ Responsive photo gallery
- 🔎 Full-screen image preview
- 📥 Download uploaded images
- 🗑️ Delete images
- ⚡ Fully serverless backend
- ☁️ Cloud-native architecture
- 💻 Responsive React frontend

---

# Architecture

<p align="center">
<img src="docs/architecture/Diagram.png" width="950">
</p>

## Workflow

1. User uploads an image from the React application.
2. React requests a pre-signed upload URL through Amazon API Gateway.
3. API Gateway invokes an AWS Lambda function.
4. Lambda generates a pre-signed Amazon S3 upload URL.
5. The image is uploaded directly to Amazon S3.
6. Amazon S3 triggers another Lambda function.
7. Amazon Rekognition analyzes the uploaded image.
8. Image metadata and labels are stored in Amazon DynamoDB.
9. React fetches metadata through API Gateway.
10. Users can search, preview, download, and delete photos.

---

# Screenshots

## Home

<p align="center">
<img src="docs/app/Home.png" width="900">
</p>

Landing page of the application.

---

## Upload

<p align="center">
<img src="docs/app/upload.png" width="900">
</p>

Uploading an image securely to Amazon S3.

---

## Gallery

<p align="center">
<img src="docs/app/gallery.png" width="900">
</p>

Displays all uploaded photos.

---

## Search

<p align="center">
<img src="docs/app/search.png" width="900">
</p>

Search photos using filenames or AI-generated labels.

---

## Image Preview

<p align="center">
<img src="docs/app/modal.png" width="900">
</p>

Preview uploaded images with download and delete options.

---

## Delete Confirmation

<p align="center">
<img src="docs/app/delete-confirmation.png" width="900">
</p>

Confirmation dialog before deleting an image.

---

# AWS Services Used

| Service | Purpose |
|----------|---------|
| Amazon API Gateway | Exposes REST API endpoints |
| AWS Lambda | Executes backend logic |
| Amazon S3 | Stores uploaded images |
| Amazon Rekognition | Detects labels in uploaded images |
| Amazon DynamoDB | Stores image metadata and labels |
| AWS IAM | Manages permissions between services |

---

# Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- AWS Lambda
- Amazon API Gateway

### Cloud Services

- Amazon S3
- Amazon DynamoDB
- Amazon Rekognition
- AWS IAM

### Deployment

- Vercel

---

# Project Structure

```text
photo-tagger/
│
├── backend/
│
├── docs/
│   ├── app/
│   ├── architecture/
│   └── aws/
│
├── public/
├── src/
│
├── package.json
├── vite.config.js
└── README.md
```

---

# Getting Started

### Clone Repository

```bash
git clone https://github.com/kabirjuneja/photo-tagger.git
```

### Move into the Project

```bash
cd photo-tagger
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file in the root directory.

```env
VITE_API_BASE_URL=https://obx6hrco7j.execute-api.ap-south-1.amazonaws.com/dev
```

### Start Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

---

# What I Learned

Building this project helped me understand how AWS serverless services work together to build scalable cloud applications.

During development I learned:

- Building REST APIs with Amazon API Gateway
- Writing backend logic using AWS Lambda
- Secure file uploads using pre-signed Amazon S3 URLs
- Image analysis using Amazon Rekognition
- Managing metadata with Amazon DynamoDB
- IAM roles and permissions
- Connecting a React frontend with AWS backend services
- Deploying production applications using Vercel

---

# Future Improvements

- User Authentication
- Face Recognition
- Albums and Collections
- Drag & Drop Upload
- Infinite Scrolling
- Dark Mode
- Mobile Application
- Advanced Search Filters
- Image Compression
- Shareable Image Links

---

# License

This project is licensed under the MIT License.

---

## Developer

**Kabir Juneja**

- GitHub: https://github.com/kabirjuneja
- Live Demo: https://photo-tagger-ten.vercel.app/

---

<p align="center">
⭐ If you found this project useful, consider giving it a star.
</p>
