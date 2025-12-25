import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { StatusSelection } from './components/StatusSelection';
import { PersonalInfo } from './components/PersonalInfo';
import { DocumentUpload } from './components/DocumentUpload';
import { Verification } from './components/Verification';
import { FanIDSuccess } from './components/FanIDSuccess';
import { ErrorScreen } from './components/ErrorScreen';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/status" element={<StatusSelection />} />
              <Route path="/personal-info" element={<PersonalInfo />} />
              <Route path="/documents" element={<DocumentUpload />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/success" element={<FanIDSuccess />} />
              <Route path="/error" element={<ErrorScreen />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}
