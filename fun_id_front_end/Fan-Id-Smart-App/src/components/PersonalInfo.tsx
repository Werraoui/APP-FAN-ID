import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PersonalInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile || 'foreigner-classic-visa';
  const { t, language, setLanguage } = useLanguage();

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    nationality: '',
    dateOfBirth: '',
    passportNumber: ''
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Partial<typeof formData> = {};
    if (!formData.lastName.trim()) newErrors.lastName = 'Ce champ est requis';
    if (!formData.firstName.trim()) newErrors.firstName = 'Ce champ est requis';
    if (!formData.nationality) newErrors.nationality = 'Ce champ est requis';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Ce champ est requis';
    if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Ce champ est requis';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate('/documents', { state: { profile, personalInfo: formData } });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-2xl mx-auto">
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
            <span className="text-sm text-gray-600">{t('step')} 2 {t('of')} 4</span>
            <span className="text-sm text-gray-600">50{t('percent')}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-red-600 to-green-600 transition-all duration-500"></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('personalInfo')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('personalInfoDescription')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  {t('lastName')} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('lastName')}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  {t('firstName')} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('firstName')}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {t('nationality')} <span className="text-red-600">*</span>
              </label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.nationality ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">{t('selectNationality')}</option>
                <option value="Maroc">Maroc</option>
                <option value="Algérie">Algérie</option>
                <option value="Tunisie">Tunisie</option>
                <option value="Sénégal">Sénégal</option>
                <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Egypte">Egypte</option>
                <option value="Cameroun">Cameroun</option>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Autre">Autre</option>
              </select>
              {errors.nationality && (
                <p className="text-red-600 text-sm mt-1">{errors.nationality}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {t('dateOfBirth')} <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.dateOfBirth && (
                <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {t('passportNumber')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.passportNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="AB1234567"
                required
              />
              {errors.passportNumber && (
                <p className="text-red-600 text-sm mt-1">{errors.passportNumber}</p>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>{t('important')} :</strong> {t('infoMatchPassport')}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {t('continue')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
