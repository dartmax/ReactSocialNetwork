import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("after creation", () => {
        const component = create(<ProfileStatus status="Hi from React" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Hi from React");
    });

    test("after creation <div> should be displayed ", () => {
        const component = create(<ProfileStatus status="Hi from React" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation <input> shouldn't be displayed ", () => {
        const component = create(<ProfileStatus status="Hi from React" />);
        const root = component.root;
        expect(() => {let input = root.findByType("input");}).toThrow();
    });
    test("after creation <div> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="Hi from React" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("My status: ");
    });
    test("input should be displayed in edutMode instead of span", () => {
        const component = create(<ProfileStatus status="Hi from React" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("Hi from React");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="Hi from React" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});

