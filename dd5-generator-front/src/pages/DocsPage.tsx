import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { BACKEND_URL } from '../interfaces/constants';

export default function DocsPage() {
  const docsUrl = BACKEND_URL + '/docs-json';

  return <SwaggerUI url={docsUrl} />;
}
