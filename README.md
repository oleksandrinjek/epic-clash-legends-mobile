# Epic Clash Legends Mobile

A mobile game built with React, TypeScript, and Capacitor, featuring hero battles, progression systems, and cloud save functionality powered by Supabase.

## Features

- 🎮 **Hero Battle System** - Strategic turn-based combat with unique abilities
- 🏆 **Progression System** - Level up, gain experience, and unlock new heroes
- 🛒 **Shop & Inventory** - Purchase items and manage your collection
- 💾 **Cloud Save** - Progress automatically saved to Supabase
- 📱 **Mobile Ready** - Built with Capacitor for cross-platform deployment
- 🎨 **Modern UI** - Beautiful interface built with shadcn/ui components

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Mobile**: Capacitor 7
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Context + Custom Hooks
- **Form Handling**: React Hook Form + Zod validation

## Quick Start

### Prerequisites

- Node.js 18+ and npm/bun
- Supabase account (free tier available)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd epic-clash-legends-mobile
npm install
```

### 2. Set up Supabase

**Option A: Interactive Setup (Recommended)**
```bash
npm run setup:supabase
```

**Option B: Manual Setup**
1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Get your credentials** from Project Settings > API
3. **Create environment file**:
   ```bash
   cp env.example .env
   ```
4. **Add your Supabase credentials** to `.env`:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. Set up Database

1. **Go to your Supabase project** > SQL Editor
2. **Run the schema** from `supabase-schema.sql`
3. **Verify tables** are created in the Table Editor

### 4. Run the Game

```bash
# Development
npm run dev

# Build for mobile
npm run build
npx cap sync
npx cap open android  # or ios
```

## Database Schema

The game uses the following Supabase tables:

- **`players`** - Basic player information
- **`player_progress`** - Level, experience, coins, wins/losses
- **`player_inventory`** - Items and quantities
- **`player_heroes`** - Owned heroes with full character data
- **`game_sessions`** - Game state snapshots

## Game Features

### Battle System
- Turn-based combat with energy management
- Special abilities with cooldowns
- Strategic item usage during battles

### Progression
- Experience points and leveling
- Coin rewards for victories
- Hero recruitment system

### Inventory Management
- Purchase items from the shop
- Use items to boost character stats
- Automatic quantity tracking

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── game/           # Game-specific components
│   └── ui/             # Reusable UI components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utilities and services
│   ├── database.ts     # Supabase database service
│   └── supabase.ts     # Supabase client config
├── pages/              # Game pages/routes
└── types/              # TypeScript type definitions
```

### Key Hooks

- **`useGame`** - Main game state and actions
- **`usePlayerPersistence`** - Database operations and authentication
- **`useToast`** - User notifications

### Adding New Features

1. **Update types** in `src/types/game.ts`
2. **Add database methods** in `src/lib/database.ts`
3. **Extend context** in `src/context/GameContext.tsx`
4. **Create components** in `src/components/game/`

## Deployment

### Web
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Mobile
```bash
npm run build
npx cap sync
npx cap build android  # or ios
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Project info

**URL**: https://lovable.dev/projects/87248497-8015-421f-89b4-1a5bcde148fa

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/87248497-8015-421f-89b4-1a5bcde148fa) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/87248497-8015-421f-89b4-1a5bcde148fa) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
