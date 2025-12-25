import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react';

export function ErrorScreen() {
  const navigate = useNavigate();

  const errorReason = "Les informations du passeport ne correspondent pas au document téléchargé";

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logoCAF.png" alt="CAF Logo" className="h-20 object-contain" />
        </div>

        {/* Error Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-red-700 mb-2">
            Demande non validée
          </h1>
          <p className="text-gray-600">
            Nous n'avons pas pu valider votre demande de Fan ID
          </p>
        </div>

        {/* Error Details Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h3 className="text-gray-800 mb-4">
            Raison du refus
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800">
              {errorReason}
            </p>
          </div>

          <h3 className="text-gray-800 mb-4">
            Que faire maintenant ?
          </h3>
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-1 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <p className="text-gray-700">
                Vérifiez que toutes les informations saisies correspondent exactement à votre passeport
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-1 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <p className="text-gray-700">
                Assurez-vous que les photos de vos documents sont claires et lisibles
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-1 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <p className="text-gray-700">
                Vérifiez que vos documents sont valides et non expirés
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/personal-info')}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Modifier mes informations
            </button>

            <button className="w-full py-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 rounded-xl shadow transition-all flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Contacter le support
            </button>
          </div>
        </div>

        {/* Support Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-blue-800 mb-3">
            Besoin d'aide ?
          </h3>
          <p className="text-blue-700 mb-3">
            Notre équipe de support est disponible pour vous aider :
          </p>
          <ul className="space-y-2 text-blue-700">
            <li>📧 Email : support@fanid-can2025.ma</li>
            <li>📞 Téléphone : +212 5XX-XXXXXX</li>
            <li>⏰ Horaires : Lun-Dim 8h-20h</li>
          </ul>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}
