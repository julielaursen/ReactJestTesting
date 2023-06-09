import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import UserForm from './UserForm'

test('it shows two inputs and a button', () => {
  // render the component
  render(<UserForm />)

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox')
  const button = screen.getByRole('button')

  // Assertion
  expect(inputs).toHaveLength(2)
  expect(button).toBeInTheDocument()
})

test('it calls onUserAdd when the form is submitted', () => {

  const mock = jest.fn();

  render(<UserForm onUserAdd={mock}/>);

  // find the two inputs
  const [nameInput, emailInput] = screen.getAllByRole('textbox');

  // simulate typing in a name
  user.click(nameInput);
  user.keyboard('Julie');

  // simulate typing an email
  user.click(emailInput);
  user.keyboard('julie@updater.com');

  // simulate clicking the button
  const button = screen.getByRole('button');
  user.click(button);

  // assertion that 'onUserAdd' gets called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({name: 'Julie', email: 'julie@updater.com'});
});

test('it empties the two inputs when the form is submitted', () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', {name: /email/i });
  const button = screen.getByRole('button');
  user.click(nameInput);
  user.keyboard('jane');
  user.click(emailInput);
  user.keyboard('jane@jane.com');
  user.click(button);
  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');

});
