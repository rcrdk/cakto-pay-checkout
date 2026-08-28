# Checkout Cakto – Teste Técnico Front-end

Checkout de infoproduto com cálculo de taxas em tempo real, formulário de pagamento e resumo do repasse do produtor.

- PR: [https://github.com/rcrdk/cakto-pay-checkout/pull/2](https://github.com/rcrdk/cakto-pay-checkout/pull/2)
- Deploy: [https://cakto-pay-checkout-git-feature-checkout-rcrdk-dev.vercel.app/](https://cakto-pay-checkout-git-feature-checkout-rcrdk-dev.vercel.app/)

## Decisões Técnicas

O projeto usa Next.js (App Router) com arquitetura vertical feature-driven. A rota base está presente em `src/app/` e o componente de checkout está dentro da feature `src/features/checkout/` (UI, constants, services, schema, types e utils). Código compartilhável (UI, styles e utils) ficou em `src/shared/`. Não adotei DDD (Domain-Driven Design) nem Clean Architecture nesse projeto para não adicionar complexidade em um projeto pequeno. Em um produto real e complexo, principalmente envolvendo muitas regras de negócio, o mais adequado seria seguir com arquitetura em domínio: chamadas de API, taxas, pagamento, produto e checkout como bounded contexts, com regras isoladas da UI.

Antes de iniciar o projeto propriamente, adicionei configurações de DX (Developer Experience) para padronização e validação de código e abri um PR separado. Utilizei ESLint, Prettier e EditorConfig para padronizar formatação, regras de escrita e configurações da IDE. Configurei o Husky com commitlint na mensagem, lint e format nos arquivos staged no commit, e typecheck + testes no push. Por fim, configurei o Jest para os testes unitários e de integração.

O mock de produto está armazenado em um objeto e permanece exatamente como no enunciado (`originalPrice` e `currentPrice` em float). Os valores são convertidos para centavos (`297.00` vira `29700`) e todos os cálculos de taxas, valores e parcelas usam inteiros, com `Math.round` e basis points. A formatação em Real só acontece na exibição, via `Intl.NumberFormat`. Pensando em escalabilidade, padronização e reutilização entre projetos, preços em float deveriam sempre ser salvos em inteiro/centavos do lado do back-end.

O documento do teste possui uma inconsistência entre a regra fundamental que determina que o comprador sempre paga o `currentPrice` e a observação sobre as taxas adicionais de parcelamento. Em um produto real, essa questão deveria ser discutida/confirmada com o time (produto, negócio e pagamentos) antes de implementar. Para o teste, para manter consistência com a regra fundamental e com o requisito de total fixo do comprador, considerei todas as taxas como parte do repasse do produtor. Dessa forma, o comprador sempre paga R$ 297,00, independentemente do método ou número de parcelas.

Defini todos os pacotes do projeto (`package.json`) com versões exatas, junto com o lockfile, para o install ser reproduzível e não oscilar com range de versão, e além disso por questões de segurança: hoje acontece de muitas libs terem códigos maliciosos em versões mais recentes.

## Transparência de Uso de IA

Utilizei o Cursor para desenvolver o teste e também para ter um overview da proposta. Tenho um repositório pessoal [Agent Kit](https://github.com/rcrdk/agent-kit) com regras, padrões, comandos e templates que desenvolvo. Usei aqui para acelerar a DX e alguns processos. A configuração do Jest veio de outro projeto pessoal. Tudo isso com IA na configuração, e revisão minha em cima.

Com a base e a estrutura definidas, usei IA na primeira versão do cálculo de taxas em centavos, na listagem de parcelas, nas validações de e-mail e CPF, nos testes e numa base de UI mobile-first, depois ajustei o grid para telas maiores. Durante e ao final dos processos sempre reviso e crio manualmente o que precisa, nem sempre a IA é o melhor caminho.

Meu processo com IA: `Planejar` > `Revisar plano` > `Executar` > `Minha revisão, testes e ajustes manuais` > `Revisar com IA`

O papel da IA é ser uma ferramenta e não uma substituta do trabalho de desenvolvedor.

## Regras de Negócio

O comprador sempre paga o `currentPrice` (R$ 297,00). A taxa Cakto é descontada do produtor: PIX (0%), 1x no cartão (3,99%), 2x a 12x no cartão (4,99% + 2% por parcela extra). O resumo mostra valor do produto, total do comprador (fixo), taxa, líquido e a economia do PIX para o produtor em relação ao cartão selecionado.

## Como Executar

```bash
# Projeto:
npm install
npm run dev # http://localhost:3000

# Testes:
npm test

# DX:
npm run typecheck
npm run lint
npm run format
```

> Lint e format rodam no pre-commit (arquivos staged). Typecheck e testes rodam no pre-push.



## Resposta Bônus

> Se tivesse mais tempo, o que você faria para aumentar a conversão deste checkout?

Eu priorizaria deixar o pagamento mais fácil e os benefícios mais óbvios, em cima do que o checkout já tem e faz. O PIX já é pré-selecionado, tem o badge "Recomendado", variante destacada e ícone próprio. E é possível ir além, melhorar o contraste de cor em relação ao cartão para o olho cair no PIX primeiro, e textos que deixem óbvio a taxa zero e economia para o produtor. No cartão, o parcelamento e o aviso de que o total do comprador não muda já estão no seletor e no resumo e claro, é possível melhorar.

A troca entre PIX e cartão já faz a troca do que importa no momento: parcelas só no cartão, banner de economia do PIX só quando o cartão está selecionado. O que ao meu ver falta é a micro-interação, pois hoje o bloco entra e some de uma vez. Com Motion, por exemplo, o campo de parcelas animaria translate/altura/opacity para não gerar CLS brusco nas trocas. O botão de finalização ainda é genérico e poderia ser mais objetivo como "Finalizar com PIX" ou "Finalizar com cartão".

O submit hoje vai para `/sucesso` com a mesma confirmação para os dois métodos. Para o PIX, evoluiria isso para uma etapa real de pagamento com QR Code, código copiável (de preferência com um botão para interação prática), e um status de aguardando o pagamento (normalmente é instantâneo). No cartão, a mesma página poderia ganhar um retorno mais detalhado como com um status, parcelas escolhidas, o que foi pago e o próximo passo do acesso. Inclusive, após o pagamento do PIX poderia ter um retorno de sucesso semelhante.

Por fim, é fundamental usar ferramentas de tracking no checkout para ver o que o usuário realmente faz como troca de método, abandono no campo, tempo até copiar o PIX ou finalizar. Com isso dá para melhorar o fluxo com base no que acontece de verdade.