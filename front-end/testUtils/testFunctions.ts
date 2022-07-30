import { act, fireEvent, RenderResult } from "@testing-library/react";

export const changeField = (
  component: RenderResult,
  fieldName: string,
  value: string
): void => {
  act(() => {
    fireEvent.change(component.getByLabelText(fieldName), {
      target: { value: value },
    });
  });
};
