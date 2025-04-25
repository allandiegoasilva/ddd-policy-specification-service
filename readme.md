
## 1. Specification
A Specification é um padrão que define critérios de negócios ou regras que determinam se um objeto (ou uma entidade) atende a certas condições. Basicamente, ela permite que você crie regras de negócios reutilizáveis e combináveis sem poluir as entidades com lógica adicional. 


#### Características principais:
- Encapsula regras de negócios: Ao invés de espalhar regras por várias partes do código (como dentro de entidades ou serviços), você coloca essas regras em uma classe ou objeto chamado de "Specification".
- Composição: Specifications podem ser combinadas de várias maneiras (usando AND, OR, NOT), o que permite criar regras complexas a partir de regras simples.
- Desacoplamento: Ao usar Specifications, você mantém suas entidades e serviços desacoplados das regras de negócios, o que facilita a manutenção e a evolução do sistema.


#### Exemplo de Specification:

Imaginando um sistema de e-commerce, temos uma Specification que verifica se um pedido pode ser aprovado.

```typescript
class CanApproveOrderSpecification {
  isSatisfiedBy(order: Order): boolean {
    return order.totalAmount <= 5000 && order.customer.isEligibleForDiscount;
  }
}
```

Neste caso, a Specification está dizendo se um pedido pode ser aprovado ou não, com base no valor do pedido e se o cliente é elegível para desconto.

#### Tipos de specifications
______________________________________________________________________________
Tipo          | O que faz                                                        
Simple        | Uma regra simples (ex: preço > 100)
Composite     | Combina várias (AND, OR, NOT)
Parameterized | Recebe parâmetro externo (ex: categoria = “livros”)
Query/Filter  | Constrói expressão de busca para repositório/ORM
Validation    | Valida estado antes de ação
Business Rule | Regras de negócio central (ex: pode publicar, pode vender)
______________________________________________________________________________

## 2. Policy

A Policy é um padrão que encapsula decisões de negócios e define como uma regra deve ser aplicada a uma situação específica. Enquanto Specification define condições (se uma entidade ou situação atende a uma regra), a Policy aplica a regra (ex: como um desconto deve ser aplicado a um pedido).

#### Características principais:
Decisão e aplicação: As Policies não verificam apenas se uma condição é verdadeira ou falsa, elas especificam o que deve ser feito em uma situação, muitas vezes alterando o estado do domínio.

Especialização: Uma Policy pode ser mais especializada e dinâmica que uma Specification, podendo envolver mais lógica de negócios e interações com o estado da entidade.

Separação de preocupações: Elas permitem que decisões importantes de negócios sejam tomadas em um lugar separado, evitando sobrecarregar as entidades com lógica complexa.

#### Exemplo de Policy:

Voltando ao sistema de e-commerce, uma Policy pode aplicar um desconto a um pedido aprovado.

```typescript
class ApplyDiscountPolicy {
  apply(order: Order): void {
    if (order.customer.isEligibleForDiscount) {
      order.totalAmount *= 0.9; // Aplica 10% de desconto
    }
  }
}
```

Aqui, a Policy aplica um desconto de 10% ao pedido, caso o cliente seja elegível para isso. A Policy é a ação que modifica o estado do pedido de acordo com uma regra de negócios.


### 3. Domain Service

O Domain Service é um serviço que encapsula lógica de negócios que não se encaixa diretamente em uma entidade ou valor objeto. Ele orquestra a interação entre entidades, agregados ou até mesmo outras partes do sistema, de forma a aplicar regras de negócios complexas. Um Domain Service pode usar Specifications e Policies para aplicar regras específicas no domínio.

#### Características principais:
Orquestração de lógica de negócios: Ele agrupa operações complexas e interações entre várias entidades.

Separa responsabilidades: Ele mantém as entidades mais simples, movendo a lógica complexa para o serviço.

Reutilização: Permite que regras e operações complexas sejam reutilizadas em várias partes do sistema.

#### Exemplo de Domain Service:

No nosso sistema de e-commerce, um Domain Service pode ser responsável por aprovar um pedido, utilizando a Specification para verificar se o pedido pode ser aprovado e a Policy para aplicar as regras de negócios (como o desconto).

```typescript
class OrderApprovalService {
  constructor(
    private specification: CanApproveOrderSpecification,
    private discountPolicy: ApplyDiscountPolicy
  ) {}

  approveOrder(order: Order): void {
    if (!this.specification.isSatisfiedBy(order)) {
      throw new Error('Pedido não pode ser aprovado');
    }

    this.discountPolicy.apply(order);  // Aplica o desconto, se necessário
    order.status = 'Aprovado';         // Atualiza o status do pedido
  }
}
```

Neste caso, o Domain Service (OrderApprovalService) orquestra o processo de aprovação do pedido. Ele chama a Specification para verificar se o pedido pode ser aprovado e a Policy para aplicar o desconto.