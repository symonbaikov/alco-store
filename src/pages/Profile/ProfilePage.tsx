import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './ProfilePage.css';

interface User {
  email: string;
  googleId?: string;
}

const ProfilePage: React.FC = () => {
  const { user, isLoggedIn, loading, logout } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  console.log('User data:', user);
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const resetForm = () => {
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(t('profile.allFieldsRequired'));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t('profile.passwordsNotMatch'));
      return;
    }

    if (newPassword.length < 8) {
      toast.error(t('profile.passwordTooShort'));
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/change-password', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        toast.success(t('profile.passwordChanged'));
        resetForm();
      } else {
        const error = await response.json();
        if (error.error === 'INVALID_CURRENT_PASSWORD') {
          toast.error(t('profile.invalidCurrentPassword'));
        } else if (error.error === 'PASSWORD_REQUIREMENTS_NOT_MET') {
          toast.error(t('profile.passwordRequirementsNotMet'));
        } else {
          toast.error(t('profile.changePasswordError'));
        }
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(t('profile.changePasswordError'));
    }
  };

  if (loading) {
    return <div className="profile-loading">{t('common.loading')}</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">{t('navbar.profile')}</h1>
      <div className="profile-info">
        <div className="profile-section">
          <h2>{t('profile.personalInfo')}</h2>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t('profile.loginMethod')}</span>
            <span className="info-value">
              {console.log('Current user:', user)}
              {user?.googleId ? (
                <span className="google-login-badge">
                  <img 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    className="google-icon" 
                  />
                  {t('profile.googleAccount')}
                </span>
              ) : (
                <span>{t('profile.emailPassword')}</span>
              )}
            </span>
          </div>
        </div>

        <div className="profile-section">
          <h2>{t('profile.security')}</h2>
          {!isChangingPassword && !user?.googleId && (
            <div className="profile-actions">
              <button 
                className="profile-button"
                onClick={() => setIsChangingPassword(true)}
              >
                {t('profile.changePassword')}
              </button>
              <button 
                className="profile-button logout-button"
                onClick={handleLogout}
              >
                {t('profile.logout')}
              </button>
            </div>
          )}
          {!isChangingPassword && user?.googleId && (
            <div className="profile-actions">
              <button 
                className="profile-button logout-button"
                onClick={handleLogout}
              >
                {t('profile.logout')}
              </button>
            </div>
          )}
          {isChangingPassword && (
            <form onSubmit={handleChangePassword} className="change-password-form">
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t('profile.currentPassword')}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t('profile.newPassword')}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <small className="password-requirements">
                  {t('profile.passwordRequirements')}
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t('profile.confirmNewPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="profile-button">
                  {t('profile.savePassword')}
                </button>
                <button 
                  type="button" 
                  className="profile-button cancel-button"
                  onClick={resetForm}
                >
                  {t('profile.cancel')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
