import expect from "expect";
import React from "react";
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from "src/PrimitiveInput";
import {
  fuzz,
  getInput,
  setInput,
  isEmpty,
  setTarget,
  makeInput
} from "./utils";
import { mount } from "enzyme";

// TODO docs
const testInput = (Input, d) => async () => {
  const data = fuzz(d);
  const value = await setInput(Input)(data);
  expect(value).toEqual(data);
};

describe("StringInput", () => {
  it("handles string", testInput(StringInput, "abc"));

  it("is empty by default", isEmpty(StringInput));
});

describe("IntegerInput", () => {
  it("handles integer", testInput(IntegerInput, 5));

  it("handles negative integer", testInput(IntegerInput, -5));

  // TODO
  xit("ignores non-numeric input", async () => {
    const data = fuzz(5.4);
    const value = await setInput(IntegerInput)(data);
    expect(value).toEqual("");
  });

  it("is empty by default", isEmpty(IntegerInput));
});

describe("FloatInput", () => {
  it("handles float", testInput(FloatInput, 5.4));

  it("handles negative float", testInput(FloatInput, -5.4));

  // TODO
  xit("ignores non-decimal input", async () => {
    const data = fuzz("a");
    const value = await setInput(data)(FloatInput);
    expect(value).toEqual("");
  });

  it("is empty by default", isEmpty(FloatInput));
});

describe("BooleanInput", () => {
  it("handles boolean", async () => {
    const value = await setTarget("input", "click")(makeInput(BooleanInput));
    expect(value).toEqual(true);
  });

  it("is false by default", () => {
    expect(getInput(mount(<BooleanInput />)).checked).toEqual(false);
  });
});

// TODO docs
const filterByKey = data =>
  Object.entries(data)
    .filter(x => x[1])
    .map(x => x[0]);

// TODO docs
const setEnum = async data =>
  setTarget("select", "change", {
    value: filterByKey(data)
  })(res => <EnumInput options={Object.keys(data)} onChange={res} />);

// TODO docs
const getSelected = w =>
  w
    .find("option")
    .map(e => e.instance().selected)
    .filter(Boolean);

describe("EnumInput", () => {
  it("handles selection", async () => {
    const data = {
      a: false,
      b: false,
      c: true
    };
    const value = await setEnum(data);
    expect(value).toEqual(filterByKey(data));
  });

  it("handles multiple selections", async () => {
    const data = {
      a: true,
      b: false,
      c: true
    };
    const value = await setEnum(data);
    expect(value).toEqual(filterByKey(data));
  });

  it("is empty by default", () => {
    const wrapper = mount(<EnumInput options={["a", "b", "c"]} />);
    expect(getSelected(wrapper)).toEqual([]);
  });
});
