import type { AppProps } from 'next/app'
import { dark, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { AuthProvider } from '../data/firebase/authContext';
import { AppProvider } from '../data/appContext';

import '../public/icons/assets/sheets/spritesheet_36x36.css';
import '../public/icons/assets/sheets/spritesheet_70x70.css';
import '../public/icons/assets/sheets/spritesheet_21x21.css';
import '../public/icons/assets/sheets/spritesheet_23x27.css';
import '../public/icons/assets/sheets/spritesheet_38x36.css';
import '../public/icons/assets/sheets/spritesheet_41x50.css';
import '../public/icons/assets/sheets/spritesheet_56x56.css';
import '../public/icons/assets/sheets/spritesheet_88x76.css';

const customTheme = deepMerge(dark, {
  tab: {
    active: {
      background: 'dark-1',
      color: 'accent-1',
    },
    color: 'grey'
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grommet theme={customTheme} full>
      <AuthProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </AuthProvider>
    </Grommet>
  )
}
export default MyApp
