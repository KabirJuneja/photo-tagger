# Photo Tagger

<p align="center">
  <img src="docs/app/Home.png" width="900" alt="Photo Tagger">
</p>

<p align="center">
  <strong>AWS serverless photo management application built with React.</strong>
</p>

---

## About

I built this project to get hands-on experience with AWS serverless services by creating something practical instead of just following tutorials.

Photo Tagger allows users to upload photos, automatically detects what's inside them using Amazon Rekognition, stores the detected labels in DynamoDB, and makes the photos searchable through a clean React interface.

The main goal of this project was to understand how different AWS services work together in a real application, from generating pre-signed upload URLs to processing images with Lambda and managing metadata in DynamoDB.

---

## Features

- Upload photos directly to Amazon S3
- Automatic image labeling using Amazon Rekognition
- Search photos using filenames or detected labels
- Responsive photo gallery
- Full-screen image preview
- Download original images
- Delete uploaded photos
- Serverless backend built on AWS
- Clean and responsive user interface

---

## Live Demo

🚀 **Coming Soon**

---

# Architecture

<p align="center">
  <img src="docs/architecture/Diagram.png" width="950" alt="Architecture Diagram">
</p>

### Workflow

1. User uploads an image.
2. The frontend requests a pre-signed upload URL.
3. API Gateway invokes a Lambda function.
4. Lambda generates a pre-signed S3 upload URL.
5. The image is uploaded directly to Amazon S3.
6. S3 triggers another Lambda function.
7. Amazon Rekognition analyzes the uploaded image.
8. Labels and image metadata are stored in DynamoDB.
9. The frontend retrieves the metadata through API Gateway.
10. Users can search, preview, download, or delete photos.

---

# Screenshots

## Home

<p align="center">
  <img src="docs/app/Home.png" width="900">
</p>

The landing page where users can upload photos and access the gallery.

---

## Upload

<p align="center">
  <img src="docs/app/upload.png" width="900">
</p>

Uploading an image directly to Amazon S3 using a pre-signed URL.

---

## Gallery

<p align="center">
  <img src="docs/app/gallery.png" width="900">
</p>

All uploaded photos are displayed in a responsive gallery.

---

## Search

<p align="center">
  <img src="docs/app/search.png" width="900">
</p>

Search photos using filenames or labels detected by Amazon Rekognition.

---

## Photo Preview

<p align="center">
  <img src="docs/app/modal.png" width="900">
</p>

Preview images in full screen and download or delete them.

---

## Delete Confirmation

<p align="center">
  <img src="docs/app/delete-confirmation.png" width="900">
</p>

Confirmation dialog before permanently deleting a photo.

---

# AWS Services Used

## Amazon API Gateway

<p align="center">
  <img src="docs/aws/API-Gateway.png" width="900">
</p>

Handles communication between the frontend and the backend.

---

## AWS Lambda

<p align="center">
  <img src="docs/aws/Lambda.png" width="900">
</p>

Processes uploads, retrieves photo metadata, and manages photo deletion.

---

## Amazon S3

<p align="center">
  <img src="docs/aws/S3.png" width="900">
</p>

Stores uploaded images securely.

---

## Amazon DynamoDB

<p align="center">
  <img src="docs/aws/DynamoDB.png" width="900">
</p>

Stores image metadata and labels for searching.

---

## AWS IAM

<p align="center">
  <img src="docs/aws/IAM.png" width="900">
</p>

Manages secure permissions between AWS services.

---

# Technologies Used

### Frontend

- React
- Vite
- JavaScript
- CSS

### AWS Services

- Amazon S3
- AWS Lambda
- Amazon API Gateway
- Amazon Rekognition
- Amazon DynamoDB
- AWS IAM

---

# Project Structure

```text
photo-tagger/
│
├── backend/
├── docs/
│   ├── app/
│   ├── architecture/
│   └── aws/
├── public/
├── src/
├── package.json
├── vite.config.js
└── README.md
```

---

# Getting Started

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/photo-tagger.git
```

Go to the project directory

```bash
cd photo-tagger
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Create a `.env` file and add your API Gateway endpoint.

```env
VITE_API_BASE_URL=YOUR_API_GATEWAY_URL
```

---

# What I Learned

Building this project helped me understand how AWS serverless services work together in a real application. Before this project, I had only used these services individually. Connecting S3, Lambda, API Gateway, DynamoDB, and Rekognition into a complete workflow gave me a much better understanding of AWS.

I also improved my React skills while building a cleaner and more responsive frontend.

---

# Future Improvements

- User authentication
- Face recognition
- Albums and collections
- Infinite scrolling
- Drag-and-drop uploads
- Dark mode
- Better search filters

---

## Author

**Kabir Juneja**

GitHub: https://github.com/kabirjuneja

---

If you have any suggestions or find any issues, feel free to open an issue or submit a pull request.
