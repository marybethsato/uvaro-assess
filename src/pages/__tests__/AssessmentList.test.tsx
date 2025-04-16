import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { GET_USER_ASSESSMENTS } from '../../graphql/queries';
import AssessmentList from '../AssessmentList';


// Mock for PreviousAssessments to check if it receives correct props
jest.mock('../src/components/assessment_list/AllPreviousAssessments', () => ({
  __esModule: true,
  default: ({ assessments }: { assessments: any[] }) => (
    <div data-testid="mock-assessment-component">
      {assessments.map(a => (
        <div key={a.assessmentId}>{a.assessmentId}</div>
      ))}
    </div>
  ),
}));

const mockAssessmentData = {
  data: {
    getUserAssessments: [
      {
        assessmentId: '1',
        endDateTime: '2024-04-01T00:00:00Z',
      },
      {
        assessmentId: '2',
        endDateTime: '2024-04-02T00:00:00Z',
      },
      {
        assessmentId: '3',
        endDateTime: null, // should be filtered out
      },
    ],
  },
};

describe('AssessmentList component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAssessmentData),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches assessments and renders them', async () => {
    render(<AssessmentList />);

    await waitFor(() => {
      // Check that assessments with valid endDateTime are rendered
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      // Check that the component is rendered
      expect(screen.getByTestId('mock-assessment-component')).toBeInTheDocument();
      // Ensure the one with null endDateTime is excluded
      expect(screen.queryByText('3')).not.toBeInTheDocument();
    });

    // Ensure fetch was called with correct GraphQL query
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        query: GET_USER_ASSESSMENTS,
      }),
    }));
  });

  it('handles fetch error gracefully', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<AssessmentList />);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Error getting assessments');
    });

    alertMock.mockRestore();
  });
});
