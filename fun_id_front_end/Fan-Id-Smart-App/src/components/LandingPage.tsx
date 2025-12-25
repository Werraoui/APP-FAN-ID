import { useNavigate } from 'react-router-dom';
import { Trophy, Shield, Ticket, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-green-700 text-white py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <img src="/logoCAF.png" alt="CAF Logo" className="h-16 md:h-20 object-contain" />
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
            >
              <Languages className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
            >
              {t('login')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-green-800">
              Fan ID Smart
            </h1>
            <h2 className="text-red-700">
              CAN 2025 – Maroc
            </h2>
            <p className="text-gray-700 text-xl">
              {t('getFanId')}
            </p>
            <p className="text-gray-600">
              {t('getFanIdDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                {t('createFanId')}
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                {t('haveAccount')}
              </button>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-600 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-red-700 mb-2">{t('secureAndFast')}</h3>
                  <p className="text-gray-600">
                    {t('secureAndFastDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-green-700 mb-2">{t('forAllSupporters')}</h3>
                  <p className="text-gray-600">
                    {t('forAllSupportersDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-600 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Ticket className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-red-700 mb-2">{t('directTicketAccess')}</h3>
                  <p className="text-gray-600">
                    {t('directTicketAccessDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-300">{t('copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
