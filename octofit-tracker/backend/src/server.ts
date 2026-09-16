export const API_PORT = 8000;

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${API_PORT}`;
}