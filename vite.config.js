import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function pluginAdminLocal() {
    return {
        name: 'vite-plugin-admin-local',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                // Rota GET para listar projetos
                if (req.url === '/api/admin/projetos' && req.method === 'GET') {
                    try {
                        const caminhoArquivo = path.resolve(process.cwd(), 'src/data/projetos.js');
                        const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
                        const match = conteudo.match(/export\s+const\s+projetos\s*=\s*([\s\S]*?);?\s*$/);
                        let projetos = [];
                        if (match) {
                            const codigo = match[1].trim().replace(/;$/, '');
                            projetos = new Function(`return (${codigo})`)();
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ sucesso: true, projetos }));
                    } catch (erro) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ sucesso: false, erro: erro.message }));
                    }
                    return;
                }

                // Rota POST para salvar projetos
                if (req.url === '/api/admin/projetos' && req.method === 'POST') {
                    try {
                        let corpo = '';
                        req.on('data', (chunk) => {
                            corpo += chunk;
                        });
                        req.on('end', () => {
                            try {
                                const { projetos } = JSON.parse(corpo);
                                if (!Array.isArray(projetos)) {
                                    throw new Error('A lista de projetos deve ser um array.');
                                }
                                const caminhoArquivo = path.resolve(process.cwd(), 'src/data/projetos.js');
                                const conteudoJs = `export const projetos = ${JSON.stringify(projetos, null, 4)};\n`;
                                fs.writeFileSync(caminhoArquivo, conteudoJs, 'utf-8');

                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ sucesso: true, mensagem: 'Projetos salvos com sucesso!' }));
                            } catch (erroInterno) {
                                res.statusCode = 400;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ sucesso: false, erro: erroInterno.message }));
                            }
                        });
                    } catch (erro) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ sucesso: false, erro: erro.message }));
                    }
                    return;
                }

                // Rota GET para listar imagens disponíveis na pasta public/imagens_projetos
                if (req.url === '/api/admin/imagens' && req.method === 'GET') {
                    try {
                        const diretorioBase = path.resolve(process.cwd(), 'public/imagens_projetos');

                        function listarImagens(dir, subpasta = '') {
                            const dirAtual = subpasta ? path.join(dir, subpasta) : dir;
                            if (!fs.existsSync(dirAtual)) return [];
                            const itens = fs.readdirSync(dirAtual, { withFileTypes: true });
                            let lista = [];

                            for (const item of itens) {
                                const caminhoRel = subpasta ? path.join(subpasta, item.name) : item.name;
                                if (item.isDirectory()) {
                                    lista = lista.concat(listarImagens(dir, caminhoRel));
                                } else if (/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(item.name)) {
                                    const stats = fs.statSync(path.join(dirAtual, item.name));
                                    const urlRelativa = '/imagens_projetos/' + caminhoRel.split(path.sep).join('/');
                                    lista.push({
                                        nome: item.name,
                                        url: urlRelativa,
                                        pasta: subpasta ? subpasta.split(path.sep).join('/') : 'raiz',
                                        tamanho: stats.size,
                                        modificadoEm: stats.mtime,
                                    });
                                }
                            }
                            return lista;
                        }

                        const imagens = listarImagens(diretorioBase);
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ sucesso: true, imagens }));
                    } catch (erro) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ sucesso: false, erro: erro.message }));
                    }
                    return;
                }

                // Rota POST para upload de imagem do computador para a pasta do projeto
                if (req.url === '/api/admin/upload' && req.method === 'POST') {
                    try {
                        const chunks = [];
                        req.on('data', (chunk) => chunks.push(chunk));
                        req.on('end', () => {
                            try {
                                const buffer = Buffer.concat(chunks);
                                const contentType = req.headers['content-type'] || '';

                                // Extrair boundary do multipart
                                const boundaryMatch = contentType.match(/boundary=(.+)/);
                                if (!boundaryMatch) {
                                    throw new Error('Content-Type multipart/form-data com boundary é obrigatório.');
                                }
                                const boundary = boundaryMatch[1];
                                const rawBody = buffer.toString('binary');
                                const partes = rawBody.split('--' + boundary).filter(
                                    (p) => p.trim() && p.trim() !== '--'
                                );

                                let idProjeto = '';
                                let nomeArquivo = '';
                                let arquivoBuffer = null;

                                for (const parte of partes) {
                                    const cabecalhoRaw = parte.substring(0, parte.indexOf('\r\n\r\n'));
                                    const posCorpo = parte.indexOf('\r\n\r\n') + 4;
                                    let corpoBinario = parte.substring(posCorpo);
                                    // Remover trailing \r\n
                                    if (corpoBinario.endsWith('\r\n')) {
                                        corpoBinario = corpoBinario.slice(0, -2);
                                    }

                                    if (cabecalhoRaw.includes('name="idProjeto"')) {
                                        idProjeto = corpoBinario.trim();
                                    } else if (cabecalhoRaw.includes('name="arquivo"')) {
                                        const filenameMatch = cabecalhoRaw.match(/filename="(.+?)"/);
                                        if (filenameMatch) {
                                            nomeArquivo = filenameMatch[1];
                                        }
                                        arquivoBuffer = Buffer.from(corpoBinario, 'binary');
                                    }
                                }

                                if (!idProjeto || !nomeArquivo || !arquivoBuffer) {
                                    throw new Error('Campos obrigatórios: idProjeto e arquivo.');
                                }

                                // Sanitizar nome do arquivo
                                nomeArquivo = nomeArquivo.replace(/[^a-zA-Z0-9._-]/g, '_');

                                const pastaProjeto = path.resolve(
                                    process.cwd(),
                                    'public/imagens_projetos',
                                    idProjeto
                                );
                                if (!fs.existsSync(pastaProjeto)) {
                                    fs.mkdirSync(pastaProjeto, { recursive: true });
                                }

                                const caminhoFinal = path.join(pastaProjeto, nomeArquivo);
                                fs.writeFileSync(caminhoFinal, arquivoBuffer);

                                const urlRelativa = `/imagens_projetos/${idProjeto}/${nomeArquivo}`;

                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({
                                    sucesso: true,
                                    url: urlRelativa,
                                    nome: nomeArquivo,
                                    tamanho: arquivoBuffer.length,
                                    mensagem: `Imagem salva em public${urlRelativa}`,
                                }));
                            } catch (erroInterno) {
                                res.statusCode = 400;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ sucesso: false, erro: erroInterno.message }));
                            }
                        });
                    } catch (erro) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ sucesso: false, erro: erro.message }));
                    }
                    return;
                }

                next();
            });
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), pluginAdminLocal()],
});

