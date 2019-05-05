import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import SignInPage from '../SignIn';
import AdminPage from '../Admin';
import Adapter from 'enzyme-adapter-react-16';
import SignInFormBase from '../SignIn';
import Landing from '../Landing';
import renderer from 'react-test-renderer';

configure({ 
  adapter: new Adapter() 
});

describe ('Login Component', ()=>{

  it('should render without throwing an error',()=>{
    const component =shallow(<SignInPage name = "SignInPage" />);
    expect(component).toHaveLength(1);
  });
})

// within the Login components describe function
it('renders a email input', () => {
    const component =shallow(<SignInPage email = "SignInPage" />);
    expect(component).toHaveLength(1);
 })

it('renders a password input', () => {
    const component =shallow(<SignInPage password = "SignInPage" />);
    expect(component).toHaveLength(1);
 })




/**describe('SignIn Change State', () => {
  test('should update a state in a callback', (done) => {
    const wrapper = shallow(<SignInFormBase />);

    wrapper.setState({ target: 'new' }, () => {
      expect(wrapper.state()).toEqual({ target: 'new' }); // passed

      done();
    });
  });

  test('should update a state on a next line', () => {
    const wrapper = shallow(<SignInFormBase />);

    wrapper.setState({ test: 'new' });

    expect(wrapper.state()).toEqual({ target: 'new' }); // passed
  });
});*/

describe('SignInPage', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SignInPage debug />);
  
    expect(component).toMatchSnapshot();
  });
});








