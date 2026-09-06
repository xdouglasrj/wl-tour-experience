# Tarefa D2a — seção de perguntas frequentes na página

Worktree isolado. **Arquivos que você pode alterar, e só estes dois:**

- `src/App.js`
- `src/App.css`

Nenhum outro arquivo. Não crie arquivo novo, não crie pasta, não crie arquivo de
teste ou de anotação, não rode `git add` nem `git commit`. Criar qualquer arquivo
fora desses dois é reprovação automática — a tentativa anterior foi reprovada
exatamente por isso.

O `index.html` e o `verify-agents.cjs` **não** são desta tarefa. Não toque neles.

## Objetivo

A página passa a responder por escrito as perguntas que o turista faz antes de
reservar, nos três idiomas, com HTML nativo e sem JavaScript novo.

## Regras que incidem, escritas por extenso

**Nenhum valor, em nenhum idioma, em nenhum campo.** Não entra preço, faixa de
preço nem "a partir de". Decisão do dono do produto: no turismo as taxas mudam de
um dia para o outro. O preço é negociado no ato.

**Texto de venda não se inventa.** Todo o conteúdo abaixo veio do cliente. Não
acrescente pergunta, não acrescente resposta, não "melhore" o texto, não invente
política de cancelamento, reembolso, seguro, certificação ou tempo de
experiência. O que não está escrito aqui não vai para a página.

**O acabamento aprovado não muda.** A página já foi aprovada pelo cliente. Você
está acrescentando uma seção, não redesenhando nada. Não mexa em nenhuma seção
existente, não reordene, não reindente e não reformate nada.

**Celular primeiro.** A seção tem que ficar legível em 390 px de largura.

## A estrutura real do arquivo, medida agora

Dentro de `function App()` existem estas duas variáveis, já prontas:

```js
const t = copy[language];
const l = localized[language];
```

- `copy` começa na linha 143. Tem as chaves `pt`, `en` e `es`.
- `localized` começa na linha 323. Tem as chaves `pt`, `en` e `es`, e dentro de
  cada uma existe um objeto `labels` com rótulos em caixa alta, assim:

```js
labels: {
  experience: "EXPERIÊNCIA",
  gallery: "GALERIA",
  testimonials: "DEPOIMENTOS",
  contact: "CONTATO",
  ...
},
```

**Onde cada coisa entra:**

1. O rótulo da seção entra em `localized[idioma].labels.faq`:
   `"PERGUNTAS FREQUENTES"` em pt, `"FREQUENTLY ASKED QUESTIONS"` em en,
   `"PREGUNTAS FRECUENTES"` em es. Caixa alta, como os outros rótulos.
2. A lista de perguntas entra em `localized[idioma].faq`, como um array de
   objetos `{ q, a }`, na ordem numerada abaixo.

Não invente `t.faq`: o dicionário `copy` não recebe nada nesta tarefa.

## Onde a seção entra no JSX

Imediatamente **antes** da seção final de contato, que começa assim, por volta da
linha 1120:

```jsx
        <section
          className="final-cta section-pad"
          id="contact"
          data-testid="final-cta-section"
        >
```

## Marcação

Use `<details>` e `<summary>` nativos: sem JavaScript, sem estado, sem
biblioteca, e o texto continua dentro do HTML para o buscador ler.

```jsx
        <section className="faq section-pad" id="faq" data-testid="faq-section">
          <div className="section-label">{l.labels.faq}</div>
          <div className="faq-list">
            {l.faq.map((item, i) => (
              <details
                key={item.q}
                className="faq-item reveal"
                style={{ transitionDelay: revealDelays[i % revealDelays.length] }}
              >
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
```

`revealDelays` já existe no arquivo, na linha 53, e é usado assim em outras
seções. A indentação acima é a real do arquivo naquele ponto: preserve.

## Conteúdo — pt

1. **Quanto tempo dura o passeio?** — Aproximadamente 2 horas, do começo ao fim.
2. **Onde o passeio começa e termina?** — Na saída C do metrô São Conrado. O começo e o fim são no mesmo lugar.
3. **Em quais dias e horários o passeio acontece?** — Todos os dias, das 09:00 às 17:00.
4. **O que está incluído?** — Deslocamento de moto táxi, espetáculo de capoeira, vídeo de drone e visita a uma laje para fotos.
5. **O que não está incluído?** — Bebidas, como caipirinha e cerveja.
6. **O passeio é privado ou compartilhado?** — Existem os dois formatos: privado ou compartilhado.
7. **Quem conduz o passeio?** — Wallace Oliveira, nascido e criado na Rocinha.
8. **Em quais idiomas o passeio é conduzido?** — O Wallace conduz em português e espanhol. O atendimento também é feito em inglês.
9. **Como funciona o pagamento?** — O pagamento é feito ao final do passeio.
10. **Quais formas de pagamento são aceitas?** — Real, dólar, euro e cartão de crédito.
11. **Quem pode participar?** — Pessoas sozinhas, casais, famílias, crianças, idosos e grupos privados. Não há idade mínima, desde que a criança esteja acompanhada de um responsável legal maior de 18 anos.
12. **E se chover?** — Em dia de muita chuva o passeio é adiado: a filmagem de drone não acontece e andar de moto na chuva é perigoso.

