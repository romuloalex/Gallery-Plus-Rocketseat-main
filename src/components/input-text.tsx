// Importa a biblioteca tailwind-variants para gerenciar classes CSS e extrair tipos de variantes
import { tv, type VariantProps } from "tailwind-variants";
// Importa o componente visual de Ícone para ser renderizado dentro do input
import Icon from "./icon";
// Importa o componente de Texto para exibir mensagens de erro customizadas
import Text from "./text";

// Cria as variantes de estilo para o contêiner externo (empilha o input e o erro em coluna)
export const InputTextContainerVariants = tv({
  base: "flex flex-col gap-1",
});

// Cria as variantes de estilo para o "wrapper" (a caixa que simula a borda do input)
export const InputTextWrapperVariant = tv({
  base: `
        border border-solid border-border-primary
        focus:border-border-active bg-transparent
        rounded flex items-center gap-3
    `,
  variants: {
    // Define o tamanho padrão da caixa (altura e espaçamento interno)
    size: {
      md: "h-10 p-3",
    },
    // Desativa a interação do mouse quando o componente estiver desabilitado
    disabled: {
      true: "pointer-events-none",
    },
  },
  // Define os valores padrão caso nenhuma propriedade seja informada
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

// Define o contrato de tipos (TypeScript) herdando as variantes e as propriedades nativas de um input HTML
interface InputTextProps
  extends
    VariantProps<typeof InputTextWrapperVariant>,
    Omit<React.ComponentProps<"input">, "size" | "disabled"> {
  icon?: React.ComponentProps<typeof Icon>["svg"]; // Propriedade opcional para receber um ícone
  error?: React.ReactNode; // Propriedade opcional para exibir uma mensagem de erro
}

// Cria os estilos para a tag nativa <input> (remove bordas nativas e ajusta o texto)
export const InputTextVariants = tv({
  base: `
        bg-transparent outline-none placeholder:text-placeholder
        text-accent-paragraph flex-1
    `,
});

// Cria as variantes de estilo para redimensionar e colorir o ícone
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

// Função principal que exporta o componente InputText
export default function InputText({
  size,
  disabled,
  className,
  icon,
  error,
  ...props // Pega todas as outras propriedades nativas do input (como placeholder, value, onChange)
}: InputTextProps) {
  return (
    // Contêiner principal que agrupa o campo e o erro, aplicando classes customizadas via className
    <div className={InputTextContainerVariants({ className })}>
      {/* Wrapper (caixa visual) que agrupa o ícone e o input estilizado lado a lado */}
      <div className={InputTextWrapperVariant({ size, disabled })}>
        {/* Renderiza o ícone condicionalmente apenas se a propriedade 'icon' for informada */}
        {icon && (
          <Icon svg={icon} className={InputTextIconVariants({ size })} />
        )}
        {/* Tag HTML nativa do input com suas respectivas regras e repasse de propriedades restantes */}
        <input
          className={InputTextVariants({})}
          disabled={disabled as boolean}
          {...props}
        />
      </div>
      {/* Renderiza a mensagem de erro em vermelho condicionalmente se a propriedade 'error' existir */}
      {error && (
        <Text variant="label-small" className="text-accent-red">
          {error}
        </Text>
      )}
    </div>
  );
}
