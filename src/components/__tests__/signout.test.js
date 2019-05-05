import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import SignOutButton from '../SignOut';
import Adapter from 'enzyme-adapter-react-16';


configure({ 
  adapter: new Adapter() 
});

describe ('LogOut Component', ()=>{

  it('should render without throwing an error',()=>{
    const component =shallow(<SignOutButton name = "SignOutButton" />);
    expect(component).toHaveLength(1);
  });
})

describe('SignOutButton', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SignOutButton debug />);
  
    expect(component).toMatchSnapshot();
  });
});