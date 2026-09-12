import { tv, type VariantProps } from "tailwind-variants";
// Importa o helper `tv` para criar classes de variantes e o tipo `VariantProps` para manter a tipagem consistente com a API de variantes do Tailwind.
import Icon from "./icon";
// Importa o componente de ícone reutilizável, que será exibido à esquerda do campo quando informado.
import Text from "./text";
// Importa o componente de texto para renderizar a mensagem de erro com o mesmo visual da interface.

export const InputTextContainerVariants = tv({
  // Define o layout externo do campo: empilha o wrapper e a mensagem de erro em uma coluna vertical.
  base: "flex flex-col gap-1",
  // A propriedade `gap-1` cria uma separação pequena entre o input e o texto de erro.
});

/**
 * Variantes do contêiner visual que simula a caixa do input.
 *
 * WARNING: A classe `focus:border-border-active` não será acionada quando
 * o usuário focar no input interno. Para que a borda do wrapper mude de cor
 * ao focar no input nativo, deve-se utilizar `focus-within:`.
 */
export const InputTextWrapperVariant = tv({
  // Define a aparência do wrapper do input, incluindo borda, alinhamento interno e comportamento ao focar.
  base: `
        border border-solid border-border-primary
        focus-within:border-border-active bg-transparent
        rounded flex items-center gap-3
    `,
  // O `focus-within` é usado porque o foco real acontece no `<input>` interno e não no container externo.
  variants: {
    size: {
      // Ajusta a altura e o espaçamento do campo para o tamanho padrão do design system.
      md: "h-10 p-3",
    },
    disabled: {
      // Quando desabilitado, o wrapper bloqueia eventos de clique para impedir interação do usuário.
      true: "pointer-events-none opacity-50 bg-neutral-100",
      // TODO: Ainda falta feedback visual mais explícito, como opacidade ou fundo cinza no estado desabilitado.
    },
  },
  defaultVariants: {
    // Define os valores padrão de `size` e `disabled` para evitar propriedades indefinidas.
    size: "md",
    disabled: false,
  },
});

/**
 * Contrato de propriedades para o componente InputText.
 *
 * Herda tipos do tailwind-variants e omite `size` e `disabled` nativos
 * do React.ComponentProps para evitar colisão de tipagem com as variantes definidas acima.
 */
interface InputTextProps
  // Herda as variantes do wrapper para permitir que `size` e `disabled` sejam tratados como props do componente.
  extends
    VariantProps<typeof InputTextWrapperVariant>,
    // Remove as props nativas do HTML que entram em conflito com as variantes customizadas da biblioteca.
    Omit<React.ComponentProps<"input">, "size" | "disabled"> {
  // Permite que o consumidor passe um ícone SVG opcional para dar contexto visual ao campo.
  icon?: React.ComponentProps<typeof Icon>["svg"];
  // Permite renderizar uma mensagem de erro em JSX ou texto simples abaixo do input.
  error?: React.ReactNode;
}

export const InputTextVariants = tv({
  // Define o estilo do input interno para remover borda e manter a aparência minimalista do campo.
  base: `
        bg-transparent outline-none placeholder:text-placeholder
        text-accent-paragraph flex-1
    `,
  // O `flex-1` faz o input ocupar o espaço restante ao lado do ícone dentro do wrapper.
});

export const InputTextIconVariants = tv({
  // Define a aparência padrão do ícone, mantendo a cor em tom de placeholder para manter o visual suave.
  base: "fill-placeholder",
  variants: {
    size: {
      // Ajusta a dimensão do ícone para combinar com a altura do campo do input.
      md: "w-6 h-6",
    },
  },
  defaultVariants: {
    // Garante que o ícone use o tamanho padrão caso nenhuma variante seja informada.
    size: "md",
  },
});

/**
 * Componente de entrada de texto (Input) customizado.
 *
 * Renderiza um input nativo encapsulado em um wrapper estilizável,
 * suportando ícone opcional à esquerda e mensagem de erro dinâmica.
 *
 * @param {InputTextProps} props - Propriedades do input, incluindo variantes e atributos nativos.
 */
export default function InputText({
  // Recebe o tamanho da variante do wrapper para controlar altura e espaçamento interno.
  size,
  // Recebe o estado de habilitação para desabilitar a interação do campo quando necessário.
  disabled,
  // Permite adicionar classes extras por parte do componente pai sem quebrar o layout base.
  className,
  // Recebe o ícone que será renderizado à esquerda do campo, se existir.
  icon,
  // Recebe a mensagem de erro para exibir abaixo do input.
  error,
  // Coleta os demais atributos nativos do input, como `placeholder`, `value`, `name` e `onChange`.
  ...props
}: InputTextProps) {
  return (
    // O container externo organiza o wrapper do campo e o texto de erro em uma pilha vertical.
    <div className={InputTextContainerVariants({ className })}>
      {/* O wrapper representa o visual do campo, com borda, arredondamento e alinhamento do ícone + input. */}
      <div className={InputTextWrapperVariant({ size, disabled })}>
        {/* Renderiza o ícone apenas quando uma referência de SVG foi passada pela prop `icon`. */}
        {icon && (
          <Icon svg={icon} className={InputTextIconVariants({ size })} />
        )}

        {/*
          O cast `disabled as boolean` é necessário porque a propriedade `disabled` pode vir como string (
          "true" / "false") dependendo da configuração interna do `tailwind-variants`, e o input nativo exige boolean.
        */}
        <input
          // Mantém a aparência do input transparente e sem borda para combinar com o wrapper visual.
          className={InputTextVariants({})}
          // Converte a prop de variantes para boolean antes de enviar ao input nativo.
          disabled={disabled as boolean}
          // Repassa o restante das propriedades do input, como placeholder, value, onChange e name.
          {...props}
        />
      </div>

      {/* Exibe o texto de erro somente quando a prop `error` for informada. */}
      {error && (
        <Text variant="label-small" className="text-accent-red">
          {error}
        </Text>
      )}
    </div>
  );
}
