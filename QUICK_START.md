# 🚀 Quick Start Guide

Get your AI Figma Generator running in 3 simple steps!

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

## Installation

### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd figma-ai-generator

# Run automated setup
npm run setup

# Start the application
npm start
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# Start the application
npm start
```

## 🎯 Usage

1. **Open your browser** to `http://localhost:3000`

2. **Enter your app idea** in the prompt box, for example:
   - "A modern e-commerce app for selling books with user reviews and recommendations"
   - "Social media platform for photographers with portfolio sharing"
   - "Productivity app for remote teams with task management and video calls"

3. **Choose your preferences**:
   - Design Style: Modern, Minimal, Playful, or Professional
   - Platform Focus: Mobile First, Desktop First, or Fully Responsive
   - Complexity: Basic (15 screens), Standard (35 screens), or Comprehensive (75+ screens)

4. **Click "Generate Design"** and wait for the AI to create your complete design system

5. **Export to Figma** (optional):
   - Get your Figma personal access token from Figma → Settings → Account
   - Click "Export to Figma" in the generated design
   - Enter your token and export

## 🔧 Configuration

### OpenAI API (Optional)
The app works without OpenAI API key using intelligent fallback generation. To enable AI-powered generation:

1. Get an OpenAI API key from https://platform.openai.com/
2. Add it to `backend/.env`:
   ```
   OPENAI_API_KEY=your_key_here
   ```
3. Restart the application

### Figma Integration
1. Go to Figma → Settings → Account
2. Scroll to "Personal access tokens"
3. Click "Create new token"
4. Use this token when exporting designs

## 🧪 Testing

Test the API to make sure everything works:
```bash
npm run test:api
```

## 📁 What You Get

For each app idea, the generator creates:

### Screens (15-75+ depending on complexity)
- Authentication flows (login, register, forgot password)
- Onboarding sequences
- Main application screens
- Settings and configuration
- Admin panels (for complex apps)
- Error and empty states

### Components
- Buttons, inputs, cards, modals
- Navigation elements
- Data display components
- Form components
- App-specific components (ProductCard, UserProfile, etc.)

### Design System
- Color palettes (primary, secondary, accent, neutrals)
- Typography scales and weights
- Spacing and layout grids
- Border radius and shadows
- Component variants and states

### User Flows
- Complete user journeys
- Step-by-step interactions
- Screen transitions

## 🎨 Example Outputs

### E-commerce App
- 45+ screens including product catalog, shopping cart, checkout, user profiles, order tracking, admin dashboard
- Components: ProductCard, CartItem, PriceTag, Rating, Filter
- Color scheme optimized for trust and conversion

### Social Media App
- 35+ screens including feed, profiles, messaging, content creation, discovery
- Components: PostCard, UserCard, MessageBubble, LikeButton
- Vibrant color scheme for engagement

### Productivity App
- 50+ screens including dashboard, projects, tasks, team management, reports
- Components: TaskCard, ProjectCard, Calendar, Chart, FileUpload
- Professional color scheme for focus

## 🚨 Troubleshooting

### "Cannot find module" errors
```bash
npm run setup
```

### Backend not starting
- Check if port 5000 is available
- Look for errors in the terminal
- Try `cd backend && npm run dev` separately

### Frontend not starting
- Check if port 3000 is available
- Try `cd frontend && npm run dev` separately

### API connection issues
- Make sure backend is running on port 5000
- Check browser console for CORS errors
- Verify `NEXT_PUBLIC_API_URL` in frontend/.env.local

### Figma export not working
- Verify your Figma access token is valid
- Check token permissions in Figma settings
- Note: Figma API has limitations, some features are simulated

## 💡 Tips

- **Start Simple**: Try basic prompts first, then move to complex applications
- **Be Specific**: Include details like "with user authentication" or "admin dashboard"
- **Experiment**: Try different design styles and complexity levels
- **No API Key Needed**: The app works great without OpenAI API key
- **Mobile First**: Most generated designs are optimized for mobile-first approach

## 🆘 Need Help?

1. Check the main README.md for detailed documentation
2. Run `npm run test:api` to verify your setup
3. Look at the example prompts in the app
4. Check the browser console for error messages

---

**Happy Designing! 🎨**