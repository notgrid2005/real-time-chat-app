# 💬 Real-Time Chat App

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

A full-stack real-time chat application using Socket.io, Express, and vanilla JS.

## Features
- Real-time messaging with WebSockets
- Join/leave notifications
- Typing indicators
- Online user count
- Clean, modern dark UI

## Quick Start
```bash
npm install
npm start
# Open http://localhost:3000
```

## Project Structure
```
real-time-chat-app/
├── server.js           # Express + Socket.io server
├── public/
│   ├── index.html      # Chat UI
│   ├── style.css       # Dark theme styles
│   └── app.js          # Client-side Socket.io logic
├── package.json
└── README.md
```
