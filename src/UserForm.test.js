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
  // render component
  const argList = [];
  const callback = (...args) => {
   argList.push(args);
   console.log(argList);
  };

  render(<UserForm onUserAdd={callback}/>);

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
  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({name: 'Julie', email: 'julie@updater.com'});
})
