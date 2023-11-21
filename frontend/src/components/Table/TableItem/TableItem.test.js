import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TableItem from "./TableItem";
import useDroneStatus from "../../../hooks/useDroneStatus";

jest.mock("../../../hooks/useDroneStatus");

describe("TableItem Component Tests", () => {
  const drone = {
    name: "TestDrone",
    image: "test.jpg",
    serial_number: "123",
    status: "ok",
  };

  // Тест для проверки отображения информации дрона
  it("displays drone information", () => {
    useDroneStatus.mockReturnValue({
      currentStatus: drone.status,
      toggleStatus: jest.fn(),
    });

    const { getByText, getByAltText } = render(<TableItem drone={drone} />);

    expect(getByText("TestDrone")).toBeInTheDocument();
    expect(getByAltText("drone")).toHaveAttribute("src", "test.jpg");
    expect(getByText("123")).toBeInTheDocument();
  });

  // Тест для проверки функциональности изменения статуса
  it("changes status on click", () => {
    const mockToggleStatus = jest.fn();
    useDroneStatus.mockReturnValue({
      currentStatus: drone.status,
      toggleStatus: mockToggleStatus,
    });

    const { getByText } = render(<TableItem drone={drone} />);
    fireEvent.click(getByText("Справний")); // Используйте соответствующий текст статуса
    expect(mockToggleStatus).toHaveBeenCalledTimes(1);
  });

  // Дополнительные тесты могут быть добавлены для проверки стилей в зависимости от статуса
});
