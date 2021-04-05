import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";

import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it("should render <BuildControls /> when receiving ingredients", () => {
        wrapper.setProps({
            ingredients: {salad: 0},
            totalPrice: 0
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

});