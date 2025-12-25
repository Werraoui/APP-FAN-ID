import { useNavigate, useLocation } from 'react-router-dom';
import { Download, Ticket, CheckCircle2, Languages } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '../contexts/LanguageContext';

export function FanIDSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  // Get data from location state or use mock data
  const personalInfo = location.state?.personalInfo || {};
  const fanIdData = {
    name: personalInfo.firstName && personalInfo.lastName 
      ? `${personalInfo.firstName} ${personalInfo.lastName}`
      : 'Mohammed Ben Ali',
    nationality: personalInfo.nationality || 'Maroc',
    fanIdNumber: `FID-2025-${(personalInfo.nationality || 'MA').substring(0, 2).toUpperCase()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
    issuedDate: new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
  };

  // Generate QR code data (could be a URL or JSON string)
  const qrCodeData = JSON.stringify({
    fanId: fanIdData.fanIdNumber,
    name: fanIdData.name,
    nationality: fanIdData.nationality,
    issuedDate: fanIdData.issuedDate,
    validUntil: fanIdData.validUntil,
  });

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <img src="/logoCAF.png" alt="CAF Logo" className="h-20 object-contain" />
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-2 px-3 py-2 bg-white/80 hover:bg-white rounded-lg shadow-sm transition-colors"
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </button>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {t('congratulations')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('fanIdGenerated')}
          </p>
        </div>

        {/* Fan ID Card */}
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-green-700 rounded-2xl shadow-2xl p-1 mb-6">
          <div className="bg-white rounded-xl p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">{t('fanIdNumber')}</p>
                <p className="text-red-700 font-bold text-lg">{fanIdData.fanIdNumber}</p>
              </div>
              <img src="/logoCAF.png" alt="CAF Logo" className="h-12 object-contain" />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-gray-600 text-sm mb-1">{t('fullName')}</p>
                <p className="text-gray-800 font-semibold">{fanIdData.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{t('nationality')}</p>
                <p className="text-gray-800 font-semibold">{fanIdData.nationality}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{t('issuedDate')}</p>
                <p className="text-gray-800 font-semibold">{fanIdData.issuedDate}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{t('validUntil')}</p>
                <p className="text-gray-800 font-semibold">{fanIdData.validUntil}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <QRCodeSVG
                  value={qrCodeData}
                  size={160}
                  level="H"
                  includeMargin={true}
                  className="mx-auto"
                />
                <p className="text-center text-gray-600 text-sm mt-2">{t('scanToVerify')}</p>
              </div>
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm text-center">
                {t('fanIdActive')}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
            <Ticket className="w-5 h-5" />
            {t('buyTicketNow')}
          </button>

          <button className="w-full py-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 rounded-xl shadow transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            {t('downloadFanId')}
          </button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {t('nextSteps')}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              </div>
              <p className="text-gray-600">
                {t('keepFanIdAccessible')}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-green-100 p-1 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <p className="text-gray-600">
                {t('presentQRCode')}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              </div>
              <p className="text-gray-600">
                {t('enjoyCAN')}
              </p>
            </li>
          </ul>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            {t('backToHome')}
          </button>
        </div>
      </div>
    </div>
  );
}
