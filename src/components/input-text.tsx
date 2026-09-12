import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const InputTextContainerVariants = tv({
  base: "flex flex-col gap-1",
});

/**
 * Variantes do contêiner visual que simula a caixa do input.
 *
 * WARNING: A classe `focus:border-border-active` não será acionada quando
 * o usuário focar no input interno. Para que a borda do wrapper mude de cor
 * ao focar no input nativo, deve-se utilizar `focus-within:`.
 */
export const InputTextWrapperVariant = tv({
  base: `
        border border-solid border-border-primary
        focus:border-border-active bg-transparent
        rounded flex items-center gap-3
    `,
  variants: {
    size: {
      md: "h-10 p-3",
    },
    disabled: {
      true: "pointer-events-none", // TODO: Falta feedback visual para o estado desabilitado (ex: opacity-50 ou bg-gray-100)
    },
  },
  defaultVariants: {
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
  extends
    VariantProps<typeof InputTextWrapperVariant>,
    Omit<React.ComponentProps<"input">, "size" | "disabled"> {
  icon?: React.ComponentProps<typeof Icon>["svg"];
  error?: React.ReactNode;
}

export const InputTextVariants = tv({
  base: `
        bg-transparent outline-none placeholder:text-placeholder
        text-accent-paragraph flex-1
    `,
});

export const InputTextIconVariants = tv({
  base: "fill-placeholder",
  variants: {
    size: {
      md: "w-6 h-6",
    },
  },
  defaultVariants: {
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
  size,
  disabled,
  className,
  icon,
  error,
  ...props
}: InputTextProps) {
  return (
    <div className={InputTextContainerVariants({ className })}>
      <div className={InputTextWrapperVariant({ size, disabled })}>
        {icon && (
          <Icon svg={icon} className={InputTextIconVariants({ size })} />
        )}

        {/* 
          WARNING: O casting `disabled as boolean` é necessário aqui porque o tipo `disabled` 
          inferido do tailwind-variants pode ser string ("true"/"false") dependendo da configuração.
        */}
        <input
          className={InputTextVariants({})}
          disabled={disabled as boolean}
          {...props}
        />
      </div>

      {error && (
        <Text variant="label-small" className="text-accent-red">
          {error}
        </Text>
      )}
    </div>
  );
}
