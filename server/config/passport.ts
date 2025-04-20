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
        email: user.email
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
        // Проверяем, существует ли пользователь
        let user = await prisma.user.findFirst({
          where: { email: profile.emails?.[0]?.value },
        });

        if (!user) {
          // Если пользователя нет, создаем нового
          user = await prisma.user.create({
            data: {
              email: profile.emails?.[0]?.value || '',
              password: '', // пустой пароль для пользователей Google
              googleId: profile.id,
            },
          });
        } else if (!user.googleId) {
          // Если пользователь существует, но не имеет googleId, обновляем его
          user = await prisma.user.update({
            where: { id: user.id },
            data: { googleId: profile.id },
          });
        }

        // Возвращаем только нужные поля
        return done(null, {
          id: user.id,
          email: user.email
        });
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
); 