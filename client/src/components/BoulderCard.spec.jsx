import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BoulderCard from './BoulderCard';

const Boulder = {
  number: 1,
  name: 'Black Widow and the people',
  sector: 'Monkey Island',
  level: '5',
  handle_color: 'black',
  setter: 'Martin Pagels',
  tags: ['Dyno', 'Sloper'],
  img_start: 'Boulder-girl.jpg',
  img_all: 'imageAll.jpg',
  weighting: 100,
  number_of_likes: 5,
  start_date: '2022-04-26',
  expiry_date: '',
  climbers: [],
};

describe('BoulderCard', () => {
  it('renders the a list item with a title, an img, 5 details and a button and renders four more details after button click', () => {
    render(
      <BoulderCard
        id={Boulder.number}
        name={Boulder.name}
        sector={Boulder.sector}
        level={Boulder.level}
        handle_color={Boulder.handle_color}
        likes={Boulder.number_of_likes}
        tags={Boulder.tags}
        setter={Boulder.setter}
        weighting={Boulder.weighting}
      />
    );
    const cardHeader = screen.getByRole('heading');
    const cardPicture = screen.getByRole('img');
    const button = screen.getByRole('button');

    const id = screen.getByText(/#1/);
    const sector = screen.getByText(/Monkey Island/i);
    const level = screen.getByText(/Level: 5/);
    const handle_color = screen.getByText(/black/);
    const tag1BeforeEvent = screen.queryByText(/Dyno/i);
    const tag2BeforeEvent = screen.queryByText(/Sloper/i);
    const setterBeforeEvent = screen.queryByText(/Martin Pagels/i);
    const weightingBeforeEvent = screen.queryByText(/Weighting: 100/i);

    expect(cardPicture).toBeInTheDocument();
    expect(cardHeader).toHaveTextContent('Black Widow and the people');
    expect(button).toBeInTheDocument();
    expect(id).toBeInTheDocument();
    expect(sector).toBeInTheDocument();
    expect(level).toBeInTheDocument();
    expect(handle_color).toBeInTheDocument();
    expect(tag1BeforeEvent).not.toBeInTheDocument();
    expect(tag2BeforeEvent).not.toBeInTheDocument();
    expect(setterBeforeEvent).not.toBeInTheDocument();
    expect(weightingBeforeEvent).not.toBeInTheDocument();

    userEvent.click(button);

    const tag1 = screen.getByText(/Dyno/i);
    const tag2 = screen.getByText(/Sloper/i);
    const setter = screen.getByText(/Martin Pagels/i);
    const weighting = screen.getByText(/Weighting: 100/i);

    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(setter).toBeInTheDocument();
    expect(weighting).toBeInTheDocument();
  });
});
