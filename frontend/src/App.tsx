import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { Footer } from './components/Layout/Footer';
import { useAppStore } from './store/useAppStore';

// Lazy load tab components for code splitting
const OverviewTab = lazy(() =>
  import('./components/Tabs/OverviewTab').then((module) => ({ default: module.OverviewTab }))
);
const ResourcesTab = lazy(() =>
  import('./components/Tabs/ResourcesTab').then((module) => ({ default: module.ResourcesTab }))
);
const AutomationTab = lazy(() =>
  import('./components/Tabs/AutomationTab').then((module) => ({ default: module.AutomationTab }))
);
const SocialTab = lazy(() =>
  import('./components/Tabs/SocialTab').then((module) => ({ default: module.SocialTab }))
);
const EnvironmentTab = lazy(() =>
  import('./components/Tabs/EnvironmentTab').then((module) => ({ default: module.EnvironmentTab }))
);
const PrinciplesTab = lazy(() =>
  import('./components/Tabs/PrinciplesTab').then((module) => ({ default: module.PrinciplesTab }))
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const activeTab = useAppStore((state) => state.activeTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'resources':
        return <ResourcesTab />;
      case 'automation':
        return <AutomationTab />;
      case 'social':
        return <SocialTab />;
      case 'environment':
        return <EnvironmentTab />;
      case 'principles':
        return <PrinciplesTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Header />
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<LoadingSpinner />}>{renderTabContent()}</Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
