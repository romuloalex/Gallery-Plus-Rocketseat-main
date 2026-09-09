// Importa a função 'tv' para criar variantes CSS e 'VariantProps' para capturar a tipagem delas
import { tv, type VariantProps } from "tailwind-variants";
// Importa o SVG do ícone de check (o "?react" indica que o construtor Vite transformará o SVG num componente React)
import CheckIcon from "../assets/icons/check.svg?react";
// Importa o componente embrulho de ícones padronizado do projeto
import Icon from "./icon";

// Estilos do contêiner externo (a tag <label>)
export const InputCheckboxWrapperVariants = tv({
  base: `
        // 'inline-flex' alinha na mesma linha sem ocupar 100% da largura, 'relative' permite sobrepor o ícone dentro dele
        // 'group' cria uma marcação para que os elementos filhos saibam quando a label toda recebe hover
        inline-flex items-center justify-center relative group
    `,
  variants: {
    disabled: {
      // Remove as interações de clique e deixa a label semi-transparente quando desativada
      true: "pointer-events-none opacity-80",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

// Estilos aplicados diretamente na tag nativa <input>
export const InputCheckboxVariants = tv({
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
      // Medidas exatas do quadrado para os tamanhos pequeno e médio
      sm: "w-3 h-3 rounded-sm",
      md: "w-5 h-5 rounded-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Estilos para o ícone de "V" (check)
export const InputCheckboxIconVariants = tv({
  base: `
        // Posiciona o ícone de forma absoluta, centralizado verticalmente usando top-1/2 e -translate-y-1/2
        absolute top-1/2 -translate-y-1/2
        // 'hidden' esconde o ícone por padrão. 'peer-checked:block' mostra o ícone SÓ QUANDO o input vizinho (peer) estiver checado!
        hidden peer-checked:block fill-white
        cursor-pointer
    `,
  variants: {
    size: {
      // Tamanho e ajuste milimétrico de posição (left) para encaixar no quadrado certo
      sm: "w-3 h-3 left-px",
      md: "w-4 h-4 left-0.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// Une as propriedades customizadas (variant, size) com os atributos HTML padrão de um <input>
// Omitimos a prop 'size' do HTML nativo para evitar conflito com a nossa prop de variante 'size'
interface InputCheckboxProps
  extends
    VariantProps<typeof InputCheckboxVariants>,
    Omit<React.ComponentProps<"input">, "size"> {}

// Função que renderiza o componente na tela
export default function InputCheckbox({
  variant,
  size,
  disabled,
  className,
  ...props // Agrupa o resto das props (onChange, checked, name, value, etc)
}: InputCheckboxProps) {
  // Renderiza a label como base clicável
  return (
    <label className={InputCheckboxWrapperVariants({ className, disabled })}>
      {/* O input verdadeiro. Ele fica invisível (graças ao appearance-none), mas ainda registra o clique e o foco */}
      <input
        type="checkbox"
        className={InputCheckboxVariants({ variant, size })}
        {...props}
      />
      {/* O ícone de check. Fica observando o input através da classe peer-checked */}
      <Icon svg={CheckIcon} className={InputCheckboxIconVariants({ size })} />
    </label>
  );
}
