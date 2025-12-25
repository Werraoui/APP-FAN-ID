import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, FileText, CreditCard, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type ProfileType = 'foreigner-classic-visa' | 'foreigner-visa-exempt' | 'foreigner-evisa' | 'moroccan-expired-cnie';

export function StatusSelection() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const handleProfileSelect = (profile: ProfileType) => {
    navigate('/personal-info', { state: { profile } });
  };

  const profiles = [
    {
      id: 'foreigner-classic-visa' as ProfileType,
      icon: FileText,
      title: t('foreignerWithClassicVisa'),
      description: t('foreignerWithClassicVisaDesc'),
      color: 'red',
    },
    {
      id: 'foreigner-visa-exempt' as ProfileType,
      icon: Globe,
      title: t('foreignerVisaExempt'),
      description: t('foreignerVisaExemptDesc'),
      color: 'green',
    },
    {
      id: 'foreigner-evisa' as ProfileType,
      icon: FileText,
      title: t('foreignerWithEVisa'),
      description: t('foreignerWithEVisaDesc'),
      color: 'red',
    },
    {
      id: 'moroccan-expired-cnie' as ProfileType,
      icon: CreditCard,
      title: t('moroccanExpiredCNIE'),
      description: t('moroccanExpiredCNIEDesc'),
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-2 px-3 py-2 bg-white/80 hover:bg-white rounded-lg shadow-sm transition-colors"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
            <img src="/logoCAF.png" alt="CAF Logo" className="h-16 object-contain" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">{t('step')} 1 {t('of')} 4</span>
            <span className="text-sm text-gray-600">25{t('percent')}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-gradient-to-r from-red-600 to-green-600 transition-all duration-500"></div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('selectStatus')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('selectStatusDescription')}
          </p>
        </div>

        {/* Profile Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            const isRed = profile.color === 'red';
            const iconBgClass = isRed 
              ? 'bg-gradient-to-br from-red-100 to-red-200 text-red-700' 
              : 'bg-gradient-to-br from-green-100 to-green-200 text-green-700';
            const borderHoverClass = isRed 
              ? 'hover:border-red-500' 
              : 'hover:border-green-500';
            const titleClass = isRed 
              ? 'text-red-800' 
              : 'text-green-800';

            return (
              <button
                key={profile.id}
                onClick={() => handleProfileSelect(profile.id)}
                className={`bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent ${borderHoverClass} group text-left`}
              >
                <div className={`${iconBgClass} w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${titleClass}`}>
                  {profile.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {profile.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-blue-800 text-center">
            <strong>Besoin d'aide ?</strong> Choisissez le profil qui correspond à votre situation actuelle. Cette information nous permettra de vérifier vos documents correctement.
          </p>
        </div>
      </div>
    </div>
  );
}
