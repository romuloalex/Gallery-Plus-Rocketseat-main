import { tv, type VariantProps } from "tailwind-variants";
import CheckIcon from "../assets/icons/check.svg?react";
import Icon from "./icon";

/**
 * Variantes de estilo para o contêiner raiz do componente (tag <label>).
 * Utiliza o modificador 'group' do Tailwind para permitir que elementos filhos
 * reajam ao estado de 'hover' aplicado à label inteira.
 */
export const InputCheckboxWrapperVariants = tv({
  // WARNING: A presença de comentários (//) dentro de uma template string injetará esses
  // caracteres no atributo 'className' final do HTML, o que pode gerar classes CSS inválidas.
  base: `
        // 'inline-flex' alinha na mesma linha sem ocupar 100% da largura, 'relative' permite sobrepor o ícone dentro dele
        // 'group' cria uma marcação para que os elementos filhos saibam quando a label toda recebe hover
        inline-flex items-center justify-center relative group
    `,
  variants: {
    disabled: {
      true: "pointer-events-none opacity-80",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

/**
 * Variantes de estilo para a tag nativa <input type="checkbox">.
 * A lógica central depende da classe 'appearance-none' para ocultar o estilo nativo
 * do SO/Navegador, e da classe 'peer' para atuar como emissor de estado (checked) para o ícone vizinho.
 */
export const InputCheckboxVariants = tv({
  // WARNING: Comentários (//) dentro da template string também presentes aqui.
  base: `
        // 'appearance-none' é a mágica aqui: apaga o visual padrão de checkbox do sistema operacional/navegador!
        // 'peer' marca o input como uma referência de estado (checado/não checado) para elementos vizinhos
        appearance-none peer flex items-center justify-center cursor-pointer
        transition overflow-hidden
    `,
  variants: {
    variant: {
      default: `
                // Visual padrão do quadradinho vazio (bordas cinzas)
                border-2 border-solid
                border-border-primary hover:border-border-active
                // Estilos aplicados automaticamente SÓ quando o checkbox é marcado
                checked:border-accent-brand checked:bg-accent-brand
                // Estilos se o mouse estiver sobre o "group" (a label) E o checkbox estiver marcado
                group-hover:checked:border-accent-brand-light
                group-hover:checked:bg-accent-brand-light
            `,
    },
    size: {
      sm: "w-3 h-3 rounded-sm",
      md: "w-5 h-5 rounded-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

/**
 * Variantes de estilo para o ícone de marcação (check).
 * Utiliza posicionamento absoluto para sobrepor o input invisível e a classe 'peer-checked:block'
 * para renderização condicional baseada no estado do input vizinho.
 */
export const InputCheckboxIconVariants = tv({
  // WARNING: Comentários (//) dentro da template string.
  base: `
        // Posiciona o ícone de forma absoluta, centralizado verticalmente usando top-1/2 e -translate-y-1/2
        absolute top-1/2 -translate-y-1/2
        // 'hidden' esconde o ícone por padrão. 'peer-checked:block' mostra o ícone SÓ QUANDO o input vizinho (peer) estiver checado!
        hidden peer-checked:block fill-white
        cursor-pointer
    `,
  variants: {
    size: {
      sm: "w-3 h-3 left-px",
      md: "w-4 h-4 left-0.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Interface de propriedades do InputCheckbox.
 * Decisão Técnica: Omitimos o atributo 'size' nativo do <input> para evitar colisão
 * de tipagem com a propriedade 'size' gerada pelo tailwind-variants.
 */
interface InputCheckboxProps
  extends
    VariantProps<typeof InputCheckboxVariants>,
    Omit<React.ComponentProps<"input">, "size"> {}

/**
 * Componente InputCheckbox controlado/não-controlado.
 * Encapsula a lógica visual de um checkbox customizado, mantendo a acessibilidade e
 * o comportamento semântico da tag HTML original.
 *
 * @param props - Desestrutura variant, size, disabled, className e repassa as demais props nativas ao input.
 */
export default function InputCheckbox({
  variant,
  size,
  disabled,
  className,
  ...props
}: InputCheckboxProps) {
  // TODO: O componente não expõe suporte para `ref` nativo, limitando a integração
  // com bibliotecas de manipulação de formulários (ex: react-hook-form) ou foco programático.
  return (
    <label className={InputCheckboxWrapperVariants({ className, disabled })}>
      <input
        type="checkbox"
        className={InputCheckboxVariants({ variant, size })}
        // TODO: A propriedade 'disabled' no input não está sendo recebida como atributo HTML.
        // Ela é passada para a classe do wrapper, mas o input nativo ainda pode receber
        // foco pelo teclado e ser alternado se não for explicitamente desabilitado aqui.
        {...props}
      />
      <Icon svg={CheckIcon} className={InputCheckboxIconVariants({ size })} />
    </label>
  );
}
