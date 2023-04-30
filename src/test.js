import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login component', () => {
            const mockOnSubmit = jest.fn();
            const wrapper = shallow( < Login onSubmit = { mockOnSubmit }
                />);

                it('renders without crashing', () => {
                    expect(wrapper.exists()).toBe(true);
                });

                it('contains two input fields for username and password', () => {
                    expect(wrapper.find('input')).toHaveLength(2);
                });

                it('updates the state when input fields are changed', () => {
                    const usernameInput = wrapper.find('[type="text"]');
                    const passwordInput = wrapper.find('[type="password"]');

                    usernameInput.simulate('change', { target: { value: 'testuser' } });
                    passwordInput.simulate('change', { target: { value: 'testpass' } });

                    expect(wrapper.state('username')).toEqual('testuser');
                    expect(wrapper.state('password')).toEqual('testpass');
                });

                it('calls the onSubmit function when the form is submitted', () => {
                    const form = wrapper.find('form');
                    form.simulate('submit', { preventDefault() {} });
                    expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'testpass');
                });
            });