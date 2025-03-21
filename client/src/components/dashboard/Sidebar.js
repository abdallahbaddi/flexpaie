// d:\work\noflexi\client\src\components\dashboard\Sidebar.js
import Link from 'next/link';

export default function Sidebar({ user, currentPath }) {
  const isActive = (path) => {
    return currentPath === path;
  };

  return (
    <div className="w-full md:w-64 flex-none">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <h2 className="text-lg font-semibold">Tableau de bord</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Link 
                href="/dashboard"
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className={`mr-3 h-5 w-5 ${isActive('/dashboard') ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Aperçu
              </Link>
            </li>
            
            {/* Ajouter un élément de menu pour la gestion de l'entreprise (visible uniquement pour les admins) */}
            {user?.role === 'ADMIN' && (
              <li>
                <Link 
                  href="/dashboard/company"
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive('/dashboard/company')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className={`mr-3 h-5 w-5 ${isActive('/dashboard/company') ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Mon entreprise
                </Link>
              </li>
            )}

            {/* Afficher la gestion des employés uniquement pour les admins */}
            {user?.role === 'ADMIN' && (
              <li>
                <Link 
                  href="/dashboard/employees"
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive('/dashboard/employees')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className={`mr-3 h-5 w-5 ${isActive('/dashboard/employees') ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Mes employés
                </Link>
              </li>
            )}
            
            <li>
              <Link 
                href="/dashboard/profile"
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/profile')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className={`mr-3 h-5 w-5 ${isActive('/dashboard/profile') ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mon profil
              </Link>
            </li>
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
  );
}