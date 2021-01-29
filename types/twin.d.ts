import 'twin.macro';
import styledImport from '@emotion/styled';
import { css as cssImport } from '@emotion/react';

import {} from '@emotion/react/types/css-prop';

declare module 'twin.macro' {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string;
    }
  }
}
