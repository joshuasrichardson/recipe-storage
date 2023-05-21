const useConfirm = (
  message: string,
  onConfirm: () => void,
  onAbort: () => void
): (() => void) => {
  const confirm = () => {
    if (window.confirm(message)) onConfirm();
    else onAbort();
  };
  return confirm;
};

export default useConfirm;
