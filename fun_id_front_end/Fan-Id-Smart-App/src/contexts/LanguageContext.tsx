import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Common
    back: 'Retour',
    continue: 'Continuer',
    submit: 'Soumettre',
    generateFanId: 'Générer Fan ID',
    loading: 'Chargement...',
    
    // Status Selection
    selectStatus: 'Quel est votre statut ?',
    selectStatusDescription: 'Sélectionnez la catégorie qui vous correspond',
    foreignerWithClassicVisa: 'Étranger avec visa classique',
    foreignerVisaExempt: 'Étranger dispensé de visa',
    foreignerWithEVisa: 'Étranger avec e-visa',
    moroccanExpiredCNIE: 'Marocain avec CNIE expirée',
    
    // Status Descriptions
    foreignerWithClassicVisaDesc: 'Vous avez un visa papier classique dans votre passeport',
    foreignerVisaExemptDesc: 'Vous êtes dispensé de visa pour entrer au Maroc',
    foreignerWithEVisaDesc: 'Vous avez un e-visa électronique (PDF ou QR code)',
    moroccanExpiredCNIEDesc: 'Vous êtes marocain avec une CNIE expirée',
    
    // Personal Info
    personalInfo: 'Informations personnelles',
    personalInfoDescription: 'Veuillez remplir vos informations telles qu\'elles apparaissent sur votre passeport',
    lastName: 'Nom',
    firstName: 'Prénom',
    nationality: 'Nationalité',
    dateOfBirth: 'Date de naissance',
    passportNumber: 'Numéro de passeport',
    selectNationality: 'Sélectionnez votre nationalité',
    nationalityAutoSet: 'Votre nationalité est automatiquement définie comme Maroc',
    important: 'Important',
    infoMatchPassport: 'Assurez-vous que toutes les informations correspondent exactement à celles de votre passeport.',
    
    // Documents
    requiredDocuments: 'Documents requis',
    documentsDescription: 'Téléchargez les documents nécessaires selon votre profil',
    upload: 'Télécharger',
    documentUploaded: 'Document téléchargé avec succès',
    acceptedFormats: 'Format accepté',
    maxSize: 'Taille maximale',
    quality: 'Qualité',
    formatsInfo: 'JPG, PNG ou PDF • 5 MB • Les documents doivent être lisibles et non flous',
    pleaseUploadAll: 'Veuillez télécharger tous les documents',
    
    // Document Types
    passport: 'Passeport',
    passportDesc: 'Photo de la page d\'identité de votre passeport',
    classicVisa: 'Visa classique',
    classicVisaDesc: 'Photo de votre visa papier dans le passeport',
    eVisa: 'E-visa',
    eVisaDesc: 'Copie de votre e-visa (PDF ou QR code)',
    entryStamp: 'Tampon d\'entrée',
    entryStampDesc: 'Photo du tampon d\'entrée dans votre passeport',
    entryDate: 'Date d\'entrée',
    entryDateDesc: 'Date d\'entrée au Maroc',
    expiredCNIE: 'CNIE expirée',
    expiredCNIEDesc: 'Photo recto et verso de votre CNIE expirée',
    passportOrReceipt: 'Passeport ou récépissé',
    passportOrReceiptDesc: 'Photo de votre passeport ou récépissé valide',
    
    // Verification
    verificationInProgress: 'Vérification en cours',
    verificationDescription: 'Nous vérifions vos informations et vos documents. Cela ne prendra que quelques instants.',
    analyzingDocuments: 'Analyse des documents',
    verifyingIdentity: 'Vérification de l\'identité',
    generatingFanId: 'Génération du Fan ID',
    
    // Success
    congratulations: 'Félicitations !',
    fanIdGenerated: 'Votre Fan ID a été généré avec succès',
    fanIdNumber: 'Fan ID Numéro',
    fullName: 'Nom complet',
    issuedDate: 'Date d\'émission',
    validUntil: 'Valide jusqu\'au',
    scanToVerify: 'Scannez pour vérifier',
    fanIdActive: '✓ Votre Fan ID est maintenant actif et prêt à être utilisé',
    buyTicketNow: 'Acheter un billet maintenant',
    downloadFanId: 'Télécharger mon Fan ID (PDF)',
    nextSteps: 'Prochaines étapes',
    keepFanIdAccessible: 'Gardez votre Fan ID accessible sur votre téléphone ou imprimez-le',
    presentQRCode: 'Présentez votre QR Code à l\'entrée du stade avec votre billet',
    enjoyCAN: 'Profitez de l\'ambiance unique de la CAN 2025 au Maroc !',
    backToHome: 'Retour à l\'accueil',
    
    // Steps
    step: 'Étape',
    of: 'sur',
    percent: '%',
    
    // Landing Page
    getFanId: 'Obtenez votre Fan ID en toute simplicité',
    getFanIdDescription: 'Accédez rapidement à votre Fan ID numérique et profitez pleinement de la Coupe d\'Afrique des Nations 2025. Simple, sécurisé et sans blocage.',
    createFanId: 'Créer mon Fan ID',
    haveAccount: 'J\'ai déjà un compte',
    login: 'Se connecter',
    secureAndFast: 'Sécurisé et Rapide',
    secureAndFastDesc: 'Processus de vérification simplifié et sécurisé',
    forAllSupporters: 'Pour Tous les Supporters',
    forAllSupportersDesc: 'Résidents, touristes et supporters étrangers bienvenus',
    directTicketAccess: 'Accès Direct aux Billets',
    directTicketAccessDesc: 'Achetez vos billets immédiatement après validation',
    copyright: '© 2025 Fan ID Smart – CAN 2025 Maroc. Tous droits réservés.',
  },
  en: {
    // Common
    back: 'Back',
    continue: 'Continue',
    submit: 'Submit',
    generateFanId: 'Generate Fan ID',
    loading: 'Loading...',
    
    // Status Selection
    selectStatus: 'What is your status?',
    selectStatusDescription: 'Select the category that applies to you',
    foreignerWithClassicVisa: 'Foreigner with classic visa',
    foreignerVisaExempt: 'Foreigner visa exempt',
    foreignerWithEVisa: 'Foreigner with e-visa',
    moroccanExpiredCNIE: 'Moroccan with expired CNIE',
    
    // Status Descriptions
    foreignerWithClassicVisaDesc: 'You have a classic paper visa in your passport',
    foreignerVisaExemptDesc: 'You are exempt from visa to enter Morocco',
    foreignerWithEVisaDesc: 'You have an electronic e-visa (PDF or QR code)',
    moroccanExpiredCNIEDesc: 'You are Moroccan with an expired CNIE',
    
    // Personal Info
    personalInfo: 'Personal Information',
    personalInfoDescription: 'Please fill in your information as it appears on your passport',
    lastName: 'Last Name',
    firstName: 'First Name',
    nationality: 'Nationality',
    dateOfBirth: 'Date of Birth',
    passportNumber: 'Passport Number',
    selectNationality: 'Select your nationality',
    nationalityAutoSet: 'Your nationality is automatically set as Morocco',
    important: 'Important',
    infoMatchPassport: 'Make sure all information matches exactly what is on your passport.',
    
    // Documents
    requiredDocuments: 'Required Documents',
    documentsDescription: 'Upload the necessary documents according to your profile',
    upload: 'Upload',
    documentUploaded: 'Document uploaded successfully',
    acceptedFormats: 'Accepted formats',
    maxSize: 'Maximum size',
    quality: 'Quality',
    formatsInfo: 'JPG, PNG or PDF • 5 MB • Documents must be readable and not blurry',
    pleaseUploadAll: 'Please upload all documents',
    
    // Document Types
    passport: 'Passport',
    passportDesc: 'Photo of the identity page of your passport',
    classicVisa: 'Classic Visa',
    classicVisaDesc: 'Photo of your paper visa in the passport',
    eVisa: 'E-visa',
    eVisaDesc: 'Copy of your e-visa (PDF or QR code)',
    entryStamp: 'Entry Stamp',
    entryStampDesc: 'Photo of the entry stamp in your passport',
    entryDate: 'Entry Date',
    entryDateDesc: 'Date of entry to Morocco',
    expiredCNIE: 'Expired CNIE',
    expiredCNIEDesc: 'Front and back photo of your expired CNIE',
    passportOrReceipt: 'Passport or Receipt',
    passportOrReceiptDesc: 'Photo of your passport or valid receipt',
    
    // Verification
    verificationInProgress: 'Verification in progress',
    verificationDescription: 'We are verifying your information and documents. This will only take a few moments.',
    analyzingDocuments: 'Analyzing documents',
    verifyingIdentity: 'Verifying identity',
    generatingFanId: 'Generating Fan ID',
    
    // Success
    congratulations: 'Congratulations!',
    fanIdGenerated: 'Your Fan ID has been generated successfully',
    fanIdNumber: 'Fan ID Number',
    fullName: 'Full Name',
    issuedDate: 'Issued Date',
    validUntil: 'Valid Until',
    scanToVerify: 'Scan to verify',
    fanIdActive: '✓ Your Fan ID is now active and ready to use',
    buyTicketNow: 'Buy a ticket now',
    downloadFanId: 'Download my Fan ID (PDF)',
    nextSteps: 'Next Steps',
    keepFanIdAccessible: 'Keep your Fan ID accessible on your phone or print it',
    presentQRCode: 'Present your QR Code at the stadium entrance with your ticket',
    enjoyCAN: 'Enjoy the unique atmosphere of CAN 2025 in Morocco!',
    backToHome: 'Back to home',
    
    // Steps
    step: 'Step',
    of: 'of',
    percent: '%',
    
    // Landing Page
    getFanId: 'Get your Fan ID easily',
    getFanIdDescription: 'Quickly access your digital Fan ID and fully enjoy the 2025 Africa Cup of Nations. Simple, secure and hassle-free.',
    createFanId: 'Create my Fan ID',
    haveAccount: 'I already have an account',
    login: 'Login',
    secureAndFast: 'Secure and Fast',
    secureAndFastDesc: 'Simplified and secure verification process',
    forAllSupporters: 'For All Supporters',
    forAllSupportersDesc: 'Residents, tourists and foreign supporters welcome',
    directTicketAccess: 'Direct Ticket Access',
    directTicketAccessDesc: 'Buy your tickets immediately after validation',
    copyright: '© 2025 Fan ID Smart – CAN 2025 Morocco. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

