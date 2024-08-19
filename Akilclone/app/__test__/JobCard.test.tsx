import React from "react";
import { render, screen } from "@testing-library/react";
import JobCard from "../components/JobCard";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";

import { useSession } from "next-auth/react";
import { Provider } from "react-redux";
import { RootState } from "@/app/store/store";

const job = {
  id: "654e1ae353a7667de6ef59ee",
  title: "Math tutor",
  description:
    "At our charitable organization, we strive to provide educational support to individuals in need within our community. We are currently seeking Volunteer Math Tutors to help individuals improve their math skills. As a volunteer, you will have the opportunity to work one-on-one or in small groups, assisting learners with various math concepts and problem-solving techniques. This is an impactful opportunity to empower others and contribute to their educational success.",
  responsibilities:
    "Provide one-on-one or small group tutoring sessions to individuals seeking to improve their English language skills.\nAssess learners' needs and develop personalized lesson plans.\nTeach and practice English grammar, vocabulary, reading comprehension, and writing skills.\nEngage learners in conversation and listening exercises to improve their spoken language abilities.\nProvide constructive feedback and guidance to help learners progress.",
  requirements:
    "Strong proficiency in mathematics, including a solid foundation in arithmetic, algebra, geometry, and calculus.\nExcellent communication and interpersonal skills.\nFamiliarity with common math textbooks, curriculum standards, and educational resources.\nCapacity to create a supportive and encouraging learning environment.",
  idealCandidate:
    "Patience, empathy, and the ability to adapt teaching methods to meet individual learning needs.",
  categories: [
    "Education Access and Quality Improvement",
    "Orphanages and Child Welfare",
  ],
  opType: "inPerson",
  startDate: "2023-12-14T21:00:00Z",
  endDate: "2024-04-29T21:00:00Z",
  deadline: "2023-11-21T21:00:00Z",
  location: ["Addis Ababa"],
  requiredSkills: [
    "Adaptability",
    "Teacher",
    "Teaching/training",
    "Communication",
  ],
  whenAndWhere: "Vatican Embassy infront of Hule Buna",
  orgID: "654b847ab73ed9e03375de5e",
  datePosted: "2023-11-10T11:58:27.379Z",
  status: "open",
  applicantsCount: 0,
  viewsCount: 517,
  orgName: "Sele Enat Charitable Organization ",
  logoUrl:
    "https://res.cloudinary.com/dtt1wnvfb/image/upload/v1699447931/photo_2023-11-08_15-51-10.jpg.jpg",
  isBookmarked: false,
  isRolling: false,
  questions: null,
  perksAndBenefits: null,
  createdAt: "0001-01-01T00:00:00Z",
  updatedAt: "0001-01-01T00:00:00Z",
  orgPrimaryPhone: "0930097441",
  orgEmail: "sem.ethiopia94@gmail.com",
  orgWebsite: "https://et.linkedin.com/in/yared-abdu-45b8b4242",
  isPaid: false,
  average_rating: 0,
  total_reviews: 0,
};

const mockStore = configureStore<RootState>([]);

// Mock API endpoints

jest.mock("../features/api/apiSlice", () => ({
  useBookmarkMutation: jest.fn(),
  useUnBookmarkMutation: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("JobCard", () => {
  let store: any;
  beforeEach(() => {
    store = mockStore();

    // Mock useRouter

    // Mock useSession with a default authenticated session
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "Test User",
          email: "test@example.com",
          image: "http://example.com/avatar.jpg",
        },
        expires: "some-future-date",
      },
      status: "authenticated",
    });
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <JobCard key={job.id} {...job} />
      </Provider>
    );
  };

  it("should display the correct bookmark state", () => {
    const {
      useBookmarkMutation,
      useUnBookmarkMutation,
    } = require("../features/api/apiSlice");

    useBookmarkMutation.mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: false,
        isError: false,
      },
    ]);

    useUnBookmarkMutation.mockReturnValue([
      jest.fn(), // This would be your mutation function
      {
        data: null,
        isLoading: false,
        isError: false,
      },
    ]);

    // Render the component

    renderComponent();
    const bookmarkButton = screen.getByRole("button");

    // Query the image inside the button
    const img = bookmarkButton.querySelector("img");

    // Assert based on the bookmark state
    if (job.isBookmarked) {
      expect(img).toHaveAttribute("alt", "bookmarked");
    } else {
      expect(img).toHaveAttribute("alt", "unbookmarked");
    }
  });

  // it("should toggle the bookmark state on click", async () => {

  //   renderComponent();

  //   const bookmarkButton = screen.getByRole("button");

  //   // Initial state check
  //   let img = bookmarkButton.querySelector("img");
  //   if (job.isBookmarked) {
  //     expect(img).toHaveAttribute("alt", "bookmarked");
  //   } else {
  //     expect(img).toHaveAttribute("alt", "unbookmarked");
  //   }

  //   // Simulate a click to toggle the bookmark
  //   bookmarkButton.click();

  //   // After click, re-query the image element to check the updated state
  //   img = bookmarkButton.querySelector("img");
  //   if (job.isBookmarked) {
  //     expect(img).toHaveAttribute("alt", "unbookmarked"); // State should toggle
  //   } else {
  //     expect(img).toHaveAttribute("alt", "bookmarked"); // State should toggle
  //   }
  // });
});
