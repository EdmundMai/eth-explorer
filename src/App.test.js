import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import { Charities } from "./components/Charities";
import { PAYMENT_STATUSES } from "./config";

describe("App", () => {
  let props;
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = shallow(<App {...props} />);
    }
    return mountedApp;
  };

  beforeEach(() => {
    props = {
      loadHomepageFn: jest.fn(),
      postPaymentRequestFn: jest.fn(),
      charities: [],
      donations: [],
      status: PAYMENT_STATUSES.NONE
    };
    mountedApp = undefined;
  });

  it("calls loadHomepageFn on load", () => {
    const loadHomepageFn = jest.fn();
    props.loadHomepageFn = loadHomepageFn;
    shallow(<App {...props} />);
    expect(loadHomepageFn).toHaveBeenCalled();
  });

  it("renders charities", () => {
    const postPaymentRequestFn = jest.fn();
    const loadHomepageFn = jest.fn();
    const charities = [{ id: "c1" }];
    const donations = [{ id: "d1" }];
    const status = "PENDING";

    props.postPaymentRequestFn = postPaymentRequestFn;
    props.loadHomepageFn = loadHomepageFn;
    props.charities = charities;
    props.donations = donations;
    props.status = status;

    const charitiesComponents = app().find(Charities);
    expect(charitiesComponents.length).toEqual(1);

    const charitiesProps = charitiesComponents.first().props();
    expect(charitiesProps.list).toEqual(charities);
    expect(charitiesProps.donations).toEqual(donations);
    expect(charitiesProps.postPaymentRequestFn).toEqual(postPaymentRequestFn);
    expect(charitiesProps.status).toEqual(status);
  });
});
