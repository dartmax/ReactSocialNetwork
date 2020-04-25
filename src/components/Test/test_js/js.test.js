import React from "react";
import * as t from './actionTypes';
import reducer, { initialState } from "./reducer";

describe('news reducer', () => {
    it('NEWS_GET_REQUEST', () => {
        const action = {
            type: t.NEWS_GET_REQUEST
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            data: null,
            isLoading: true,
        })
    })
    it('NEWS_GET_SUCCESS', () => {
        const stateBefore = {
            data: null,
            isLoading: true,
            errorMsg: null,
        }
        const action = {
            type: t.NEWS_GET_SUCCESS,
            payload:[1, 2, 3]
        }

        expect(reducer(stateBefore, action)).toEqual({
            ...stateBefore,
            data: action.payload,
            isLoading: false,
        })
    })
    it('NEWS_GET_FAILURE', () => {
        const initialState = {
            errorMsg: null,
            data: null,
            isLoading: true,
        }
        const action = {
            type: t.NEWS_GET_FAILURE,
            payload: {
                errorMsg: '500 server error'
            },
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            errorMsg: action.payload.errorMsg,
        })
    })
})










AnswerTest.test.js

import React from 'react';
import { shallow } from 'enzyme';
import AnswersTestCampariComponent from 'modules/campari/views/components/AnswerTest';
import CampariFooterContainer from 'modules/campari/views/containers/Footer';


describe('AnswersTestCampariComponent should render', () => {
    let wrapper;
    let props;
    beforeEach(() => {
        props = {
            isSendUserTestToUserFinished: true,
            isLastQuestionCampariFinished: false,
            currentPathname: '',
            handleShowQuiz: jest.fn(),
            selectedQuestion: {
                text: 'text',
                answers: [{
                    text: 'string',
                    image: 'string',
                }],
                isFetching: false,
            },
        };
        wrapper = shallow(
            <AnswersTestCampariComponent {...props} />,
        );
    });

    it('AnswersTestCampariComponent is rendered ', () => {
        expect(wrapper.find('.campari-backdrop').length).toEqual(1);
        expect(wrapper.find('.campari-test').length).toEqual(1);
        expect(wrapper.find('.campari-progress-bar-container').length).toEqual(1);
        expect(wrapper.find(CampariFooterContainer)).toHaveLength(1);
    });
});









CampariPage.test.js



import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import CampariFooterContainer from 'modules/campari/views/containers/Footer';
import SpinnerCampariComponent from 'modules/campari/views/components/Spinner';
import CampariPageContainer from 'modules/campari/views/containers/CampariPage';
import CampariPageComponent, { CampariPageComponentWithoutMemo } from 'modules/campari/views/components/CampariPage';


Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore();

describe('CampariPageContainer should render', () => {
    it('CampariPageContainer is rendered', () => {
        const props = {
            character: {
                name: 'name',
                primary_type: 'primary_type',
            },
            wineName: '',
            characterSlug: '',
            essences: {},
            idealGlass: 0,
            idealTemp: 0,
            handleRetest: () => {},
            handleConfirmCharacter: () => {},
            handleGoBack: () => {},
            firstQuestion: false,
            isFetching: false,
            characterRedirectUrl: '/',
        };
        const store = mockStore({
            character: {
                name: 'name',
            },
            essences: {},
            idealTemp: {},
            testRoot: {
                character: {},
            },
            siFetching: true,
        });
        const context = { store };
        const wrapper = shallow(
            <CampariPageContainer
                {...props}
            />, { context, disableLifecycleMethods: false },
        ).dive();
        expect(wrapper.find(CampariPageComponent).length).toEqual(1);
    });
});

describe('CampariPageComponent should render', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            character: {
                name: 'name',
                primary_type: 'primary_type',
            },
            characterSlug: '',
            characterRedirectUrl: '/',
            essences: {},
            firstQuestion: {},
            idealGlass: 0,
            idealTemp: [],
            isFetching: false,
            handleRetest: () => {},
            wineName: '',
        };
        wrapper = shallow(<CampariPageComponentWithoutMemo {...props} />);
    });

    it('CampariPageComponent renders when isFetching is true', () => {
        props.isFetching = true;
        wrapper = shallow(<CampariPageComponentWithoutMemo {...props} />);
        expect(wrapper.find(SpinnerCampariComponent).length).toEqual(1);
        expect(wrapper.find(CampariFooterContainer).length).toEqual(1);
        expect(wrapper.find('.campari-page-container').length).toEqual(1);
        expect(wrapper.find('section').length).toEqual(0);
    });

    it('CampariPageComponent renders when isFetching is false', () => {
        expect(wrapper.find(SpinnerCampariComponent).length).toEqual(0);
        expect(wrapper.find(CampariFooterContainer).length).toEqual(1);
        expect(wrapper.find('.campari-page-container').length).toEqual(1);
        expect(wrapper.find('.campari-imgs-container').find('span').at(1).text()).toEqual('  °C');
        expect(wrapper.find('section').length).toEqual(4);
    });

    it('RedirectButton renders when characterRedirectUrl is filled', () => {
        expect(wrapper.find('section').find('.campari-btns-container').find('a').prop('href')).toEqual(props.characterRedirectUrl);
    });

    it('RedirectButton renders when characterRedirectUrl is empty', () => {
        props.characterRedirectUrl = '';
        wrapper = shallow(<CampariPageComponentWithoutMemo {...props} />);
        expect(wrapper.find('section').find('.campari-btns-container').find('a').length).toEqual(0);
        expect(wrapper.find('.campari-btns-container').find('button').find('.campari-title-f4').find('FormattedMessageFixed')
            .prop('id')).toEqual('campari_page.save_character');
    });

    it('CampariPageComponent is rendered when idealTemp[0] === 0 && !idealTemp[1]', () => {
        props.idealTemp.push(0);
        wrapper = shallow(<CampariPageComponentWithoutMemo {...props} />);
        expect(wrapper.find('.campari-imgs-container').find('img').at(1).prop('src')).toEqual('/static/campari_thermometer_zero.png');
        expect(wrapper.find('.campari-imgs-container').find('FormattedMessage').at(2).prop('id')).toEqual('campari_page.ghiacciato');
        expect(wrapper.find('.campari-imgs-container').find('FormattedMessage').length).toEqual(3);
    });

    it('CampariPageComponent is rendered when idealTemp is empty', () => {
        expect(wrapper.find('.campari-imgs-container').find('img').at(1).prop('src')).toEqual('/static/campari_thermometer.png');
        expect(wrapper.find('.campari-imgs-container').find('FormattedMessage').length).toEqual(2);
    });

    it('CampariPageComponent is rendered when idealTemp[1] is filled', () => {
        props.idealTemp.push([2, 1]);
        wrapper = shallow(<CampariPageComponentWithoutMemo {...props} />);
        expect(wrapper.find('.campari-imgs-container').find('span').at(1).text()).toEqual('21  °C');
    });
});
