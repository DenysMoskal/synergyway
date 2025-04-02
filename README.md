# Company Dashboard

An interactive React application for displaying company information in a mosaic layout.

## Features

- Responsive dashboard with resizable panels
- Company information widgets
- Data fetched from a simulated API
- Interactive charts and graphs
- Add and remove companies from the dashboard

## Getting Started

### Local Development

#### Prerequisites

- Node.js (v14 or later)
- npm or yarn

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/company-dashboard.git
   cd company-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Start the API server (required for data fetching):

   ```bash
   npm run server
   # or
   yarn server
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Running with Docker

#### Prerequisites

- Docker
- Docker Compose

#### Using Docker Compose

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/company-dashboard.git
   cd company-dashboard
   ```

2. Start the application with Docker Compose:

   ```bash
   docker-compose up
   ```

3. Open your browser and navigate to `http://localhost:3000`

#### Building and Running Docker Image Manually

1. Build the Docker image:

   ```bash
   docker build -t company-dashboard .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:80 company-dashboard
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run server` - Start API server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run preview` - Preview production build locally
