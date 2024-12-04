import BaseButton from "./BaseButton";

export const PrimaryButton = ({
  children,
  ...props
}: React.ComponentProps<typeof BaseButton>) => {
  return (
    <BaseButton
      {...props}
      className="bg-primary hover:bg-secondary hover:text-black text-white mb-5"
    >
      {children}
    </BaseButton>
  );
};
