import {
  act,
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("Scoop subtotal changes when scoops changes", async () => {
  render(<Options optionType="scoops" />);

  //make sure total starts at 0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update vanilla scoop to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoop to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("Topping subtotal changes when toppings changes", async () => {
  render(<Options optionType="toppings" />);
  //Make sure it starts at 0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // It updates when we add one topping
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesCheckbox).not.toBeChecked();
  await waitFor(() => {
    userEvent.click(cherriesCheckbox);
    expect(cherriesCheckbox).toBeChecked();
  });
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // It updates when we remove one topping
  await waitFor(() => {
    userEvent.click(cherriesCheckbox);
    expect(cherriesCheckbox).not.toBeChecked();
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // It can handle two toppings
  const gummiBearsCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await waitFor(() => {
    userEvent.click(cherriesCheckbox);
    expect(cherriesCheckbox).toBeChecked();

    userEvent.click(gummiBearsCheckbox);
    expect(gummiBearsCheckbox).toBeChecked();
  });
  expect(toppingsSubtotal).toHaveTextContent("3.00");
});

describe("Grand total", () => {
  test("Grand total starts at 0", async () => {
    render(<OrderEntry />);
    const grandTotalHeading = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });
    // we are awaiting because of a useEffect that is triggered inside ORder entry->orderDetauils component.
    // only to avoid warning    
    await waitFor(() => {
    expect(grandTotalHeading).toHaveTextContent("0.00");
    })    
  });

  test("Updates if add scoop first", async () => {
    render(<OrderEntry />);
    //make sure total starts at 0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    //update vanilla scoop to 1 and check subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");
    const grandTotalHeading = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotalHeading).toHaveTextContent("2.00");

    //Make sure it starts at 0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // It updates when we add one topping
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherriesCheckbox).not.toBeChecked();
    await waitFor(() => {
      userEvent.click(cherriesCheckbox);
      expect(cherriesCheckbox).toBeChecked();
    });
    expect(toppingsSubtotal).toHaveTextContent("1.50");
    expect(grandTotalHeading).toHaveTextContent("3.50");

  });

  test("Updates if add topping first", async() => {
    render(<OrderEntry />);
    //make sure total starts at 0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent("0.00");


    //Make sure topping subtotal starts at 0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // It updates when we add one topping
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherriesCheckbox).not.toBeChecked();
    await waitFor(() => {
      userEvent.click(cherriesCheckbox);
      expect(cherriesCheckbox).toBeChecked();
    });
    expect(toppingsSubtotal).toHaveTextContent("1.50");
    const grandTotalHeading = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });

    expect(grandTotalHeading).toHaveTextContent("1.50");

    //update vanilla scoop to 1 and check subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");
    
    expect(grandTotalHeading).toHaveTextContent("3.50");
  });

  test("Updates properly if an item is removed", async() => {


    render(<OrderEntry />);
    //make sure total starts at 0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent("0.00");


    //Make sure topping subtotal starts at 0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // It updates when we add one topping
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherriesCheckbox).not.toBeChecked();
    await waitFor(() => {
      userEvent.click(cherriesCheckbox);
      expect(cherriesCheckbox).toBeChecked();
    });
    expect(toppingsSubtotal).toHaveTextContent("1.50");
    const grandTotalHeading = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });

    expect(grandTotalHeading).toHaveTextContent("1.50");

    //update vanilla scoop to 1 and check subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");
    
    expect(grandTotalHeading).toHaveTextContent("3.50");

    
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(scoopsSubtotal).toHaveTextContent("0.00");
    
    expect(grandTotalHeading).toHaveTextContent("1.50");

    await waitFor(() => {
      userEvent.click(cherriesCheckbox);
      expect(cherriesCheckbox).not.toBeChecked();
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");
    expect(grandTotalHeading).toHaveTextContent("0.00");


  });
});
