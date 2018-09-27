import * as React from "react";
import * as Renderer from "react-test-renderer";
import App from "./App";

describe("App component", () => {
  it("renders as snapshot", () => {
    let app = Renderer.create(<App />).toJSON();

    expect(app).toMatchSnapshot();
  });
});
