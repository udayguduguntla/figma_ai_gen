// Design templates for different app types
const designTemplates = {
  'e-commerce': {
    screens: [
      'splash', 'onboarding', 'login', 'register', 'home', 'categories',
      'product-list', 'product-detail', 'cart', 'checkout', 'payment',
      'order-confirmation', 'profile', 'orders', 'wishlist', 'search',
      'reviews', 'shipping', 'returns', 'support', 'notifications'
    ],
    components: [
      'Button', 'Input', 'Card', 'ProductCard', 'CartItem', 'Header',
      'Navigation', 'SearchBar', 'Filter', 'Pagination', 'Rating',
      'PriceTag', 'Badge', 'Modal', 'Drawer', 'Tabs', 'Accordion'
    ],
    userFlows: [
      'User Registration', 'Product Discovery', 'Purchase Flow',
      'Account Management', 'Order Tracking', 'Return Process'
    ]
  },
  'social': {
    screens: [
      'splash', 'onboarding', 'login', 'register', 'feed', 'profile',
      'create-post', 'messages', 'notifications', 'search', 'settings',
      'friends', 'groups', 'events', 'stories', 'live', 'discover'
    ],
    components: [
      'Button', 'Input', 'Card', 'PostCard', 'UserCard', 'Header',
      'Navigation', 'SearchBar', 'MessageBubble', 'Avatar', 'Badge',
      'Modal', 'Drawer', 'Tabs', 'InfiniteScroll', 'Camera'
    ],
    userFlows: [
      'User Onboarding', 'Content Creation', 'Social Interaction',
      'Messaging', 'Profile Management', 'Privacy Settings'
    ]
  },
  'productivity': {
    screens: [
      'splash', 'onboarding', 'login', 'register', 'dashboard', 'projects',
      'tasks', 'calendar', 'team', 'settings', 'reports', 'files',
      'chat', 'video-call', 'notes', 'time-tracking', 'billing'
    ],
    components: [
      'Button', 'Input', 'Card', 'TaskCard', 'ProjectCard', 'Header',
      'Sidebar', 'Calendar', 'Kanban', 'Table', 'Chart', 'Modal',
      'Dropdown', 'DatePicker', 'FileUpload', 'ProgressBar'
    ],
    userFlows: [
      'Project Setup', 'Task Management', 'Team Collaboration',
      'Time Tracking', 'Reporting', 'File Management'
    ]
  },
  'fitness': {
    screens: [
      'splash', 'onboarding', 'login', 'register', 'home', 'workouts',
      'exercises', 'nutrition', 'progress', 'social', 'challenges',
      'profile', 'settings', 'goals', 'calendar', 'stats', 'shop'
    ],
    components: [
      'Button', 'Input', 'Card', 'WorkoutCard', 'ExerciseCard', 'Header',
      'Navigation', 'ProgressRing', 'Chart', 'Timer', 'Counter',
      'Modal', 'Tabs', 'Calendar', 'VideoPlayer', 'Camera'
    ],
    userFlows: [
      'Goal Setting', 'Workout Planning', 'Exercise Tracking',
      'Nutrition Logging', 'Progress Monitoring', 'Social Sharing'
    ]
  }
};

const colorPalettes = {
  modern: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#10B981',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#111827'
  },
  minimal: {
    primary: '#000000',
    secondary: '#6B7280',
    accent: '#F59E0B',
    background: '#FFFFFF',
    surface: '#F3F4F6',
    text: '#374151'
  },
  playful: {
    primary: '#EC4899',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    background: '#FFFBEB',
    surface: '#FEF3C7',
    text: '#92400E'
  },
  professional: {
    primary: '#1E40AF',
    secondary: '#374151',
    accent: '#059669',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1F2937'
  }
};

const typographyStyles = {
  modern: {
    fontFamily: 'Inter, sans-serif',
    headingWeight: 700,
    bodyWeight: 400
  },
  minimal: {
    fontFamily: 'Helvetica Neue, sans-serif',
    headingWeight: 300,
    bodyWeight: 300
  },
  playful: {
    fontFamily: 'Poppins, sans-serif',
    headingWeight: 600,
    bodyWeight: 400
  },
  professional: {
    fontFamily: 'Source Sans Pro, sans-serif',
    headingWeight: 600,
    bodyWeight: 400
  }
};

module.exports = {
  designTemplates,
  colorPalettes,
  typographyStyles
};