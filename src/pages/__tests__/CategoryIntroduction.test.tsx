import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CategoryIntroduction from '../CategoryIntroduction';


// Mock images to avoid import issues
jest.mock('../../src/images/financialhealth/Financialhealth.png', () => 'FinancialHealth.png');
jest.mock('../../src/images/IntroBackground2.png', () => 'IntroBackground2.png');
jest.mock('../../src/images/IntroVector.png', () => 'IntroVector.png');
jest.mock('../../src/images/lifechoice.png', () => 'lifechoice.png');
jest.mock('../../src/images/projectcommunity.png', () => 'projectcommunity.png');
jest.mock('../../src/images/workyouenjoy/Workyouenjoy.png', () => 'Workyouenjoy.png');

// Mock subcomponents
jest.mock('../../src/components/Layout', () => ({ children }: any) => <div>{children}</div>);
jest.mock('../../src/components/navigation/TopNavBar', () => () => <div>Mock TopNavBar</div>);
jest.mock('../../src/components/buttons/BaseButton', () => ({ children, onClick }: any) => (
  <button onClick={onClick}>{children}</button>
));

const mockCategory = {
  categoryId: '123',
  categoryName: 'Financial Health',
  categoryDescription: 'Manage your money wisely.',
  categoryImage: 'some-image-url',
};

const mockFetchResponse = {
  data: {
    allCategories: [mockCategory],
  },
};

describe('CategoryIntroduction Component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockFetchResponse,
    } as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  const renderWithRoute = (category: string) => {
    return render(
      <MemoryRouter initialEntries={[`/category/${category}`]}>
        <Routes>
          <Route path="/category/:category" element={<CategoryIntroduction />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders the introduction content for a valid category', async () => {
    renderWithRoute('financial-health');

    expect(await screen.findByText('What is')).toBeInTheDocument();
    expect(await screen.findByText('Financial Health?')).toBeInTheDocument();
    expect(await screen.findByText('Manage your money wisely.')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('navigates to assessment page when Continue is clicked', async () => {
    renderWithRoute('financial-health');

    await waitFor(() => screen.getByText('Continue'));

    const button = screen.getByText('Continue');
    fireEvent.click(button);

    expect(window.location.pathname + window.location.search).toBe('/assessment?category=financial-health');
  });

  it('handles missing category param gracefully', () => {
    render(
      <MemoryRouter initialEntries={['/category/']}>
        <Routes>
          <Route path="/category/:category?" element={<CategoryIntroduction />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('What is')).not.toBeInTheDocument();
  });

  it('logs an error if fetch fails', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    renderWithRoute('financial-health');

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching categories:', expect.any(Error));
    });

    (console.error as jest.Mock).mockRestore();
  });
});
