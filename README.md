# PostRelay - Order Tracking & Notifications Simulator

A demo ecommerce automation platform that triggers SMS/email updates when order status changes. Showcases conversational commerce and webhook integration capabilities.

## Features

- **Order Simulation**: Create and manage simulated orders with different statuses
- **Real-time Notifications**: Automatic SMS/email notifications when order status changes
- **Webhook Integration**: Demonstrates webhook handling and processing
- **Analytics Dashboard**: Track metrics and notification performance
- **Modern UI**: Built with React and shadcn-ui components

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **React** - Modern UI library
- **shadcn-ui** - Beautiful and accessible UI components
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
```

2. Navigate to the project directory:
```sh
cd post-relay
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn-ui components
│   ├── MetricsDashboard.tsx
│   ├── NotificationPreview.tsx
│   ├── OrderSimulator.tsx
│   └── WebhookDashboard.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Page components
```

## Deployment

This project can be deployed to any static hosting service like:

- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront

Build the project with `npm run build` and deploy the `dist` folder.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).