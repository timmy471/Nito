import 'antd/dist/antd.css';
import 'nprogress/nprogress.css';
import { useRouter } from 'next/router';
import { store } from '@src/redux/store';
import type { AppProps } from 'next/app';
import 'react-phone-number-input/style.css';
import '@styles/main.scss';
import { Fragment, useEffect, useState } from 'react';
import { MetaHead, PreLoader, DashboardLayout } from '@src/components';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const unAuthorziedRoutes = ['/forgot-password', '/', '/new-password', '/verify-otp'];

  const getContent = () => {
    if (unAuthorziedRoutes.includes(router.pathname)) return <Component {...pageProps} />;

    return (
      <DashboardLayout>
        <MetaHead />
        <PreLoader />
        <Component {...pageProps} />
      </DashboardLayout>
    );
  };

  if (!mounted) return null;
  return (
    <Fragment>
      <MetaHead />
      <PreLoader />
      {getContent()}
    </Fragment>
  );
};

export default store.withRedux(App);
