import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { RootState } from "@/store";
import Page from "@/app/(pages)/hospitals/page";
import {
  getAllHospitals,
  getHospitalByRating_4,
} from "../__mocks__/hospitalsList";
import { getAllServicesList } from "../__mocks__/servicesData";

const mockStore = configureStore<RootState>([]);
const hospitals_mockedData = getAllHospitals();
const services_mockData = getAllServicesList();
const hospitals_rating_4 = getHospitalByRating_4();

jest.mock("../../src/store/hospital", () => ({
  useGetAllServicesQuery: jest.fn(),
  useGetHospitalsQuery: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

window.HTMLElement.prototype.scrollIntoView = function () {};

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

describe("Test on Hospital Filter Page", () => {
  let store: any;
  beforeEach(() => {
    store = mockStore();
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
  };

  it("Render `Search Bar` and `Filter Options` ", () => {
    const {
      useGetHospitalsQuery,
      useGetAllServicesQuery,
    } = require("../../src/store/hospital");
    useGetHospitalsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: null,
    });

    useGetAllServicesQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: null,
    });
    renderComponent();

    // Verify the search bar renders correctly
    expect(
      screen.getByPlaceholderText("Search a hospital . . .")
    ).toBeInTheDocument();

    // Verify filter options render correctly
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Years of Service")).toBeInTheDocument();
    expect(screen.getByText("With in Range")).toBeInTheDocument();
    expect(screen.getByText("Open Status")).toBeInTheDocument();
  });

  it("Test hospitals filter by rating", async () => {
    const {
      useGetHospitalsQuery,
      useGetAllServicesQuery,
    } = require("../../src/store/hospital");
    useGetHospitalsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: hospitals_rating_4,
    });
    useGetAllServicesQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: null,
    });
    renderComponent();
    const rating = screen.getByText("Rating");
    userEvent.click(rating);

    await waitFor(() => {
      const rating_field = screen.getByTestId("input-for-number-field");
      userEvent.type(rating_field, "4");

      const see_results = screen.getByTestId("see-results-button");
      userEvent.click(see_results);
    });

    // check hospitals rating to the rating value
    await waitFor(() => {
      const hospitals = screen.getAllByTestId("rating-display");
      hospitals.forEach((hospital) => {
        expect(hospital).toHaveTextContent(/4|5/);
      });
    });
  });

  it("Filter by `Years of Experience` ", async () => {
    const {
      useGetHospitalsQuery,
      useGetAllServicesQuery,
    } = require("../../src/store/hospital");
    useGetHospitalsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: hospitals_mockedData,
    });
    useGetAllServicesQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: services_mockData,
    });
    renderComponent();

    const yearsOfExperience = screen.getByText("Years of Service");
    userEvent.click(yearsOfExperience);

    await waitFor(() => {
      const yearsOfExperience_field = screen.getByTestId(
        "input-for-number-field"
      );
      userEvent.type(yearsOfExperience_field, "2");

      const see_results = screen.getByTestId("see-results-button");
      userEvent.click(see_results);

      const hospitals = screen.getAllByTestId("hospital-card");

      // not yet done -> got to each hospital detail and check their years of experience
      hospitals.forEach((hospital) => {
        expect(hospital).toBeInTheDocument();
      });
    });
  });

  it("Filer by `Services` ", async () => {
    const {
      useGetHospitalsQuery,
      useGetAllServicesQuery,
    } = require("../../src/store/hospital");
    useGetHospitalsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: hospitals_mockedData,
    });
    useGetAllServicesQuery.mockReturnValue({
      isLoading: false,
      data: services_mockData,
    });
    renderComponent();

    const services = screen.getByText("Services");
    userEvent.click(services);

    await waitFor(() => {
      // select the services container
      const services_container = screen.getByTestId("check-box-container");
      expect(services_container).toBeInTheDocument();

      // Select the Surgery and Neurology checkbox
      const Surgery_checkbox = screen.getByTestId("Surgery");
      userEvent.click(Surgery_checkbox);

      const Neurology_checkbox = screen.getByTestId("Neurology");
      userEvent.click(Neurology_checkbox);

      // make sure Surgery and Neurology checkbox are checked -> selected
      const sugery_box = screen.getByTestId("Surgery");
      expect(sugery_box).toBeChecked();

      const neurology_box = screen.getByTestId("Neurology");
      expect(neurology_box).toBeChecked();

      // click submit button
      const see_results_button = screen.getByTestId("see-results-button");
      userEvent.click(see_results_button);

      // not yet done -> got to each hospital detail and check their service
      const hospitals = screen.getAllByTestId("hospital-card");

      hospitals.forEach((hospital) => {
        expect(hospital).toBeInTheDocument();
      });
    });
  });

  // not yet completed
  it("With In Range", () => {
    const {
      useGetHospitalsQuery,
      useGetAllServicesQuery,
    } = require("../../src/store/hospital");
    useGetHospitalsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: hospitals_mockedData,
    });
    useGetAllServicesQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: services_mockData,
    });
    renderComponent();
    // const range = screen.getAllByTestId("dropdown-rating")[0]
    // fireEvent.click(range)

    // to be completed

    // set the range value and filter

    // check hospitals range to the range value
  });
  it("Open Status", () => {
    // not yet completed
  });
  it("Remove all filters by `Clear Filter`", () => {
    const {
      useGetHospitalsQuery,
      useGetAllServicesQuery,
    } = require("../../src/store/hospital");
    useGetHospitalsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: hospitals_mockedData,
    });
    useGetAllServicesQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: services_mockData,
    });
    renderComponent();

    // set the rating, yearsOfExperience,Range value and filter

    // check for hospitals rating, yearsOfExperience,Range to the filtering values

    // remove the filter values and check it
  });
});
