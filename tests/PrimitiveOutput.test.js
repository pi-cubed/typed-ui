import expect from "expect";
import React from "react";
import {
  StringOutput,
  BooleanOutput,
  EnumOutput,
  IntegerOutput,
  FloatOutput
} from "src/PrimitiveOutput";
import { fuzz, getInput } from "./utils";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });

describe("StringOutput", () => {
  const fuzzed = fuzz("abc");
  const wrapper = shallow(<StringOutput data={fuzzed} />);

  it("displays string", () => expect(wrapper.contains(fuzzed)).toEqual(true));

  it("is div", () => expect(wrapper.is("div")).toEqual(true));
});

describe("EnumOutput", () => {
  const wrapper = shallow(
    <EnumOutput
      data={{
        a: false,
        b: true,
        c: true
      }}
    />
  );

  it("displays enum", () =>
    expect(
      wrapper.contains(
        <select multiple disabled>
          <option value="a" selected={false}>
            a
          </option>
          <option value="b" selected={true}>
            b
          </option>
          <option value="c" selected={true}>
            c
          </option>
        </select>
      )
    ).toEqual(true));

  it("is readonly", () => expect(wrapper.prop("disabled")).toEqual(true));
});

describe("BooleanOutput", () => {
  const input = getInput(mount(<BooleanOutput data={true} />));

  it("displays boolean", () => expect(input.value).toEqual("true"));

  it("is checkbox", () => expect(input.type).toEqual("checkbox"));

  it("is readonly", () => expect(input.readOnly).toEqual(true));
});

describe("IntegerOutput", () => {
  const fuzzed = fuzz(5);
  const input = getInput(mount(<IntegerOutput data={fuzzed} />));

  it("displays integer", () => expect(input.value).toEqual(fuzzed));

  it("is checkbox", () => expect(input.type).toEqual("number"));

  it("is readonly", () => expect(input.readOnly).toEqual(true));
});

describe("FloatOutput", () => {
  const fuzzed = fuzz(5.7);
  const input = getInput(mount(<FloatOutput data={fuzzed} />));

  it("displays float", () => expect(input.value).toEqual(fuzzed));

  it("is checkbox", () => expect(input.type).toEqual("number"));

  it("is readonly", () => expect(input.readOnly).toEqual(true));
});
