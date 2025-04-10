import { render, screen } from "@testing-library/react";
import ReminderComponent from "../../home/Reminder";

describe("ReminderComponent", () => {
  const originalDateNow = Date.now;

  afterEach(() => {
    global.Date.now = originalDateNow;
    jest.useRealTimers();
  });

  function mockCurrentDate(dateString: string) {
    const mockedTime = new Date(dateString).getTime();
    jest.useFakeTimers().setSystemTime(mockedTime);
  }

  test("renders reminder when last assessment over 3 months ago", () => {
    mockCurrentDate("2025-04-10T00:00:00Z");
    const lastDate = "2025-01-09T12:00:00Z";
    const handleStart = jest.fn();

    render(
      <ReminderComponent
        lastAssessmentDate={lastDate}
        onStartAssessment={handleStart}
      />
    );

    expect(screen.getByText("Assessment Reminder")).toBeInTheDocument();
    expect(
      screen.getByText(
        "It's been 3 months since your last assessment. It's time to take a new one!"
      )
    ).toBeInTheDocument();
  });

  test("does not render anything when last assessment within 3 months", () => {
    mockCurrentDate("2025-04-10T00:00:00Z");
    const lastDate = "2025-02-15T08:00:00Z";
    render(
      <ReminderComponent
        lastAssessmentDate={lastDate}
        onStartAssessment={() => {}}
      />
    );

    expect(screen.queryByText("Assessment Reminder")).toBeNull();
  });
});
