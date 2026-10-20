// The dev server forwards /api/* to the API so the app never contains a host port: in Docker
// the compose file sets API_PROXY_TARGET=http://api:3000; on the host the worktree's .env
// sets it to that checkout's own API port (hassan-devkit worktree:env).
export default {
  '/api': {
    target: process.env['API_PROXY_TARGET'] ?? 'http://localhost:3000',
    changeOrigin: true,
  },
};
