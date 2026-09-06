# Tarefa D2 — perguntas frequentes na página e como dado estruturado

Worktree isolado. **Arquivos que você pode alterar, e só estes quatro:**

- `src/App.js`
- `src/App.css`
- `index.html`
- `verify-agents.cjs`

Nenhum outro arquivo. Não crie arquivo novo, não crie pasta, não rode `git add`
nem `git commit`.

## Objetivo

A página passa a responder por escrito as perguntas que o turista faz antes de
reservar, nos três idiomas, e o mesmo conteúdo passa a existir como dado
estruturado `FAQPage`. É isso que faz o Google e os sistemas de IA responderem
por este negócio em vez de mandar o usuário embora.

## Regras que incidem, escritas por extenso

**Nenhum valor, em nenhum idioma, em nenhum campo.** Não entra preço, faixa de
preço, "a partir de", `Offer`, `priceRange` nem `priceSpecification`. Decisão do
dono do produto: no turismo as taxas mudam de um dia para o outro, e "a partir
de" ancora a negociação no piso. O preço é negociado no ato.

**Texto de venda não se inventa.** Todo o conteúdo abaixo veio do cliente. Não
acrescente pergunta, não acrescente resposta, não "melhore" o texto, não invente
política de cancelamento, reembolso, seguro, certificação ou tempo de
experiência. O que não está escrito aqui não vai para a página.

**O acabamento aprovado não muda.** A página já foi aprovada pelo cliente. Você
está acrescentando uma seção, não redesenhando nada. Não mexa em nenhuma seção
existente além de inserir a nova no lugar indicado.

**Celular primeiro.** A seção tem que ficar legível em 390 px de largura.

**O site é trilíngue.** Todo texto novo entra em pt-BR, en e es. Os três
dicionários ficam no objeto `localized` de `src/App.js`, nas chaves `pt`, `en` e
`es`.

## Onde a seção entra

Em `src/App.js`, imediatamente **antes** da seção final de contato — aquela que
tem `id="contact"` e `data-testid="final-cta-section"`. As perguntas ficam
respondidas logo antes do botão de reservar.

## Marcação

Use `<details>` e `<summary>` nativos: sem JavaScript, sem estado, sem
biblioteca, e o texto continua dentro do HTML para o buscador ler. A seção segue
o padrão das outras:

```jsx
<section className="faq section-pad" id="faq" data-testid="faq-section">
  <div className="section-label reveal">{t.faq}</div>
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

`t` e `l` são as variáveis já usadas no componente para o dicionário de rótulos
e o dicionário localizado — confira como as outras seções fazem e siga igual.
Acrescente a chave `faq` também ao objeto `copy` (o rótulo da seção), nos três
idiomas: `"Perguntas frequentes"`, `"Frequently asked questions"`,
`"Preguntas frecuentes"`.

Em `src/App.css`, acrescente só o necessário para a seção ficar legível, no
estilo do arquivo: `summary` clicável com cursor de ponteiro, separação entre
itens, e largura confortável em 390 px. **Não crie animação nova** e não mexa em
nenhuma regra existente. O bloco `prefers-reduced-motion` que já existe no
projeto não pode ser alterado nem removido.

## Conteúdo — pt-BR

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

## Dado estruturado

Em `index.html` existe um único bloco `<script type="application/ld+json">` com
um `@graph`. Acrescente **um nó novo** ao fim do `@graph`, do tipo `FAQPage`,
com `@id` `https://www.wlfavelatour.com.br/#perguntas` e uma lista `mainEntity`
com as doze perguntas.

Confira no arquivo qual é o `@id` real do nó `WebPage` antes de escrever um
campo `isPartOf` apontando para ele; se não houver um nó `WebPage`, omita o
campo em vez de inventar.

Cada item de `mainEntity` tem esta forma:

```json
{
  "@type": "Question",
  "name": "Quanto tempo dura o passeio?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Aproximadamente 2 horas, do começo ao fim."
  }
}
```

**O texto do dado estruturado é o texto pt-BR, palavra por palavra, igual ao que
aparece na tela.** O Google desconsidera `FAQPage` cujo texto não está visível
na página. Nada de resumir, encurtar ou reescrever aqui.

### Formatação do `index.html` — reprovação automática

Duas tentativas anteriores de outra tarefa foram reprovadas por reformatar este
arquivo. **Nunca** passe o JSON por `JSON.parse` seguido de `JSON.stringify`
para gravar. Edite o texto no lugar: arrays que estão em uma linha continuam em
uma linha, a indentação irregular é preservada, nenhum nó existente é
reordenado, reindentado ou tocado. O `git diff` do `index.html` só pode conter
as linhas do nó novo.

## Teste

`verify-agents.cjs` é a suíte de verificação do projeto. Acrescente ao fim dela,
seguindo o estilo das verificações que já existem, checagens que:

1. leem o `index.html`, extraem o bloco JSON-LD e navegam o objeto **já
   parseado** a partir do nó `FAQPage` — nunca com busca de texto no arquivo
   inteiro, que é o erro registrado em `docs/APRENDIZADO.md`;
2. exigem que o `FAQPage` exista, tenha exatamente 12 itens em `mainEntity`, e
   que cada item tenha `name` e `acceptedAnswer.text` não vazios;
3. exigem que exista o nó `Person` com `@id`
   `https://www.wlfavelatour.com.br/#wallace` e que o nó da organização o
   referencie por `founder` e por `employee`;
4. exigem que o JSON-LD inteiro não contenha `price`, `Offer`, `priceRange` nem
   `priceSpecification`;
5. exigem que o HTML gerado em `dist/index.html` contenha, como texto visível, a
   primeira e a última pergunta em pt-BR.

Diga no relatório **quantas verificações você acrescentou** e qual é o novo
total impresso por `node verify-agents.cjs`. A baseline anterior era
`OK: 36 verificações`, apurada em 04/09/2026 — o novo total tem que ser 36 mais
o que você criou, nunca menos.

## Critério de pronto (comandos que rodam)

Da raiz do worktree:

1. `npm run build` → verde
2. `node quick-verify.cjs` → `OK: Todas as validações passaram`
3. `node verify-agents.cjs` → `OK: N verificações`, com N maior que 36
4. Este comando não imprime nada:
   `grep -rnI "price\|Offer\|priceRange" index.html src/App.js`
5. O `dist/index.html` gerado pelo build contém as duas frases
   `Quanto tempo dura o passeio?` e `E se chover?`
6. `git status --porcelain` lista **apenas** os quatro arquivos permitidos

No fim, cole a saída literal de cada comando acima e o `git diff --stat`.