## Conteúdo — en

1. **How long is the tour?** — About 2 hours, from start to finish.
2. **Where does the tour start and end?** — At exit C of the São Conrado metro station. It starts and ends at the same place.
3. **Which days and times does the tour run?** — Every day, from 9:00 to 17:00.
4. **What is included?** — Motorcycle taxi ride, a capoeira performance, a drone video and a visit to a rooftop for photos.
5. **What is not included?** — Drinks, such as caipirinha and beer.
6. **Is the tour private or shared?** — Both formats exist: private or shared.
7. **Who guides the tour?** — Wallace Oliveira, born and raised in Rocinha.
8. **Which languages is the tour guided in?** — Wallace guides in Portuguese and Spanish. Support is also available in English.
9. **How does payment work?** — Payment is made at the end of the tour.
10. **Which payment methods are accepted?** — Brazilian real, US dollar, euro and credit card.
11. **Who can join the tour?** — Solo travellers, couples, families, children, older people and private groups. There is no minimum age, as long as a child is accompanied by a legal guardian over 18.
12. **What happens if it rains?** — On a very rainy day the tour is postponed: the drone cannot film and riding a motorcycle in the rain is dangerous.

## Conteúdo — es

1. **¿Cuánto dura el paseo?** — Aproximadamente 2 horas, de principio a fin.
2. **¿Dónde empieza y termina el paseo?** — En la salida C del metro São Conrado. Empieza y termina en el mismo lugar.
3. **¿Qué días y horarios funciona el paseo?** — Todos los días, de 09:00 a 17:00.
4. **¿Qué incluye?** — Traslado en mototaxi, espectáculo de capoeira, video con dron y visita a una azotea para fotos.
5. **¿Qué no incluye?** — Bebidas, como caipiriña y cerveza.
6. **¿El paseo es privado o compartido?** — Existen los dos formatos: privado o compartido.
7. **¿Quién guía el paseo?** — Wallace Oliveira, nacido y criado en la Rocinha.
8. **¿En qué idiomas se guía el paseo?** — Wallace guía en portugués y español. La atención también se hace en inglés.
9. **¿Cómo funciona el pago?** — El pago se hace al final del paseo.
10. **¿Qué formas de pago se aceptan?** — Real, dólar, euro y tarjeta de crédito.
11. **¿Quién puede participar?** — Personas solas, parejas, familias, niños, personas mayores y grupos privados. No hay edad mínima, siempre que el niño esté acompañado por un responsable legal mayor de 18 años.
12. **¿Y si llueve?** — En día de mucha lluvia el paseo se aplaza: el dron no puede filmar y andar en moto bajo la lluvia es peligroso.

## CSS

Em `src/App.css`, **acrescente ao fim do arquivo** só o necessário para a seção
ficar legível, no estilo do arquivo: `summary` com `cursor: pointer`, separação
entre os itens, e largura confortável em 390 px. Não crie animação nova. **Não
altere nenhuma regra existente**, e em especial não toque no bloco
`@media (prefers-reduced-motion: reduce)` que fecha o arquivo — acrescente
depois dele.

## Critério de pronto (comandos que rodam, não adjetivo)

Da raiz do worktree, todos têm que passar:

1. `npm run build` → verde
2. `node quick-verify.cjs` → `OK: Todas as validações passaram`
3. `node verify-agents.cjs` → `OK: 36 verificações` (baseline de 04/09/2026;
   abaixo disso é reprovação)
4. `grep -c "faq" src/App.js` → pelo menos 5
5. Este comando imprime as duas frases, porque o build gera HTML estático:

```
grep -c "Quanto tempo dura o passeio?" dist/index.html
grep -c "E se chover?" dist/index.html
```

6. `git status --porcelain` lista **apenas** `src/App.js` e `src/App.css`

## Entrega

Deixe as mudanças no worktree, sem commit. No fim, escreva a saída literal dos
seis comandos acima e o `git diff --stat`.
