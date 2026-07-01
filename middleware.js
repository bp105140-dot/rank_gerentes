export const config = {
  // O asterisco protege todas as rotas e arquivos do site
  matcher: '/:path*',
};

export default function middleware(request) {
  const authorizationHeader = request.headers.get('authorization');

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1];
    const [user, password] = atob(basicAuth).split(':');

    // Troque 'admin' e 'senha123' pelo usuário e senha que você quiser
    if (user === 'admin' && password === 'senha123') {
      return new Response(null, {
        headers: { 'x-middleware-next': '1' } // Permite o acesso
      });
    }
  }

  // Se a senha estiver errada ou não for inserida, barra o usuário
  return new Response('Acesso Negado. Credenciais inválidas.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Área Restrita do Projeto"',
    },
  });
}
