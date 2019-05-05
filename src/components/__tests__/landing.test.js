import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Landing from '../Landing';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ 
  adapter: new Adapter() 
});

  /**it('<AdminPage />', async () => {
    fetch.mockResponse(JSON.stringify(JsonData));
    const wrapper = shallow(<AdminPage />, { disableLifecycleMethods: true });
    await wrapper.instance().componentDidMount();
    wrapper.update();
    expect(fetch.mock.calls.length).toEqual(1);
    expect(wrapper.find(Table).length).toEqual(1);
  });*/

describe('LandingPage', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Landing debug />);
  
    expect(component).toMatchSnapshot();
  });
});

 /**it('matches the snapshot', ()=>{
  const tree =renderer.create(<AdminPage/>).toJSON();
  expect(tree).toMatchSnapshot();
})*/