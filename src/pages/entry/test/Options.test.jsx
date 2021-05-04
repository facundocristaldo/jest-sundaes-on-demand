import { screen, render } from "@testing-library/react";
import { OrderDetailsProvider } from "../../../Context/OrderDetails";
import Options from "../Options";

test("Display image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm al texts
  const altTexts = scoopImages.map((image) => image.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Display image for each topping from the server", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  //find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  //confirm al texts
  const altTexts = toppingImages.map((image) => image.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
