import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function CreateCompany() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [companyData, setCompanyData] = useState({
    name: '',
    iceNumber: '',
    registryNumber: '',
    address: '',
    activitySector: '',
    employeeCount: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Récupérer les données utilisateur au chargement de la page
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const handleLogout = () => {
    // Supprimer les données d'authentification
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: name === 'employeeCount' ? parseInt(value, 10) || 0 : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Créer l'entreprise
      const response = await fetch('http://localhost:3001/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(companyData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création de l\'entreprise');
      }

      const newCompany = await response.json();
      
      // Associer l'entreprise à l'utilisateur
      const userUpdateResponse = await fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          companyId: newCompany.id
        })
      });

      console.log(userUpdateResponse);

      if (!userUpdateResponse.ok) {
        throw new Error('Impossible d\'associer l\'entreprise à votre compte');
      }
      
      // Mettre à jour les informations utilisateur dans localStorage
      const updatedUserData = await userUpdateResponse.json();
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      // Rediriger vers le dashboard
      router.push('/dashboard');
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Afficher un indicateur de chargement pendant le chargement initial
  if (!user) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Créer votre entreprise | FlexPaie</title>
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">FlexPaie</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Bienvenue, {user?.name}</h2>
          <p className="mb-6 text-gray-600">
            Pour continuer à utiliser FlexPaie, veuillez créer votre entreprise. Ces informations sont nécessaires pour configurer votre compte.
          </p>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise*</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={companyData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="iceNumber" className="block text-sm font-medium text-gray-700 mb-1">Numéro ICE</label>
                <input
                  id="iceNumber"
                  name="iceNumber"
                  type="text"
                  value={companyData.iceNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="registryNumber" className="block text-sm font-medium text-gray-700 mb-1">Registre du Commerce (RC)</label>
                <input
                  id="registryNumber"
                  name="registryNumber"
                  type="text"
                  value={companyData.registryNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-1">Nombre d'employés</label>
                <input
                  id="employeeCount"
                  name="employeeCount"
                  type="number"
                  min="1"
                  value={companyData.employeeCount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse de l'entreprise</label>
              <textarea
                id="address"
                name="address"
                rows="2"
                value={companyData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="activitySector" className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité</label>
              <select
                id="activitySector"
                name="activitySector"
                value={companyData.activitySector}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionnez un secteur</option>
                <option value="Technologies">Technologies</option>
                <option value="Finance">Finance</option>
                <option value="Santé">Santé</option>
                <option value="Éducation">Éducation</option>
                <option value="Commerce">Commerce</option>
                <option value="Industrie">Industrie</option>
                <option value="Services">Services</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création en cours...
                  </>
                ) : (
                  'Créer mon entreprise'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FlexPaie. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}