# Chat App

A modern chat application built with Next.js, featuring authentication and real-time messaging capabilities.

## Features

- 🔐 **Authentication System**
  - User registration and login
  - NextAuth.js with Credentials provider
  - Session management
  
- 💬 **Chat Interface**
  - Clean, modern UI with Neobrutalism design
  - Responsive layout
  - User-friendly forms

- 🛠 **Technical Stack**
  - **Frontend**: Next.js 16 with App Router, TypeScript, Tailwind CSS
  - **Backend**: API Routes, Prisma ORM
  - **Database**: SQLite (development)
  - **Authentication**: NextAuth.js
  - **Styling**: Custom Neobrutalism CSS components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/timetake/chat-app.git
cd chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /api/ping` - Health check
- `POST /api/auth/register` - User registration
- `GET /api/auth/register` - Registration endpoint info
- `/api/auth/[...nextauth]` - NextAuth endpoints

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── chat/         # Chat page
│   ├── globals.css   # Global styles
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home/Login page
├── components/       # React components
├── lib/             # Utility libraries
└── types/           # TypeScript definitions
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-nextauth-secret"
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).