---
title: Segundo lote de mídias e galeria da trilha
date: 2026-08-27
status: aprovado para implementação
---

# Mapeamento

| Acionador | Mídia |
|---|---|
| Nome “Subida até o topo” | `img/video 7.mp4` |
| Nome “Registro aéreo” | `img/video 9.mp4` |
| Nome “Trilha ao amanhecer” | Galeria descrita abaixo |

Nenhuma prévia aparece na página. Somente os nomes são clicáveis e o layout
existente permanece inalterado.

# Galeria da trilha

Ordem fixa:

1. `img/video 10.mp4`
2. `img/video 12.mp4`
3. `img/video 11.mp4`
4. `img/12.jpeg`
5. `img/13.jpeg`
6. `img/14.jpeg`

- Começa automaticamente no primeiro vídeo.
- Cada vídeo avança quando falta `1s` para terminar.
- Cada fotografia permanece por `10s`.
- A última fotografia permanece aberta; não reinicia nem fecha o popup.
- Há somente setas de anterior e próximo, sem pontos nem contador visível.
- O primeiro clique em qualquer seta desativa o avanço automático pelo restante
  daquela abertura do popup.
- Fechar e reabrir reinicia no primeiro vídeo e reativa o avanço automático.
- Vídeos começam mudos e usam somente os controles nativos.
- O popup mantém o fechamento exclusivo pelo `X` minimalista já aprovado.

# Validação

1. Rodar `npm run build`.
2. Testar os dois vídeos individuais e a galeria em desktop e `390px`.
3. Confirmar a ordem, a troca a `1s` do fim dos vídeos e os `10s` das fotos.
4. Confirmar que qualquer seta desativa o automático e que reabrir o popup o reativa.
5. Confirmar ausência de prévias, overflow, erros no console e alteração na
   quantidade de elementos `.reveal`.
