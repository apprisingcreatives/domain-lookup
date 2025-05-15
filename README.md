# 🌐 Domain Lookup Tool

A modern web application built with **Next.js 15**, **React 19**, and **Tailwind CSS 4** that allows users to look up domain and contact information using the [WhoisXML API](https://whois.whoisxmlapi.com/).

---

## ✨ Features

- 🔍 Lookup domain registration & contact details
- ⚡ Fast, server-rendered UI using Next.js App Router
- 🎨 Styled with Tailwind CSS 4
- 🔐 Secure API key handling via environment variables

---

## 📦 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [WhoisXML API](https://whois.whoisxmlapi.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
- git clone https://github.com/apprisingcreatives/domain-lookup.git
- cd domain-lookup

### 2. Install dependencies
- npm install

### 3. Configure environment variables
- touch .env.local
Add your WhoisXML API key:
- WHOIS_API_KEY=your_api_key_here

### 4. Run the development server (localhost:5000)
- npm run dev


🔧 API Endpoint
Local API route: /api/lookup

Query parameters:

domain: Domain to look up (e.g., google.com)

type: Either domain or contact

Example: GET /api/lookup?domain=google.com&type=domain

📁 Project Structure
src/
  app/
    api/
      lookup/
        route.ts   ← API logic
    page.tsx       ← Main UI
  components       ← Reusable Components
  hooks            ← Custom hooks
  utils            ← helpers
tailwind.config.ts
postcss.config.js
.env.local
```
