import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Сериализация: сохраняем в сессии только id пользователя
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Десериализация: получаем пользователя из БД и сохраняем в req.session.user
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      // Сохраняем только нужные поля в сессии
      const sessionUser = {
        id: user.id,
        email: user.email,
        googleId: user.googleId,
        firstName: user.firstName,
        lastName: user.lastName
      };
      done(null, sessionUser);
    } else {
      done(new Error('User not found'), null);
    }
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:3001/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google profile:', profile);
        // Проверяем, существует ли пользователь
        let user = await prisma.user.findFirst({
          where: { email: profile.emails?.[0]?.value },
        });

        console.log('Found user:', user);

        if (!user) {
          // Если пользователя нет, создаем нового с именем из Google
          user = await prisma.user.create({
            data: {
              email: profile.emails?.[0]?.value || '',
              password: '', // пустой пароль для пользователей Google
              googleId: profile.id,
              firstName: profile.name?.givenName || '',
              lastName: profile.name?.familyName || ''
            },
          });
          console.log('Created new user:', user);
        } else if (!user.googleId) {
          // Если пользователь существует, но не имеет googleId, обновляем только googleId
          user = await prisma.user.update({
            where: { id: user.id },
            data: { 
              googleId: profile.id,
              // Устанавливаем имя из Google только если у пользователя нет своего имени
              firstName: user.firstName || profile.name?.givenName || '',
              lastName: user.lastName || profile.name?.familyName || ''
            },
          });
          console.log('Updated user with googleId:', user);
        }
        // Больше не обновляем имя при каждом входе

        return done(null, user);
      } catch (error) {
        console.error('Error in Google Strategy:', error);
        return done(error as Error, undefined);
      }
    }
  )
); 