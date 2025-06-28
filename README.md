# Travel Experience App 🌍✈️

A driven travel experience app that asks users not just where they're going, but **why they're going**. This is a fully functional, backend-free prototype built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

Visit the live app: [https://github.com/bittucreator/travelapp](https://github.com/bittucreator/travelapp)

## ✨ Features

### 🏠 **Landing Page**
- Modern hero section with compelling messaging
- Clean call-to-action leading to onboarding
- Responsive design with mobile-first approach

### 📝 **10-Step Onboarding Flow**
1. **Name Collection** - Personalized greeting
2. **Destination Input** - Where are you going?
3. **Travel Dates** - With automatic duration calculation
4. **Travel Reasons** - Multi-select with custom input option
5. **Vibes Selection** - Adventure, luxury, calm, creative, etc.
6. **Interests Grid** - Photography, food, art, music, etc.
7. **Travel Company** - Solo, partner, friends, family
8. **Travel Style** - Planner vs spontaneous
9. **Summary Screen** - Review all choices before processing
10. **AI Processing** - Dynamic recommendations generation

### 🎯 **AI-Powered Processing**
- Real-time ruleset matching user preferences to recommendations
- Generates personalized suggestions for stays, activities, food, etc.
- Animated progress with live feedback

### 📊 **Dashboard**
- Overview of all user preferences
- AI-generated recommendations in color-coded cards
- Quick action buttons for common tasks

### 📋 **Detailed Trip Plan Page**
1. **Welcome Section** - Personalized greeting with destination
2. **Stay Recommendations** - 2-3 options based on preferences
3. **Work & Chill Spots** - Morning coffee & afternoon work locations
4. **Daily Flow** - Morning/afternoon/evening activities with tips
5. **Food Spots** - 5-6 recommendations matched to preferences
6. **Events/Meetups** - Activities matching travel dates and interests
7. **Hidden Gems** - Photo spots and local secrets
8. **Pre-Travel Checklist** - Essential items + local tips

### 📱 **Action Features**
- **📄 Download as PDF** - Print-friendly trip plan export
- **📧 Email Plan** - Share via email with pre-filled content
- **🔗 Share with Friends** - Web Share API with clipboard fallback
- **🗺️ Open in Google Maps** - Direct destination links
- **🏨 Book Stay** - Email signup for booking updates
- **📅 Save to Calendar** - Google Calendar integration

### 💌 **Re-Engagement Features**
- Email popup with compelling benefits
- Loading animations and success feedback
- Future upsell and remarketing foundation

## 🎨 Design Guidelines

- **Color Scheme**: Black, white, and blue only
- **Typography**: Modern, clean fonts with proper hierarchy
- **Layout**: Mobile-first responsive design
- **Components**: Reusable, type-safe React components
- **UX**: Smooth transitions and intuitive flow

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **React 19** - Latest React features
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Landing page with hero section
│   ├── globals.css             # Global styles and themes
│   ├── dashboard/
│   │   └── page.tsx            # User dashboard with recommendations
│   ├── onboarding/
│   │   ├── page.tsx            # Onboarding flow controller
│   │   └── components/         # Individual question components
│   │       ├── NameQuestion.tsx
│   │       ├── DestinationQuestion.tsx
│   │       ├── DateQuestion.tsx
│   │       ├── ReasonQuestion.tsx
│   │       ├── VibeQuestion.tsx
│   │       ├── InterestQuestion.tsx
│   │       ├── CompanyQuestion.tsx
│   │       ├── StyleQuestion.tsx
│   │       ├── SummaryScreen.tsx
│   │       └── ProcessingStage.tsx
│   └── trip-plan/
│       └── page.tsx            # Detailed trip plan page
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bittucreator/travelapp.git
   cd travelapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Key Features Highlights

### ✅ **Fully Functional Prototype**
- No backend required - uses localStorage for data persistence
- Complete user flow from landing to detailed plan
- All interactive features working

### ✅ **Responsive Design**
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interactions

### ✅ **Modern UX**
- Smooth animations and transitions
- Loading states and feedback
- Intuitive navigation flow

### ✅ **Business Ready**
- Email collection for remarketing
- Social sharing for viral growth
- Foundation for booking integrations
- Analytics-ready structure

## 🎯 Future Enhancements

- Real booking API integrations
- Payment processing
- User accounts and trip history
- Real-time notifications
- Advanced AI recommendations
- Social features and trip sharing

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Bittu** - [@bittucreator](https://github.com/bittucreator)

---

**Ready to plan your next adventure?** 🚀 Try the app and experience the future of travel planning!

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
