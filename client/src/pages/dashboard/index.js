import { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  // État utilisateur
  const [user, setUser] = useState(null);
  // État pour la navigation entre onglets
  const [activeTab, setActiveTab] = useState('overview');
  // État de chargement
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        router.push('/auth/login');
        return;
      }

      try {
        // Analyser les données utilisateur
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        router.push('/auth/login');
      }
    }
  }, [router]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      
      // Si l'utilisateur est ADMIN et n'a pas d'entreprise, rediriger vers la création d'entreprise
      if (user.role === 'ADMIN' && !user.companyId) {
        router.push('/dashboard/company/create');
      }
    }
  }, []);

  const handleLogout = () => {
    // Supprimer les données d'authentification
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  // Afficher un indicateur de chargement pendant le chargement initial
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-blue-800">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      user={user} 
      onLogout={handleLogout}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <Head>
        <title>Tableau de bord | NoFlexi</title>
      </Head>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Bienvenue, {user?.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Votre rôle</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {typeof user?.role === 'object' ? user?.role.name : user?.role || 'Non défini'}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Votre entreprise</h3>
                <p className="text-lg font-semibold text-gray-800">{user?.company?.name || 'Non définie'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Admin links */}
        {user?.role === 'ADMIN' && (
          <div className="mt-4">
            <button
              onClick={() => router.push('/dashboard/company')}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 011.414 0l5 5a2 2 0 010 2.828l-5 5a2 2 0 01-2.828-2.828L16.172 12l-4.586-4.586a2 2 0 010-2.828z" />
              </svg>
              Gérer l'entreprise
            </button>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Actions rapides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <button className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition flex items-center">
              <div className="bg-indigo-100 rounded-full p-2 mr-3">
                <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Voir mes documents</span>
            </button>
            <button className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition flex items-center">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Gérer mon planning</span>
            </button>
            <button className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition flex items-center">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Historique des absences</span>
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Statistiques récentes</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">0</div>
                <div className="text-sm text-gray-500">Absences en cours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">0</div>
                <div className="text-sm text-gray-500">Documents à signer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}