import React, { useState } from 'react';
import { Lock, User, Shield, KeyRound, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both administrative email and password.');
      return;
    }

    if (email === 'admin.art@assam.gov.in' && password === 'SewaDrishti@2026') {
      onLoginSuccess({
        name: 'Dr. Karuna Sharma, IAS',
        email,
        role: 'State Administrator (AR & T)',
      });
      onClose();
    } else if (email === 'dc.kamrup@assam.gov.in' && password === 'Dispur@2026') {
      onLoginSuccess({
        name: 'Sri Sumit Sattawan, IAS',
        email,
        role: 'District Commissioner (Kamrup Metro)',
      });
      onClose();
    } else if (email === 'co.dispur@assam.gov.in' && password === 'Circle@2026') {
      onLoginSuccess({
        name: 'Sri Dipankar Sarmah, ACS',
        email,
        role: 'Designated Public Servant (Dispur Circle)',
      });
      onClose();
    } else {
      setError('Invalid credentials. Please click one of the pre-configured Demo accounts below.');
    }
  };

  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center">
              <Shield className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Administrative Portal Sign-In</h3>
              <p className="text-xs text-slate-500">Department of Administrative Reforms, Govt of Assam</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded text-xs"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Official Email ID:
            </label>
            <div className="relative">
              <User className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@assam.gov.in"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Password:
            </label>
            <div className="relative">
              <KeyRound className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Authenticate Administrative Session</span>
          </button>
        </form>

        {/* Quick Demo Fill Buttons */}
        <div className="pt-3 border-t border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Demo Credentials (1-Click Fill)
            </span>
            <span className="text-[10px] text-sky-700 font-semibold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
              Test Sandbox
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => fillDemo('admin.art@assam.gov.in', 'SewaDrishti@2026')}
              className="p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-sky-300 transition-colors flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-semibold text-slate-800 block">1. State Admin (AR & T Dept)</span>
                <span className="text-[10px] text-slate-500 font-mono">admin.art@assam.gov.in</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-medium">
                Statewide
              </span>
            </button>

            <button
              type="button"
              onClick={() => fillDemo('dc.kamrup@assam.gov.in', 'Dispur@2026')}
              className="p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-amber-300 transition-colors flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-semibold text-slate-800 block">2. District Commissioner</span>
                <span className="text-[10px] text-slate-500 font-mono">dc.kamrup@assam.gov.in</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                Kamrup Metro
              </span>
            </button>

            <button
              type="button"
              onClick={() => fillDemo('co.dispur@assam.gov.in', 'Circle@2026')}
              className="p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-semibold text-slate-800 block">3. Designated Public Servant (DPS)</span>
                <span className="text-[10px] text-slate-500 font-mono">co.dispur@assam.gov.in</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                Circle Officer
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
