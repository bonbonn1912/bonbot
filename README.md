# Bonbot - Twitch Bot

## Project Overview

### Features

- **Command Management:** Bonbot allows you to effortlessly add, update, and delete commands, keeping your Twitch chat engaging and informative.
- **Interactive Frontend:** Built with React and Tailwind CSS, the frontend provides a user-friendly interface for managing your bot's settings and commands.
- **Twitch OAuth Login:** Streamers can securely log in to Bonbot using Twitch OAuth, ensuring a seamless and secure connection to their Twitch account.

### Upcoming Features

- **Dashboard Integration:** Manage your commands/settings from the frontend.
- **Scheduled Commands:** Scheduled commands allow you to automate interactions and announcements in your Twitch chat, even when you're not actively monitoring the chat.
- **Shared Commands:** Collaborate with other streamers by creating and sharing commands, enhancing community engagement.

## Architecture

- **Node.js TypeScript App:** 
- **React & Tailwind Frontend:** 
- **PostgreSQL Database:** 
- **MongoDB** 
- **tmi.js**

## Getting Started

To get started with Bonbot, follow these steps:

1. Clone the repository: `git clone https://github.com/bonbonn1912/bonbot.git`
2. Install dependencies:
   ```
   cd src
   npm install
   cd src/client
   npm install
   ```
3. Set up your database configurations for PostgreSQL in `src/server/prisma/schema.prsima` (Dont forget to delete before commit).
4. Obtain Remaing credentials (Twitch, MongoDB) and update them in `.env` (naming according to `src/server/config/config.ts`.
   
5. Generate/Push your Database Schema:
   ```
   npx prisma generate

   npx prisma db push
   ```
6. Start the development server:
   ```
   cd server
   nodemon
   ```
