import { FC } from 'react';
import type { AppProps } from 'next/app';
import { MeshApp } from '@uniformdev/mesh-sdk-react';
import '../styles/globals.scss';
// import '../fe-app/src/styles/globals.scss';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <MeshApp>
    <Component {...pageProps} />
  </MeshApp>
);

export default App;
