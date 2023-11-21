import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { loginUser } from "../../api";
import { AuthContext } from "../../AuthContext";

// Mock для функции loginUser
jest.mock("../../api", () => ({
  loginUser: jest.fn(),
}));

// Мокові дані для AuthContext
const mockAuthValue = {
  login: jest.fn(), // Мокова функція або якісь конкретні дані
};

describe("LoginPage tests", () => {
  const renderWithRouterAndContext = (component) => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthValue}>
          {component}
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };
  it("renders login and password input", () => {
    const { getByPlaceholderText } = renderWithRouterAndContext(<LoginPage />);
    const loginInput = getByPlaceholderText("Логін");
    const passwordInput = getByPlaceholderText("Пароль");

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("shows error message when username is empty", async () => {
    const { getByText } = renderWithRouterAndContext(<LoginPage />);
    const loginButton = getByText("Увійти");

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText("Поле 'Логін' має бути заповнено")).toBeInTheDocument();
    });
  });

  it("shows error message when password is empty", async () => {
    const { getByText, getByPlaceholderText } = renderWithRouterAndContext(
      <LoginPage />
    );
    const loginButton = getByText("Увійти");

    const loginInput = getByPlaceholderText("Логін");

    fireEvent.change(loginInput, { target: { value: "testuser" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText("Поле 'Пароль' має бути заповнено")).toBeInTheDocument();
    });
  });

  it("shows success message on successful login", async () => {
    loginUser.mockResolvedValueOnce(true);

    const { getByPlaceholderText, getByText } = renderWithRouterAndContext(
      <LoginPage />
    );
    const loginInput = getByPlaceholderText("Логін");
    const passwordInput = getByPlaceholderText("Пароль");
    const loginButton = getByText("Увійти");

    fireEvent.change(loginInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText("Успішний вхід!")).toBeInTheDocument();
    });
  });
  it("shows failure message on unsuccessful login", async () => {
    loginUser.mockResolvedValueOnce(false); // имитируем неудачный ответ от API

    const { getByPlaceholderText, getByText } = renderWithRouterAndContext(
      <LoginPage />
    );
    const loginInput = getByPlaceholderText("Логін");
    const passwordInput = getByPlaceholderText("Пароль");
    const loginButton = getByText("Увійти");

    fireEvent.change(loginInput, { target: { value: "wronguser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText("Невірний логін або пароль.")).toBeInTheDocument();
    });
  });
});
