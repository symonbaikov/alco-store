import React, { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CircleLoader } from "react-spinners";
import { AdminBadge } from '../../components/AdminBadge';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { user, isLoggedIn, loading, logout, refetch } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  console.log('User data in profile:', user);
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState('');
  const editRef = useRef<HTMLDivElement>(null);

  const breadcrumbItems = [
    { label: 'navbar.home', path: '/' },
    { label: 'profile.personalInfo' }
  ];

  useEffect(() => {
    if (user) {
      setFullName([user.firstName, user.lastName].filter(Boolean).join(' '));
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isEditingName && editRef.current && !editRef.current.contains(event.target as Node)) {
        setIsEditingName(false);
        setFullName([user?.firstName, user?.lastName].filter(Boolean).join(' '));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingName, user]);

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
      const response = await fetch('http://localhost:3001/api/change-password', {
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

  const handleSaveName = async () => {
    const [newFirst, ...rest] = fullName.trim().split(/\s+/);
    const newFirstName = newFirst || '';
    const newLastName = rest.join(' ') || '';

    // Проверка длины имени
    if (newFirstName.length > 15 || newLastName.length > 15) {
      toast.error(t('profile.nameTooLong'));
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/update-name', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName: newFirstName, 
          lastName: newLastName 
        }),
      });

      if (response.ok) {
        toast.success(t('profile.nameUpdateSuccess'));
        setIsEditingName(false);
        refetch();
      } else {
        toast.error(t('profile.nameUpdateError'));
      }
    } catch (error) {
      console.error('Error updating name:', error);
      toast.error(t('profile.nameUpdateError'));
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircleLoader color="red" size={50} />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="breadcrumbs-container">
        <div className="content-wrapper">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="page-title">{t('profile.personalInfo')}</h1>
        </div>
      </div>
      <div className="profile-container">
        <div className="profile-info">
          <div className="profile-section">
            {user?.role === 'ADMIN' && <AdminBadge />}
            {user?.googleId && (
              <div className="profile-name">
                <div className="name-display">
                  {isEditingName ? (
                    <div className="inline-edit" ref={editRef}>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="inline-input"
                        autoFocus
                      />
                      <button 
                        onClick={handleSaveName}
                        className="inline-button save"
                        title={t('profile.save')}
                      >
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="user-full-name">
                        {[user.firstName, user.lastName].filter(Boolean).join(' ')}
                      </h3>
                      <button 
                        onClick={() => {
                          setFullName([user.firstName, user.lastName].filter(Boolean).join(' '));
                          setIsEditingName(true);
                        }}
                        className="inline-button edit"
                        title={t('profile.editName')}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('profile.loginMethod')}</span>
              <span className="info-value">
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
    </>
  );
};

export default ProfilePage;
