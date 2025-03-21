// d:\work\noflexi\client\src\components\dashboard\Header.js
import Link from 'next/link';

export default function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                NoFlexi
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
  );
}