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

1. **Clone the repo**
   - Run: `git clone https://github.com/apprisingcreatives/domain-lookup.git`
   - Then: `cd domain-lookup`
2. **Install dependencies**
   - Run: `npm install`
3. **Configure environment variables**
   - Create the file: `.env.local`
   - Add your API key:  
     `WHOIS_API_KEY=your_api_key_here`
4. **Run the development server (localhost:5000)**
   - Run: `npm run dev`

🔧 API Endpoint
Local API route: /api/lookup

Query parameters:

domain: Domain to look up (e.g., google.com)

type: Either domain or contact

Example: GET /api/lookup?domain=google.com&type=domain


Production link: https://domain-lookup-three.vercel.app/


