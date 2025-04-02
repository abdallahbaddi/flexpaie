// d:\work\noflexi\client\src\pages\dashboard\company.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function Company() {
  const [companyData, setCompanyData] = useState({
    name: '',
    iceNumber: '',
    registryNumber: '',
    address: '',
    activitySector: '',
    employeeCount: 1
  });
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyError, setCompanyError] = useState('');
  const [companySuccess, setCompanySuccess] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Récupérer les données utilisateur
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Si l'utilisateur est ADMIN et a une entreprise, charger les détails
      if (parsedUser.role === 'ADMIN' && parsedUser.companyId) {
        fetchCompanyDetails(parsedUser.companyId);
      }
    }
  }, []);
  
  const fetchCompanyDetails = async (companyId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/companies/${companyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Impossible de récupérer les informations de l\'entreprise');
      }

      const data = await response.json();
      setCompanyData({
        name: data.name || '',
        iceNumber: data.iceNumber || '',
        registryNumber: data.registryNumber || '',
        address: data.address || '',
        activitySector: data.activitySector || '',
        employeeCount: data.employeeCount || 1
      });
    } catch (error) {
      console.error('Erreur:', error);
      setCompanyError(error.message);
    }
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: name === 'employeeCount' ? parseInt(value, 10) || 0 : value
    });
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setCompanyLoading(true);
    setCompanyError('');
    setCompanySuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/companies/${user.companyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(companyData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour de l\'entreprise');
      }

      setCompanySuccess('Informations de l\'entreprise mises à jour avec succès');
      
      // Mettre à jour les informations de l'entreprise dans le localStorage
      /*const userData = JSON.parse(localStorage.getItem('user'));
      userData.company.name = companyData.name;
      localStorage.setItem('user', JSON.stringify(userData));*/
      
      // Mettre à jour l'état de l'utilisateur
      //setUser(userData);
      
    } catch (error) {
      setCompanyError(error.message);
    } finally {
      setCompanyLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Mon entreprise | NoFlexi</title>
      </Head>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations de l'entreprise</h2>
        
        {companyError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {companyError}
            </p>
          </div>
        )}
        
        {companySuccess && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-200">
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {companySuccess}
            </p>
          </div>
        )}
        
        <form onSubmit={handleCompanySubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
              <input
                id="name"
                name="name"
                type="text"
                value={companyData.name}
                onChange={handleCompanyChange}
                required
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
                onChange={handleCompanyChange}
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
                onChange={handleCompanyChange}
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
                onChange={handleCompanyChange}
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
              onChange={handleCompanyChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="activitySector" className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité</label>
            <select
              id="activitySector"
              name="activitySector"
              value={companyData.activitySector}
              onChange={handleCompanyChange}
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
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={companyLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center"
            >
              {companyLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enregistrement...
                </>
              ) : (
                'Enregistrer les modifications'
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}