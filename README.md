# Lava

Luminária de lava decorativa em tela cheia para Windows.

## Instalação
1. Execute o instalador `Lava-Setup.exe` que está na pasta `dist`. Ele instalará o programa apenas para o seu usuário (não precisa de administrador) na pasta `C:\Users\joaop\jottaprado\Lava`.
2. Um atalho será criado na Área de Trabalho e no Menu Iniciar.

### Como fixar na Barra de Tarefas
O Windows 10 e 11 não permitem a fixação automática e segura na barra de tarefas por scripts de instalação. Para fazer isso manualmente:
1. Abra o Menu Iniciar.
2. Procure por "Lava" ou encontre-o na lista de aplicativos.
3. Clique com o botão direito do mouse no atalho "Lava".
4. Selecione **Fixar na barra de tarefas** (ou **Mais** > **Fixar na barra de tarefas**).

## Atalhos de Teclado
Os seguintes atalhos podem ser usados a qualquer momento com o app aberto:
- **Esc**: Fecha o aplicativo.
- **F**: Alterna entre o modo de tela cheia e janela (Full screen/Windowed).
- **M**: Move o aplicativo para o próximo monitor (se você tiver múltiplos monitores).
- **C**: Troca a paleta de cores.
- **L**: Troca o layout.
- **A**: Ativa/Desativa a troca automática.
- **Setas**: Ajustam a velocidade.
- **Espaço**: Pausa a animação.
- **H**: Exibe o menu de ajuda.

O mouse sumirá automaticamente após 2 segundos sem movimento para não atrapalhar o visual.

## Desinstalação
Você pode desinstalar o Lava acessando **Configurações > Aplicativos > Aplicativos Instalados**, procurando por "Lava" e clicando em Desinstalar. Isso removerá todos os atalhos e a pasta do programa.

## Desenvolvimento
Para gerar o instalador novamente:
1. Certifique-se de ter o Node.js instalado.
2. Na pasta do projeto (`C:\Users\joaop\jottaprado\lava-lamp`), abra o terminal.
3. Instale as dependências com `npm install`.
4. (Opcional) Teste o app em modo de desenvolvimento com `npm run dev`.
5. Gere o instalador final executando `npm run build`. O arquivo ficará na pasta `dist/`.

