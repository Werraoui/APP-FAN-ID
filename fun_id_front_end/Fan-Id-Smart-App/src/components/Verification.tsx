import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SoccerPlayerLoader } from './SoccerPlayerLoader';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { fanIdAPI } from '../services/api';

export function Verification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const submitApplication = async () => {
      try {
        const { profile, personalInfo, documents } = location.state || {};

        if (!profile || !personalInfo || !documents) {
          setError('Données manquantes');
          navigate('/error');
          return;
        }

        // Simulate progress while submitting
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(interval);
              return 90;
            }
            return prev + 2;
          });
        }, 100);

        // Submit application to backend
        const result = await fanIdAPI.apply({
          userId: user?._id,
          profile,
          personalInfo,
          documents,
        });

        clearInterval(interval);
        setProgress(100);

        // Navigate to success with the application result
        setTimeout(() => {
          navigate('/success', { 
            state: {
              fanIdId: result.fanIdId,
              personalInfo,
              profile,
              documents
            }
          });
        }, 500);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la soumission');
        navigate('/error', { state: { error: err.message } });
      }
    };

    submitApplication();
  }, [navigate, location.state, user]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/logoCAF.png" alt="CAF Logo" className="h-24 object-contain" />
          </div>

          {/* Loader */}
          <div className="mb-8">
            <SoccerPlayerLoader />
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            {t('verificationInProgress')}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {t('verificationDescription')}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-green-600 to-red-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm">{progress}{t('percent')}</p>

          {/* Status Messages */}
          <div className="mt-8 space-y-3">
            <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              progress > 20 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                progress > 20 ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {progress > 20 && (
                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <span>{t('analyzingDocuments')}</span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              progress > 50 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                progress > 50 ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {progress > 50 && (
                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <span>{t('verifyingIdentity')}</span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              progress > 80 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                progress > 80 ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {progress > 80 && (
                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <span>{t('generatingFanId')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
