# Instruções para Deploy no GitHub Pages

## Configuração Realizada

✅ **Configuração do Vite**: Adicionado `base: '/flowguard-pro/'` no `vite.config.ts` para funcionar corretamente no GitHub Pages

✅ **Scripts**: Adicionado script de deploy no `package.json`

✅ **Git**: Repositório inicializado e commit inicial feito

⚠️ **Deploy Manual**: Configurado para deploy manual (sem automação)

## Próximos Passos

### 1. Criar repositório no GitHub
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome do repositório: `flowguard-pro` (deve ser exatamente este nome)
4. Marque como **público** (GitHub Pages gratuito só funciona com repositórios públicos)
5. **NÃO** inicialize com README, .gitignore ou license (já temos)

### 2. Conectar repositório local ao GitHub
```bash
git remote add origin https://github.com/SEU_USUARIO/flowguard-pro.git
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages
1. No repositório GitHub, vá em **Settings**
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione **Deploy from a branch**
4. Escolha a branch `main` e pasta `root` (ou `/` para a raiz)
5. Salve as configurações

### 4. Fazer deploy manual
Para fazer deploy, execute:
```bash
npm run build
npm run deploy
```

## Testando Localmente

Para testar como ficará no GitHub Pages:

```bash
npm run build
npm run preview
```

## URL Final

Após o deploy, sua aplicação estará disponível em:
`https://SEU_USUARIO.github.io/flowguard-pro/`

## Troubleshooting

- **Página em branco**: Verifique se o `base` no `vite.config.ts` está correto
- **Erro 404**: Confirme se o nome do repositório é exatamente `flowguard-pro`
- **Assets não carregam**: Verifique se o repositório é público

## Comandos Úteis

```bash
# Build para produção
npm run build

# Preview local
npm run preview

# Deploy manual (alternativo)
npm run deploy
```
