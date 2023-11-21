import React from "react";
import { render } from "@testing-library/react";
import Table from "./Table";

describe("Table Component Tests", () => {
  // Тест для проверки рендеринга компонента Table с пустым списком дронов
  it("renders correctly with an empty drones list", () => {
    const { getByText } = render(<Table drones={[]} />);
    expect(getByText("Інвентар")).toBeInTheDocument();
  });

  // Тест для проверки рендеринга компонента Table с непустым списком дронов
  it("renders drone items correctly", () => {
    const drones = [
      {
        serial_number: "123",
        name: "Drone1",
        image: "image1.jpg",
        status: "ok",
      },
      {
        serial_number: "456",
        name: "Drone2",
        image: "image2.jpg",
        status: "damaged",
      },
    ];
    const { getByText } = render(<Table drones={drones} />);

    expect(getByText("Drone1")).toBeInTheDocument();
    expect(getByText("Drone2")).toBeInTheDocument();
    // Проверяем, что каждый элемент списка дронов отображается
  });
});
