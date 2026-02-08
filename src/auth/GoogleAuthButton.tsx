import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useState } from 'react';

export function GoogleAuthButton({ onLogin }: { onLogin: (user: any) => void }) {
  const [user, setUser] = useState<any>(null);

  return (
    <div className="flex flex-col items-center gap-2">
      {!user ? (
        <GoogleLogin
          onSuccess={credentialResponse => {
            setUser(credentialResponse);
            onLogin(credentialResponse);
          }}
          onError={() => {
            alert('Login Failed');
          }}
        />
      ) : (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            googleLogout();
            setUser(null);
            onLogin(null);
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}
