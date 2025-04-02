import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DashboardLayout from '../../layouts/DashboardLayout';
import Link from 'next/link';

export default function AddEmployee() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'SALARIE', // Par défaut, le rôle est "Salarié"
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('Form data:', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
  
      if (!userData.companyId) {
        throw new Error('Aucune entreprise associée à votre compte.');
      }
  
      // Préparer les données pour l'utilisateur et l'employé
      const payload = {
        company : {
            companyId: userData.companyId,
        },
        user: {
            name : formData.firstName + ' ' + formData.lastName,
            email: formData.email,
            password: formData.password || 'defaultPassword123', // Générer un mot de passe par défaut si nécessaire
            role: formData.role || 'SALARIE',
        },
        employee: {
            nationalId: formData.nationalId,
            lastName: formData.lastName,
            firstName: formData.firstName,
            birthDate: formData.birthDate,
            birthPlace: formData.birthPlace,
            gender: formData.gender || 'Male',
            maritalStatus: formData.maritalStatus || 'Single',
            childrenCount: formData.childrenCount,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            employeeNumber: formData.employeeNumber,
            hireDate: formData.hireDate,
            jobTitle: formData.jobTitle,
            department: formData.department,
            contractType: formData.contractType || 'Permanent',
            baseSalary: formData.baseSalary,
            paymentMethod: formData.payementMethod || 'Bank Transfer',
            companyId: userData.companyId, // Associer l'employé à l'entreprise
        },
      };
  
      console.log('Payload:', payload);
      // Envoyer la requête au backend
      const response = await fetch(`http://localhost:3001/api/users/employees-with-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout de l\'employé et de l\'utilisateur.');
      }
  
      setSuccess('Employé et utilisateur ajoutés avec succès.');
      setTimeout(() => {
        router.push('/dashboard/employees');
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Ajouter un employé | FlexPaie</title>
      </Head>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un employé</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-200">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informations personnelles */}
          <h3 className="text-lg font-semibold text-gray-700">Informations personnelles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            </div>
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div>
              <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">CIN</label>
              <input
                id="nationalId"
                name="nationalId"
                type="text"
                value={formData.nationalId || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Date de naissance</label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
                <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700">Lieu de naissance</label>
                <input
                id="birthPlace"
                name="birthPlace"
                type="text"
                value={formData.birthPlace || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Genre</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || 'Male'}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Male">Homme</option>
                <option value="Female">Femme</option>
                <option value="Other">Autre</option>
              </select>
            </div>
            <div>
                <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">Situation familiale</label>
                <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus || 'Single'}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                    <option value="Single">Célibataire</option>
                    <option value="Married">Marié(e)</option>
                    <option value="Divorced">Divorcé(e)</option>
                    <option value="Widowed">Veuf(ve)</option>
                </select>
            </div>
            <div>
              <label htmlFor="childrenCount" className="block text-sm font-medium text-gray-700">Nombre d'enfants</label>
              <input
                id="childrenCount"
                name="childrenCount"
                type="number"
                min="0"
                value={formData.childrenCount || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Informations professionnelles */}
          <h3 className="text-lg font-semibold text-gray-700">Informations professionnelles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="employeeNumber" className="block text-sm font-medium text-gray-700">Numéro de matricule</label>
              <input
                id="employeeNumber"
                name="employeeNumber"
                type="text"
                value={formData.employeeNumber || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
                <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">Date d'embauche</label>
                <input
                    id="hireDate"
                    name="hireDate"
                    type="date"
                    value={formData.hireDate || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Poste</label>
                <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={formData.jobTitle || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Département</label>
                <input
                    id="department"
                    name="department"
                    type="text"
                    value={formData.department || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div>
                <label htmlFor="contractType" className="block text-sm font-medium text-gray-700">Type de contrat</label>
                <select
                    id="contractType"
                    name="contractType"
                    value={formData.contractType || 'Permanent'}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                    <option value="Permanent">CDI</option>
                    <option value="Temporary">CDD</option>
                    <option value="Internship">Stage</option>
                    <option value="Freelance">Freelance</option>
                </select>
            </div>
            <div>
                <label htmlFor="baseSalary" className="block text-sm font-medium text-gray-700">Salaire de base</label>
                <input
                    id="baseSalary"
                    name="baseSalary"
                    type="number"
                    min="0"
                    value={formData.baseSalary || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div>
                <label htmlFor="contractType" className="block text-sm font-medium text-gray-700">Type de contrat</label>
                <select
                    id="payementmethod"
                    name="payementmethod"
                    value={formData.payementMethod || 'Bank transfer'}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                    <option value="Bank transfer">Virement bancaire</option>
                    <option value="Check">Check</option>
                    <option value="Cash">Cash</option>
                </select>
            </div>
          </div>

          {/* Ajoutez les autres sections ici (données fiscales, sociales, etc.) */}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              {loading ? 'Enregistrement...' : 'Ajouter l\'employé'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}