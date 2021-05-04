import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Confirm Order button in disables by default", () => {
  render(<SummaryForm />);
  const button = screen.getByRole("button", { name: "Confirm Order" });
  expect(button).toBeDisabled();
});

test("Acceptance checkbox enables/disables 'Confirm Order' button", () => {
  render(<SummaryForm />);
  const button = screen.getByRole("button", { name: "Confirm Order" });
  const checkbox = screen.getByRole("checkbox", {
    name: "Accept Terms and Conditions",
  });

  expect(button).toBeDisabled();

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("Popover not display by default", () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    /no icecrem will be actually delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
});

// test("Popover responds to hover",async () => {
  // //starts hidden
  // render(<SummaryForm />);
  // const nullPopover = screen.queryByText(
  //   /no icecrem will be actually delivered/i
  // );
  // expect(nullPopover).not.toBeInTheDocument();

  // //appears when mouse over
  // const termsAndconditions = screen.getByText(/accept terms and conditions/i)
  // userEvent.hover(termsAndconditions)
  // const popover = screen.queryByText(
  //   /no icecrem will be actually delivered/i
  // );
  // expect(popover).toBeInTheDocument();

  // disapears when mouse out
  // userEvent.unhover(termsAndconditions)
  // await waitForElementToBeRemoved(()=>{
  //   screen.queryByText(
  //     /no icecrem will be actually delivered/i
  //     );
  //   })
// });
