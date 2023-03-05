import Auth from '~/modules/Auth';
import HelmetTitle from '~/UI/atoms/Helmet';

const AuthPage: React.FC = () => (
  <>
    <HelmetTitle title='Авторизация' />
    <Auth />
  </>
);
export default AuthPage;
