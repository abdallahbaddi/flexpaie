import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DashboardLayout({ children, user, onLogout, activeTab, setActiveTab }) {
  const router = useRouter();
  
  // Navigation helper
  const navigateTo = (path) => {
    router.push(`/dashboard${path === 'overview' ? '' : '/' + path}`);
    if (setActiveTab) {
      setActiveTab(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* En-tête */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <h1 className="text-xl font-bold text-blue-600 cursor-pointer">NoFlexi</h1>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <span className="hidden md:inline-block text-sm text-gray-700 mr-2">{user?.name}</span>
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800 transition"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Barre latérale de navigation */}
          <div className="w-full md:w-64 flex-none">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <h2 className="text-lg font-semibold">Tableau de bord</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => navigateTo('overview')}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === 'overview' || router.pathname === '/dashboard'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <svg className={`mr-3 h-5 w-5 ${activeTab === 'overview' || router.pathname === '/dashboard' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Aperçu
                    </button>
                  </li>
                  
                  {/* Menu de gestion de l'entreprise (visible uniquement pour les admins) */}
                  {user?.role === 'ADMIN' && (
                    <li>
                      <button
                        onClick={() => navigateTo('company')}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeTab === 'company' || router.pathname === '/dashboard/company'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <svg className={`mr-3 h-5 w-5 ${activeTab === 'company' || router.pathname === '/dashboard/company' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Mon entreprise
                      </button>
                    </li>
                  )}
                  
                  <li>
                    <button
                      onClick={() => navigateTo('profile')}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === 'profile' || router.pathname === '/dashboard/profile'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <svg className={`mr-3 h-5 w-5 ${activeTab === 'profile' || router.pathname === '/dashboard/profile' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mon profil
                    </button>
                  </li>
                  
                  {user?.role === 'ADMIN' && (
                    <li>
                      <button
                        onClick={() => navigateTo('employees')}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeTab === 'employees' || router.pathname === '/dashboard/employees'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <svg className={`mr-3 h-5 w-5 ${activeTab === 'employees' || router.pathname === '/dashboard/employees' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Mes employés
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            
            {/* Bloc d'information */}
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">Besoin d'aide?</h3>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>Notre équipe est disponible 24/7 pour vous assister.</p>
                    <a href="#" className="text-blue-600 hover:text-blue-500 font-medium block mt-1">
                      Contact support →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Zone de contenu principale */}
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </main>
      
      {/* Pied de page */}
      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 py-6">
            <p className="text-sm text-center text-gray-500">
              &copy; {new Date().getFullYear()} NoFlexi. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}