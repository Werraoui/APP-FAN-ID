import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, CheckCircle2, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { documentAPI } from '../services/api';

type ProfileType = 'foreigner-classic-visa' | 'foreigner-visa-exempt' | 'foreigner-evisa' | 'moroccan-expired-cnie';

interface DocumentState {
  passport: File | null;
  classicVisa: File | null;
  eVisa: File | null;
  entryStampImage: File | null;
  entryDate: string;
  expiredCNIE: File | null;
  passportOrReceipt: File | null;
}

export function DocumentUpload() {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile as ProfileType || 'foreigner-classic-visa';
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  
  const [documents, setDocuments] = useState<DocumentState>({
    passport: null,
    classicVisa: null,
    eVisa: null,
    entryStampImage: null,
    entryDate: '',
    expiredCNIE: null,
    passportOrReceipt: null,
  });

  const [documentIds, setDocumentIds] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof DocumentState, string>>>({});
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (docType: keyof DocumentState, file: File | null) => {
    setDocuments(prev => ({ ...prev, [docType]: file }));
    if (errors[docType]) {
      setErrors(prev => ({ ...prev, [docType]: undefined }));
    }

    // Upload file immediately when selected
    if (file) {
      try {
        const result = await documentAPI.upload(
          file,
          docType,
          user?._id,
          undefined
        );
        setDocumentIds(prev => ({ ...prev, [docType]: result.documentId }));
      } catch (error: any) {
        console.error('Upload error:', error);
        setErrors(prev => ({ ...prev, [docType]: error.message || 'Erreur lors de l\'upload' }));
      }
    } else {
      // Remove document ID if file is removed
      setDocumentIds(prev => {
        const newIds = { ...prev };
        delete newIds[docType];
        return newIds;
      });
    }
  };

  const handleEntryDateChange = (value: string) => {
    setDocuments(prev => ({ ...prev, entryDate: value }));
    if (errors.entryDate) {
      setErrors(prev => ({ ...prev, entryDate: undefined }));
    }
  };

  const validateDocuments = (): boolean => {
    const newErrors: Partial<Record<keyof DocumentState, string>> = {};

    // Always require passport
    if (!documents.passport) {
      newErrors.passport = 'Ce document est requis';
    }

    // Profile-specific validations
    switch (profile) {
      case 'foreigner-classic-visa':
        if (!documents.classicVisa) {
          newErrors.classicVisa = 'Ce document est requis';
        }
        if (!documents.entryStampImage) {
          newErrors.entryStampImage = 'Ce document est requis';
        }
        if (!documents.entryDate.trim()) {
          newErrors.entryDate = 'Ce champ est requis';
        }
        break;
      
      case 'foreigner-visa-exempt':
        if (!documents.entryStampImage) {
          newErrors.entryStampImage = 'Ce document est requis';
        }
        if (!documents.entryDate.trim()) {
          newErrors.entryDate = 'Ce champ est requis';
        }
        break;
      
      case 'foreigner-evisa':
        if (!documents.eVisa) {
          newErrors.eVisa = 'Ce document est requis';
        }
        if (!documents.entryStampImage) {
          newErrors.entryStampImage = 'Ce document est requis';
        }
        if (!documents.entryDate.trim()) {
          newErrors.entryDate = 'Ce champ est requis';
        }
        break;
      
      case 'moroccan-expired-cnie':
        if (!documents.expiredCNIE) {
          newErrors.expiredCNIE = 'Ce document est requis';
        }
        if (!documents.passportOrReceipt) {
          newErrors.passportOrReceipt = 'Ce document est requis';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDocuments()) return;

    setUploading(true);
    try {
      // Prepare document IDs for backend
      const documentsForBackend: Record<string, string> = {};
      
      if (documents.passport && documentIds.passport) {
        documentsForBackend.passport = documentIds.passport;
      }
      if (documents.classicVisa && documentIds.classicVisa) {
        documentsForBackend.classicVisa = documentIds.classicVisa;
      }
      if (documents.eVisa && documentIds.eVisa) {
        documentsForBackend.eVisa = documentIds.eVisa;
      }
      if (documents.entryStampImage && documentIds.entryStampImage) {
        documentsForBackend.entryStampImage = documentIds.entryStampImage;
      }
      if (documents.entryDate) {
        documentsForBackend.entryDate = documents.entryDate;
      }
      if (documents.expiredCNIE && documentIds.expiredCNIE) {
        documentsForBackend.expiredCNIE = documentIds.expiredCNIE;
      }
      if (documents.passportOrReceipt && documentIds.passportOrReceipt) {
        documentsForBackend.passportOrReceipt = documentIds.passportOrReceipt;
      }

      navigate('/verification', { 
        state: { 
          profile,
          documents: documentsForBackend,
          personalInfo: location.state?.personalInfo || {}
        } 
      });
    } catch (error: any) {
      setErrors({ submit: error.message || 'Erreur lors de la soumission' });
    } finally {
      setUploading(false);
    }
  };

  const getRequiredDocuments = () => {
    const docs: Array<{
      key: keyof DocumentState;
      label: string;
      description: string;
      type: 'file' | 'date';
      accept?: string;
    }> = [
      {
        key: 'passport',
        label: t('passport'),
        description: t('passportDesc'),
        type: 'file',
        accept: 'image/*,.pdf',
      },
    ];

    switch (profile) {
      case 'foreigner-classic-visa':
        docs.push(
          {
            key: 'classicVisa',
            label: t('classicVisa'),
            description: t('classicVisaDesc'),
            type: 'file',
            accept: 'image/*,.pdf',
          },
          {
            key: 'entryStampImage',
            label: t('entryStamp'),
            description: t('entryStampDesc'),
            type: 'file',
            accept: 'image/*,.pdf',
          },
          {
            key: 'entryDate',
            label: t('entryDate'),
            description: t('entryDateDesc'),
            type: 'date',
          }
        );
        break;
      
      case 'foreigner-visa-exempt':
        docs.push(
          {
            key: 'entryStampImage',
            label: t('entryStamp'),
            description: t('entryStampDesc'),
            type: 'file',
            accept: 'image/*,.pdf',
          },
          {
            key: 'entryDate',
            label: t('entryDate'),
            description: t('entryDateDesc'),
            type: 'date',
          }
        );
        break;
      
      case 'foreigner-evisa':
        docs.push(
          {
            key: 'eVisa',
            label: t('eVisa'),
            description: t('eVisaDesc'),
            type: 'file',
            accept: 'image/*,.pdf',
          },
          {
            key: 'entryStampImage',
            label: t('entryStamp'),
            description: t('entryStampDesc'),
            type: 'file',
            accept: 'image/*,.pdf',
          },
          {
            key: 'entryDate',
            label: t('entryDate'),
            description: t('entryDateDesc'),
            type: 'date',
          }
        );
        break;
      
      case 'moroccan-expired-cnie':
        docs.push(
          {
            key: 'expiredCNIE',
            label: t('expiredCNIE'),
            description: t('expiredCNIEDesc'),
            type: 'file',
            accept: 'image/*,.pdf',
          },
          {
            key: 'passportOrReceipt',
            label: t('passportOrReceipt'),
            description: t('passportOrReceiptDesc'),
            type: 'file',
            accept: 'image/*,.pdf',
          }
        );
        break;
    }

    return docs;
  };

  const requiredDocs = getRequiredDocuments();
  
  const isDocumentUploaded = (docKey: keyof DocumentState): boolean => {
    if (docKey === 'entryDate') {
      return documents.entryDate.trim().length > 0;
    }
    return documents[docKey] !== null;
  };

  const allDocsValid = requiredDocs.every(doc => isDocumentUploaded(doc.key));

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
            <span className="text-sm text-gray-600">{t('step')} 3 {t('of')} 4</span>
            <span className="text-sm text-gray-600">75{t('percent')}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-red-600 to-green-600 transition-all duration-500"></div>
          </div>
        </div>

        {/* Upload Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('requiredDocuments')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('documentsDescription')}
          </p>

          <div className="space-y-6">
            {requiredDocs.map((doc) => {
              const isUploaded = isDocumentUploaded(doc.key);
              const hasError = errors[doc.key];

              if (doc.type === 'date') {
                return (
                  <div
                    key={doc.key}
                    className={`border-2 rounded-xl p-6 transition-all ${
                      isUploaded
                        ? 'border-green-500 bg-green-50'
                        : hasError
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-red-400'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        isUploaded
                          ? 'bg-green-100'
                          : hasError
                          ? 'bg-red-100'
                          : 'bg-gray-100'
                      }`}>
                        {isUploaded ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                          <FileText className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={isUploaded ? 'text-green-800 font-semibold' : 'text-gray-800 font-semibold'}>
                          {doc.label} <span className="text-red-600">*</span>
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {doc.description}
                        </p>
                        
                        <input
                          type="date"
                          value={documents.entryDate}
                          onChange={(e) => handleEntryDateChange(e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                            hasError
                              ? 'border-red-500 focus:ring-red-500'
                              : isUploaded
                              ? 'border-green-500 focus:ring-green-500'
                              : 'border-gray-300 focus:ring-green-500'
                          }`}
                        />
                        {hasError && (
                          <p className="text-red-600 text-sm mt-2">{hasError}</p>
                        )}
                        {isUploaded && !hasError && (
                          <div className="flex items-center gap-2 text-green-600 mt-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm">{t('documentUploaded')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={doc.key}
                  className={`border-2 rounded-xl p-6 transition-all ${
                    isUploaded
                      ? 'border-green-500 bg-green-50'
                      : hasError
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-red-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isUploaded
                        ? 'bg-green-100'
                        : hasError
                        ? 'bg-red-100'
                        : 'bg-gray-100'
                    }`}>
                      {isUploaded ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <FileText className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={isUploaded ? 'text-green-800 font-semibold' : 'text-gray-800 font-semibold'}>
                        {doc.label} <span className="text-red-600">*</span>
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {doc.description}
                      </p>
                      
                      {!isUploaded ? (
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg cursor-pointer transition-all">
                          <Upload className="w-4 h-4" />
                          <span>{t('upload')}</span>
                          <input
                            type="file"
                            className="hidden"
                            accept={doc.accept}
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileChange(doc.key, file);
                            }}
                          />
                        </label>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm">{t('documentUploaded')}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {documents[doc.key] instanceof File ? (documents[doc.key] as File).name : ''}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleFileChange(doc.key, null)}
                            className="text-sm text-red-600 hover:text-red-800 underline"
                          >
                            Changer le fichier
                          </button>
                        </div>
                      )}
                      {hasError && (
                        <p className="text-red-600 text-sm mt-2">{hasError}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>{t('acceptedFormats')} :</strong> {t('formatsInfo')}
            </p>
          </div>

          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!allDocsValid || uploading}
            className={`w-full mt-8 py-4 rounded-lg shadow-lg transition-all transform ${
              allDocsValid && !uploading
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:scale-105 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {uploading ? 'Upload en cours...' : (allDocsValid ? t('generateFanId') : t('pleaseUploadAll'))}
          </button>
        </form>
      </div>
    </div>
  );
}
