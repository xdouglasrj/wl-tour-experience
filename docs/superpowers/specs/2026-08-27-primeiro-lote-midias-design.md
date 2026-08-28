---
title: Primeiro lote de substituições de mídia
date: 2026-08-27
status: aprovado para implementação
---

# Objetivo

Substituir a fotografia vertical do Cristo e fazer os nomes dos quatro cards de
benefícios abrirem mídias em popup, preservando integralmente o desenho dos
cards e o restante da página aprovada.

# Mapeamento aprovado

| Local atual | Nova mídia | Comportamento |
|---|---|---|
| Foto vertical do Cristo na seção “Não é só um passeio” | `img/2.jpeg` | Substituir a imagem, manter a moldura, remover a antiga etiqueta de coordenadas e atualizar o texto alternativo |
| Nome “Pilotos experientes” | `img/video 6.mp4` | O clique no nome abre o vídeo no popup; nenhuma prévia aparece no card |
| Nome “Experiência local” | `img/1.jpeg` | O clique no nome abre a foto no popup; nenhuma prévia aparece no card |
| Nome “Registros profissionais” | `img/8.jpeg` | O clique no nome abre a foto no popup; nenhuma prévia aparece no card |
| Nome “Vídeo / registro aéreo” | `img/video 2.mp4` | O clique no nome abre o vídeo no popup; nenhuma prévia aparece no card |

Os títulos e textos existentes continuam visíveis e os cards mantêm suas
medidas e seu visual anterior. Somente o nome é o acionador. As fotos e os
vídeos não ficam aparentes na página fechada.

# Popup reutilizável

- Um único componente atende fotos, vídeos atuais e mídias futuras.
- Abre somente após clique no nome correspondente.
- Vídeos iniciam automaticamente com áudio desligado.
- O áudio é controlado exclusivamente pelos controles nativos do reprodutor;
  não existe botão de som personalizado ou duplicado.
- Nos vídeos, o botão `X` é pequeno, neutro, semitransparente e sem amarelo.
- O `X` aparece ao abrir o vídeo, desaparece após `2s` sem interação e reaparece
  por mais `2s` quando o visitante clica ou toca no vídeo.
- Nas fotografias, o mesmo `X` discreto permanece visível porque a imagem não
  possui controles de reprodução.
- Fecha somente pelo botão `X`.
- Clique no fundo, na mídia ou em qualquer outro ponto não fecha.
- A tecla `Esc` não fecha.
- Ao fechar, pausa e reinicia qualquer vídeo aberto.
- Mantém foco de teclado perceptível no card acionador e no botão `X`.
- Durante a abertura, impede a rolagem da página; ao fechar, restaura a rolagem
  e o foco ao card acionador.

# Limites

- Não alterar textos, ordem de seções, outras imagens, hero ou efeitos E1–E5.
- Não publicar nem fazer deploy.
- Manter os arquivos de mídia locais no projeto e incluí-los no build.

# Validação

1. Rodar `npm run build`.
2. Abrir e fechar as quatro mídias em desktop e `390px`.
3. Confirmar autoplay mudo, controle nativo de som e ausência de botão de áudio duplicado.
4. Clicar no fundo, na mídia e pressionar `Esc`, confirmando que o popup continua aberto.
5. Confirmar que o `X` do vídeo some após `2s`, reaparece ao tocar no vídeo e
   fecha o popup quando acionado.
6. Confirmar os três novos enquadramentos fotográficos e ausência de overflow.
7. Conferir console e preservação dos 40 elementos `.reveal`.
