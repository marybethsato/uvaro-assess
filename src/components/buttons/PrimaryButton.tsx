import BaseButton from "./BaseButton";

export const PrimaryButton = ({
  children,
  ...props
}: React.ComponentProps<typeof BaseButton>) => {
  return (
    <BaseButton
      {...props}
      className="bg-primary hover:bg-red-500 text-white mb-5 w-full"
    >
      {children}
    </BaseButton>
  );
};
