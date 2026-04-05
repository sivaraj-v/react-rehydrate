/* eslint-env jest */
import * as React from "react";
import * as ReactDOM from "react-dom";
import reactFromMarkupContainer from "..";
import { rehydratableToReactElement } from "../rehydrator";

describe("reactFromMarkupContainer E2E tests", () => {
  it("Should rehydrate a basic component", async () => {
    const componentName: string = "myComponent";

    const rehydrator = async () => {
      return React.createElement("span", {}, "rehydrated component");
    };

    const rehydrators = { [componentName]: rehydrator };
    const documentElement = document.createElement("div");
    document.body.appendChild(documentElement);

    documentElement.innerHTML = `
      <div data-react-from-markup-container>
        <div data-rehydratable="${componentName}"></div>
      </div>`;

    await reactFromMarkupContainer(documentElement, rehydrators, {
      extra: {}
    });

    expect(documentElement.innerHTML).toMatchSnapshot();
    document.body.removeChild(documentElement);
  });

  it("Should rehydrate valid HTML markup", async () => {
    const documentElement = document.createElement("div");
    document.body.appendChild(documentElement);

    documentElement.innerHTML = `
    <div data-react-from-markup-container>
      <p>paragraph</p>
    </div>`;

    await reactFromMarkupContainer(documentElement, {}, { extra: {} });

    expect(documentElement.innerHTML).toMatchSnapshot();
    document.body.removeChild(documentElement);
  });

  it("Should work for nested markup containers", async () => {
    const componentName: string = "mycomponentName";

    const mockCall = jest.fn();
    const rehydrators = {
      [componentName]: async () => {
        mockCall();

        return React.createElement("span", {}, "rehydrated component");
      }
    };

    const documentElement = document.createElement("div");
    document.body.appendChild(documentElement);

    documentElement.innerHTML = `
      <div data-react-from-markup-container>
        <div data-rehydratable="${componentName}"></div>
          <div data-react-from-markup-container>
            <div data-rehydratable="${componentName}">
              <div data-react-from-markup-container>
                <div data-rehydratable="${componentName}"></div>
              </div>
            </div>
            <div data-rehydratable="${componentName}"></div>
          </div>
      </div>`;

    await reactFromMarkupContainer(documentElement, rehydrators, {
      extra: {}
    });

    expect(documentElement.innerHTML).toMatchSnapshot();
    expect(mockCall).toHaveBeenCalledTimes(3);
    document.body.removeChild(documentElement);
  });

  it("Should handle missing rehydrator name gracefully", async () => {
    const documentElement = document.createElement("div");
    document.body.appendChild(documentElement);

    documentElement.innerHTML = `
      <div data-react-from-markup-container>
        <div></div>
      </div>`;

    await expect(
      rehydratableToReactElement(
        documentElement.querySelector("div") as Element,
        {},
        { extra: {} }
      )
    ).rejects.toThrow("Rehydrator name is missing from element.");

    document.body.removeChild(documentElement);
  });

  it("Should handle unknown rehydrator type", async () => {
    const documentElement = document.createElement("div");
    document.body.appendChild(documentElement);

    documentElement.innerHTML = `
      <div data-react-from-markup-container>
        <div data-rehydratable="missing"></div>
      </div>`;

    await expect(
      rehydratableToReactElement(
        documentElement.querySelector("div[data-rehydratable]") as Element,
        {},
        { extra: {} }
      )
    ).rejects.toThrow("No rehydrator found for type missing");

    document.body.removeChild(documentElement);
  });

  it("Should use flushSync when available", async () => {
    const savedFlushSync = (ReactDOM as any).flushSync;
    const flushSyncMock = jest.fn((cb: () => void) => cb());
    (ReactDOM as any).flushSync = flushSyncMock;

    const componentName: string = "myComponentFlush";
    const rehydrators = {
      [componentName]: async () =>
        React.createElement("span", {}, "flush sync component")
    };

    const documentElement = document.createElement("div");
    document.body.appendChild(documentElement);

    documentElement.innerHTML = `
      <div data-react-from-markup-container>
        <div data-rehydratable="${componentName}"></div>
      </div>`;

    await reactFromMarkupContainer(documentElement, rehydrators, {
      extra: {}
    });

    expect(flushSyncMock).toHaveBeenCalled();
    document.body.removeChild(documentElement);
    (ReactDOM as any).flushSync = savedFlushSync;
  });

  it("Should continue when a rehydrator throws", async () => {
    const componentName: string = "failComponent";
    const rehydrators = {
      [componentName]: async () => {
        throw new Error("test failure");
      }
    };

    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    const documentElement = document.createElement("div");
    document.body.appendChild(documentElement);

    documentElement.innerHTML = `
      <div data-react-from-markup-container>
        <div data-rehydratable="${componentName}"></div>
      </div>`;

    await reactFromMarkupContainer(documentElement, rehydrators, {
      extra: {}
    });

    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
    document.body.removeChild(documentElement);
  });
});
