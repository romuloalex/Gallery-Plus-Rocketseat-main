// Importa a função que cria variantes de classes e o tipo usado para inferir suas propriedades.
import { tv, type VariantProps } from "tailwind-variants";
// Importa o componente React gerado a partir do SVG do ícone de confirmação.
import CheckIcon from "../assets/icons/check.svg?react";
// Importa o componente interno responsável por renderizar o SVG com classes personalizadas.
import Icon from "./icon";

// Cria as variantes de estilo do elemento <label> que envolve o checkbox.
export const InputCheckboxWrapperVariants = tv({
  // Mantém o label como um contêiner flexível, relativo e identificável como grupo pelo Tailwind.
  base: "inline-flex items-center justify-center relative group",
  // Define estilos condicionais para o estado desabilitado do componente.
  variants: {
    // Seleciona as classes aplicadas quando disabled for true ou false.
    disabled: {
      // Impede interações do ponteiro e reduz a opacidade quando o componente está desabilitado.
      true: "pointer-events-none opacity-80",
    },
  },
  // Usa false como valor padrão para o estado disabled do wrapper.
  defaultVariants: {
    disabled: false,
  },
});

// Cria as variantes de estilo do elemento nativo <input type="checkbox">.
export const InputCheckboxVariants = tv({
  // Remove a aparência nativa, registra o input como peer e habilita transições e interação visual.
  base: "appearance-none peer flex items-center justify-center cursor-pointer transition overflow-hidden",
  // Declara as opções de aparência disponíveis para o input.
  variants: {
    // Define a variação visual do checkbox.
    variant: {
      // Aplica borda padrão, estados de hover e cores específicas para o estado marcado.
      default:
        "border-2 border-solid border-border-primary hover:border-border-active checked:border-accent-brand checked:bg-accent-brand group-hover:checked:border-accent-brand-light group-hover:checked:bg-accent-brand-light",
    },
    // Define os tamanhos suportados pelo checkbox.
    size: {
      // Cria o tamanho pequeno com dimensões de 12 por 12 pixels.
      sm: "w-3 h-3 rounded-sm",
      // Cria o tamanho médio com dimensões de 20 por 20 pixels.
      md: "w-5 h-5 rounded-sm",
    },
  },
  // Usa a variante default e o tamanho md quando nenhuma opção é informada.
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Cria as variantes de estilo do ícone exibido quando o checkbox está marcado.
export const InputCheckboxIconVariants = tv({
  // Posiciona o ícone sobre o input e o oculta até o peer ser marcado.
  base: "absolute top-1/2 -translate-y-1/2 hidden peer-checked:block fill-white cursor-pointer",
  // Declara os tamanhos possíveis para o ícone.
  variants: {
    // Seleciona o tamanho correspondente ao checkbox.
    size: {
      // Ajusta o ícone para acompanhar o checkbox pequeno.
      sm: "w-3 h-3 left-px",
      // Ajusta o ícone para acompanhar o checkbox médio.
      md: "w-4 h-4 left-0.5",
    },
  },
  // Usa md como tamanho padrão do ícone.
  defaultVariants: {
    size: "md",
  },
});

// Combina as variantes visuais com as propriedades nativas de um input HTML.
interface InputCheckboxProps
  // Obtém variant e size a partir da configuração de InputCheckboxVariants.
  extends
    VariantProps<typeof InputCheckboxVariants>,
    // Remove o size nativo para evitar conflito com a variante size do componente.
    Omit<React.ComponentProps<"input">, "size"> {}

// Renderiza um checkbox customizado que continua usando o comportamento semântico do input nativo.
export default function InputCheckbox({
  // Recebe a variação visual do checkbox.
  variant,
  // Recebe o tamanho usado pelo input e pelo ícone.
  size,
  // Recebe o estado de desabilitado do componente.
  disabled,
  // Recebe classes adicionais para o wrapper externo.
  className,
  // Reúne todas as outras propriedades nativas do input.
  ...props
}: InputCheckboxProps) {
  // O label permite clicar na área do componente para alternar o input associado.
  return (
    // Aplica as classes do wrapper e informa visualmente se ele está desabilitado.
    <label className={InputCheckboxWrapperVariants({ className, disabled })}>
      {/* Mantém o elemento nativo para preservar teclado, formulário e acessibilidade do checkbox. */}
      <input
        // Define explicitamente o tipo para impedir que o input seja tratado como texto.
        type="checkbox"
        // Gera as classes visuais usando as variantes recebidas pelo componente.
        className={InputCheckboxVariants({ variant, size })}
        // Repassa o estado disabled ao elemento nativo para bloquear foco e alterações.
        disabled={disabled}
        // Repassa propriedades como checked, onChange, name, value e aria-* ao input.
        {...props}
      />
      {/* Renderiza o ícone; o peer-checked:block controla sua visibilidade. */}
      <Icon svg={CheckIcon} className={InputCheckboxIconVariants({ size })} />
    </label>
  );
}
