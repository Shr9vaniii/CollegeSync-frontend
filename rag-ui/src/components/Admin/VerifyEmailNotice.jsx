import { useState } from 'react';
import { auth } from '../../Auth/firebase'; // Your firebase config
import { sendEmailVerification, reload } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const VerifyEmailNotice = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;

  const checkVerification = async () => {
    setLoading(true);
    try {
      // CRITICAL: reload() updates the local user object with the latest status from Firebase
      await reload(user);
      if (user.emailVerified) {
        navigate('/dashboard'); // Send them to the admin dashboard
      } else {
        setMessage("Email still not verified. Please check your inbox again.");
      }
    } catch (error) {
      setMessage("Error refreshing status. Try logging in again.");
    }
    setLoading(false);
  };

  const resendEmail = async () => {
    try {
      await sendEmailVerification(user);
      setMessage("Verification email resent!");
    } catch (error) {
      setMessage("Too many requests. Please wait a moment.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Verify your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to <strong>{user?.email}</strong>. 
          Please click the link in that email to activate your admin account.
        </p>

        {message && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded text-sm">
            {message}
          </div>
        )}

        <button
          onClick={checkVerification}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition mb-3"
        >
          {loading ? "Checking..." : "I've Verified My Email"}
        </button>

        <button
          onClick={resendEmail}
          className="text-sm text-indigo-600 hover:underline"
        >
          Resend verification email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailNotice;